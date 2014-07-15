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
        return function () {
          return gulp.src(options.src || ["./test/e2e/*scenarios.js"])
            .pipe(protractor({
                configFile: options.configFile || path.join(__dirname, "protractor.conf.js"),
                args: ["--baseUrl", options.baseUrl || "http://127.0.0.1:8099/src/settings-e2e.html"]
            }))
            .on("error", function (e) { gutil.error(e); throw e; });
        };
      }
    }
  };

  module.exports = factory;

})(module);
