var seleniumAddress = (process.env.NODE_ENV === 'prod') ? 'http://localhost:4444/wd/hub' : undefined;
process.env.XUNIT_FILE = 'reports/angular-xunit.xml';
// process.env.MOCHA_REPORTER_FILE = 'reports/anglar.json';
// process.env.MOCHA_REPORTER = 'JSON';

exports.config = {
  allScriptsTimeout: 11000,

  // specs: [
  //   './test/e2e/angular/*.js'
  // ],


  // -----------------------------------------------------------------
  // Browser and Capabilities: Chrome
  // -----------------------------------------------------------------

  // seleniumServerJar: "../node_modules/protractor/selenium/selenium-server-standalone-2.9.248307.jar",
  seleniumAddress: seleniumAddress,
  capabilities: {
    browserName: 'phantomjs',
    version: '',
    platform: 'ANY'
  },

  framework: 'mocha',

  mochaOpts: {
    reporter: require("xunit-file"),
    enableTimeouts: false,
    slow: 3000
  }

  // onPrepare: function() {
  //   // The require statement must be down here, since jasmine-reporters
  //   // needs jasmine to be in the global and protractor does not guarantee
  //   // this until inside the onPrepare function.
  //   require("jasmine-reporters");
  //   jasmine.getEnv().addReporter(
  //     new jasmine.JUnitXmlReporter('xmloutput', true, true));
  // }
};
