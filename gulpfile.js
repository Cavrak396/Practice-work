let gulp = require("gulp");
let scss = require("gulp-sass");
let scssLint = require("gulp-sass-lint");
let iconfont = require('gulp-iconfont');
let consolidate = require('gulp-consolidate');
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

  //3. Icon font 
   
  gulp.task("iconfont", () => {
    return gulp
      .src("src/svg/*.svg")
      .pipe(
        iconfont({
          fontName: "iconfont",
          formats: ["ttf", "eot", "woff", "woff2"],
          appendCodepoints: true,
          appendUnicode: false,
          normalize: true,
          fontHeight: 1000,
          centerHorizontally: true,
        })
      )
      .on("glyphs", function (glyphs, options) {
        gulp
          .src("src/iconfont-template/iconfont.scss")
          .pipe(
            consolidate("underscore", {
              glyphs: glyphs,
              fontName: options.fontName,
              fontDate: new Date().getTime(),
            })
          )
          .pipe(gulp.dest("src/scss/base/icon-font"));
      })
      .pipe(gulp.dest("dist/fonts"));
  });
  