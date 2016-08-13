var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require("gulp-jshint");


gulp.task("hint", function() {
    return gulp.src("./src/cobblestone.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("build", function() {
	return gulp.src("./src/cobblestone.js")
        .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("default",["hint", "build"]);