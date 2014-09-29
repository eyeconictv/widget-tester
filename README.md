# Widget Tester

## Introduction

Configuration, tasks, and mocks to be used for widget testing.

### Available Tasks

- Simple static server
- E2E Tests with protractor
- Angular E2E tests
- Angular Unit Tests with Karma & Mocha
- Jenkins Metrics

Widget Tester works in conjunction with [Rise Vision](http://www.risevision.com), the [digital signage management application](http://rva.risevision.com/) that runs on [Google Cloud](https://cloud.google.com).

At this time Chrome is the only browser that this project and Rise Vision supports.

## Built With
- NPM (node package manager)
- Bower
- Karma and Mocha for testing

## Development

### Local Development Environment Setup and Installation
* install the latest Node.js and NPM version

* clone the repo using Git to your local:
```bash
git clone https://github.com/Rise-Vision/widget-tester.git
```

* cd into the repo directory
```bash
cd widget-tester
```

* from the root of the repo run this command to install all npm dependencies
```bash
npm install
```

* install Bower globally using the NPM install cmd:
```bash
npm install -g bower
```

* run Bower install to install all bower dependencies:
```bash
bower install
```

### How to enable Jenkins CI to collect metrics for a repository

You will need to make sure the following requirements are fulfilled:

1. ####Each of your test types must produce a report file as reports/*-xunit.xml
  - File must be placed under ```/reports``` (which should also be git-ignored)
  - Reports must have the suffix ```-xunit.xml```
  - This can be easily accomplished if you use factory in this repo to create a test task, which will automatically generate the report file for you.

    For instance,
  ```javascript
  var factory = require("widget-factory").gulpTaskFactory;
  gulp.task("test:e2e", factory.testE2E());
  ```
  Will define a gulp task that runs tests under ```test/e2e/*.js``` with CasperJS.

2. ####A gulp task must be present that collects metrics and produces a Java properties file as ```reports/metrics.json.properties```
   - Again, the easiest way to accomplish is to use the task factory:
   ```javascript
   var factory = require("widget-factory").gulpTaskFactory;
   gulp.task("test:metrics", factory.metrics());
   ```
3. ####Each Jenkins task for the repository must incorporate the metrics task at the end of the original test process
   - If your repository uses NPM script, append ```gulp metrics; ``` to the end of your "test" task
   - If you have a gulp task called ```test``` that runs all available types of tests, modify it to one similar to the following:

   ```javascript
   var runSequence = require("run-sequence");
   gulp.task("test", function (cb) {
     runSequence("test:unit:ng",
       "test:e2e:server", "test:e2e", "test:e2e:ng", "test:e2e:server-close",
       "test:metrics", cb);
   })

   ```
4. ####Your Jenkins task must use EnvInject plugin to inject ```reports/metrics.json.properties``` into the build context
   1. In your task's config page, click "Add Build Step", then Inject Environment Variables
   2. In the "Inject Environment Variables" block, enter ```reports/metrics.json.properties``` in the "Properties File Path" text box

5. ###Your Jenkins task must add a note back to GitHub repo
   1. Click "Add post-build action" => Git Publisher
   2. Under "Git Publisher" block, click "Add Note"
   3. Under the new note sub-block
     - Set "note to push" to ```$CI_METRICS```
     - Set "target remote name" to "origin" (or the one that matches your source code configuration. Click "Advance" button in your repository settings to see the name of your git remote)
     - Set "note's namespace" to ```metrics-${GIT_BRANCH}-${BUILD_NUMBER}```

### Dependencies
* **Bower** - is used as a package manager for javascript libraries and frameworks. All third-party javascript frameworks and libraries are listed as dependencies in the bower.json file.
* **NPM & Nodejs** - all the node dependencies are listed in the package.json file


## Submitting Issues
If you encounter problems or find defects we really want to hear about them. If you could take the time to add them as issues to this Repository it would be most appreciated. When reporting issues please use the following format where applicable:

**Reproduction Steps**

1. did this
2. then that
3. followed by this (screenshots / video captures always help)

**Expected Results**

What you expected to happen.

**Actual Results**

What actually happened. (screenshots / video captures always help)

## Contributing
All contributions are greatly appreciated and welcome! If you would first like to sound out your contribution ideas please post your thoughts to our [community](http://community.risevision.com), otherwise submit a pull request and we will do our best to incorporate it

## Resources
If you have any questions or problems please don't hesitate to join our lively and responsive community at http://community.risevision.com.

If you are looking for user documentation on Rise Vision please see http://www.risevision.com/help/users/

If you would like more information on developing applications for Rise Vision please visit http://www.risevision.com/help/developers/.

**Facilitator**

[Stuart Lees](https://github.com/stulees "Stuart Lees")