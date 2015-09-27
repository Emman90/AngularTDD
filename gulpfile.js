var gulp = require("gulp");
var browserSync = require("browser-sync");
var karma = require("karma").Server;
var server = require("gulp-live-server");
var protractor = require("gulp-protractor").protractor;

gulp.task("server", function(){
    var live = server.new("server.js");
    live.start();
});

gulp.task("serve",["server"], function(){
   browserSync.init({
        notify: false,
        port: 8080,
        server:{
            baseDir:["app"],
            routes:{
                "/bower_components":"bower_components"
            }
        }
   });
    gulp.watch(["app/**/*.*"]).on("change", browserSync.reload);
});

gulp.task("test-browser", function(done){
   var server = new karma({
       configFile: __dirname + "/karma.conf.js",
       singleRun: true,
       reporters:["mocha","coverage"]
   }, done);

    server.start();
});

gulp.task("serve-coverage",["test-browser"], function(){
    browserSync.init({
        notify: false,
        port: 7777,
        server:{
            baseDir:["test/coverage"]
        }
    });
    gulp.watch(["test/**/*.*"]).on("change", browserSync.reload);
});

gulp.task("serve-test", function(){
    browserSync.init({
        notify: false,
        port: 8081,
        server:{
            baseDir:["test","app"],
            routes:{
                "/bower_components":"bower_components"
            }
        }
    });
    gulp.watch(["test/**/*.*"]).on("change", browserSync.reload);
});

gulp.task("protractor",["serve"], function(done){
    gulp.src(["test/e2e/*.js"])
        .pipe(protractor({
            configFile: "test/protractor.config.js",
            args:["--baseUrl","http://localhost:8000"]
        }))
        .on("end", done);
});