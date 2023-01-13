let gulp = require("gulp");
let scss = require("gulp-sass");
let scssLint = require("gulp-sass-lint");
let iconfont = require("gulp-iconfont");
let consolidate = require("gulp-consolidate");
//1. Scss to scss

gulp.task("scss", () => {
  return gulp
    .src("src/scss/style.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"));
});

//2. Watch task
gulp.task("default", ["scss", "scss-lint"], () => {
  gulp.watch("src/**/*.scss"), ["scss"];
});

//3. Scss lint

gulp.task("scss-lint", () => {
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

//4. Gulp project-build

gulp.task("project-build", ["scss","copy-html", "copy-img", "copyfonts", "copy-js"]);

gulp.task("copy-html", () => {
  return gulp.src("*.html").pipe(gulp.dest("dist"));
});
gulp.task("copy-js", () => {
  return gulp.src("src/js/*.js").pipe(gulp.dest("dist/js"));
});
gulp.task("copy-img", () => {
  return gulp
    .src("src/images/*.{gif,jpg,png,svg,webp}")
    .pipe(gulp.dest("dist/images"));
});

gulp.task("copyfonts", () => {
  gulp
    .src("src/fonts/**/*.{ttf,woff,woff2,eof,svg}")
    .pipe(gulp.dest("dist/text-fonts"));
});
