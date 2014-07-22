/* global __dirname: false */
(function (module) {
  "use strict";

  var express = require("express");
  var gulp = require("gulp");
  var rename = require("gulp-rename");
  var htmlreplace = require("gulp-html-replace");
  var spawn = require("spawn-cmd").spawn;
  var gutil = require("gulp-util");
  var webdriver_update = require("gulp-protractor").webdriver_update;
  var protractor = require("gulp-protractor").protractor;
  var path = require("path");
  var glob = require("glob");
  var runSequence = require("run-sequence");
  var uuid = require('node-uuid');
  var junitParser = require('junit-xml-parser').parser;
  var fs = require("fs");
  var xml2js = require('xml2js');
  var async = require("async");

  var httpServer;

  var factory = {
    gulpTaskFactory: {
      webdriveUpdate: function () {
        return webdriver_update;
      },
      testServer: function (options) {
        options = options || {};
        return function () {
          var server = express();
          server.use(express.static(options.rootPath || "./"));
          httpServer = server.listen(8099);
          return httpServer;
        };
      },
      testServerClose: function () {
        return function () {
          return httpServer.close();
        };
      },
      htmlE2E: function (options) {
        options = options || {};
        return function () {
          return gulp.src("./src/settings.html")
            .pipe(htmlreplace({e2egadgets: "../node_modules/widget-tester/gadget-mocks.js" }))
            .pipe(rename(function (path) {
              path.basename += "-e2e";
            }))
            .pipe(gulp.dest("./src/"));
        };
      },
      testE2E: function (options) {
        options = options || {};
        return function (cb) {
          var tests = options.testFiles || ["./test/e2e/*test.js"];
          var files = [];

          if(typeof tests === "string") {
            tests = [tests];
          }

          tests.forEach(function (test) {
            files = files.concat(glob.sync(test));
          });

          var casperChild = spawn("casperjs", ["test"].concat(files));

          casperChild.stdout.on("data", function (data) {
              gutil.log("CasperJS:", data.toString().slice(0, -1)); // Remove \n
          });

          casperChild.on("close", function (code) {
              var success = code === 0; // Will be 1 in the event of failure
              // Do something with success here
              if(!success) {
                cb("CasperJS returned error.");
              }
              else {
                gutil.log("CasperJS: run was successful.");
                cb();
              }
          });
        };
      },
      testE2EAngular: function (options) {
        options = options || {};
        var ensureReportDirectory = function (cb) {
          if(!fs.existsSync("./reports")) {
            fs.mkdir('./reports/', function (err) {
              cb(err);
            });
          }
        };

        var runAngularTest = function () {
          return gulp.src(options.src || ["./test/e2e/*scenarios.js"])
            .pipe(protractor({
                configFile: options.configFile || path.join(__dirname, "protractor.conf.js"),
                args: ["--baseUrl", options.baseUrl || "http://127.0.0.1:8099/src/settings-e2e.html"]
            }))
            .on("error", function (e) {
              gutil.log(e);
              if(fs.statSync("./reports/angular-xunit.xml")) {
                //output test result to console
                gutil.log("Test report", fs.readFileSync("./reports/angular-xunit.xml", {encoding: "utf8"}));
              }
              throw e;
            });
        };

        var id = uuid.v1();
        gulp.task(id + ":ensureReportDirectory", ensureReportDirectory);
        gulp.task(id + ":runAngularTest", runAngularTest);

        return function (cb) {
          runSequence(
            id + ":ensureReportDirectory",
            id + ":runAngularTest", cb
          )
        };
      },
      metrics: function (options) {
        options = options || {};
        return function(cb) {
          var glob = require("glob");

          // options is optional
          glob("reports/*xunit.xml", options, function (er, files) {
            async.map(files, function (file, mapCallback) {
              var parser = new xml2js.Parser();
              gutil.log("Processing file", file, "...");
              var result = parser.parseString(fs.readFileSync(file), function (err, result) {
                mapCallback(err, {
                  tests: result['testsuite']['$']['tests'],
                  failures: result['testsuite']['$']['failures'],
                  errors: result['testsuite']['$']['errors'],
                  skipped: result['testsuite']['$']['skipped']
                });
              });
            },
            function (err, results) {
              if(err) {cb(err); }
              else {
                async.reduce(results, {tests: 0, failures: 0, errors: 0, skipped: 0}, function (memo, item, callback){

                  callback(null, {
                    tests: memo.tests + (parseInt(item.tests) || 0),
                    failures: memo.failures + (parseInt(item.failures) || 0),
                    errors: memo.errors + (parseInt(item.errors) || 0),
                    skipped: memo.skipped + (parseInt(item.skipped) || 0)
                  });
                },
                function (err, result){
                  if(result) {
                    gutil.log('Aggregated metrics result:', result);
                    fs.writeFileSync("reports/metrics.json", JSON.stringify(result)); }
                  cb(err, result);
                });
              }
            });
          });
        };
      }
    }
  };

  module.exports = factory;

})(module);
