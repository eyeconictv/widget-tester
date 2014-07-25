module.exports = function(config){
  config.set({

    autoWatch : false,

    frameworks: ["mocha", "chai", "chai-as-promised"],
    
    browsers : ["PhantomJS"],

    reporters: ["progress"],

    plugins : [
            "karma-mocha",
            "karma-chai",
            "karma-chai-plugins",
            "karma-phantomjs-launcher"
            ],

    // web server port
    port: 9876,
    logLevel: config.LOG_INFO,

    // enable / disable colors in the output (reporters and logs)
    colors: true

  });
};
