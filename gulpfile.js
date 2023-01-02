let gulp = require("gulp");
let scss = require("gulp-sass");
let scssLint = require("gulp-sass-lint");

//1. Scss to scss

gulp.task("scss", () => {
  return gulp
    .src("src/scss/style.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"));
});

//2. Watch task
gulp.task("default", ['scss'], () => {
  gulp.watch("src/**/*.scss"), ["scss"];
});

//3. Scss lint 

  gulp.task("scss-lint",  () => {
    return gulp
      .src("src/scss/**/*.scss")
      .pipe(
        scssLint({
          configFile: ".sass-lint.yml",
        })
      )
      .pipe(scssLint.format())
      .pipe(scssLint.failOnError());
  });