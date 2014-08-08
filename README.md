Gulp Task Factory
=============

Configuration, task &amp; mocks related to widget testing.

## What tasks can I use?

- Simple static server
- E2E Tests with protractor
- Angular E2E tests
- Angular Unit Tests with Karma & Mocha
- Jenkins Metrics

## How to enable Jenkins CI to collect metrics for my repository?

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
