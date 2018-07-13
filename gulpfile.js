var gulp = require("gulp");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var minify = require("gulp-csso");
var autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var uglify = require("gulp-uglify");
var spritesmith = require('gulp.spritesmith');
var server = require("browser-sync").create();

gulp.task("images", function () {
  return gulp.src('./source/img/*.{png,jpg,svg}')
  .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imageminJpegRecompress({
        loops: 5,
        min: 95,
        max: 100,
        quality:'veryhigh'
      }),
      imagemin.svgo(),
      imagemin.optipng({optimizationLevel: 3}),
      pngquant({quality: '100', speed: 5})
    ],{
      verbose: true
    })))
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('sprite', function() {
  var spriteData = 
    gulp.src('./source/img/sprite/*.*')
      .pipe(spritesmith({
          imgName: 'sprite.png',
          cssName: 'sprite.scss',
          cssFormat: 'scss',
          algorithm: 'binary-tree',
      }));

  spriteData.img.pipe(gulp.dest('./build/img/'));
  spriteData.css.pipe(gulp.dest('./source/styles/blocks'));
});

gulp.task('style', function () {
  gulp.src('./source/styles/style.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('./build/css'))
    .pipe(minify())
    .pipe(rename('./style.min.css'))
    .pipe(gulp.dest('./build/css'))
    .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src("./source/*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("js", function (cb) {
  gulp.src("./source/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"))
    
});

gulp.task("copy", function () {
  return gulp.src([
      "./source/fonts/**/*.{woff,woff2}"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("./build"));
});

gulp.task('clear', function (done) {
  return cache.clearAll(done);
});


gulp.task("serve", function () {
  server.init({
    server: "build/"
  });

  gulp.watch("source/styles/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("source/js/*.js", ["js"]);
});

gulp.task('default', ['copy', 'html', 'images', 'sprite', 'style', 'js', 'serve']);