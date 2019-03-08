const gulp = require('gulp');
const browserSync = require('browser-sync');
const nunjucksRender = require("gulp-nunjucks-render");
const del = require("del");
const watch = require("gulp-watch");
const server = browserSync.create()

gulp.task("clean:dist", done => {
  del.sync("dist");
  done();
});

gulp.task("templates", done => {
  gulp
    .src("src/default.html")
    .pipe(
      nunjucksRender({
        path: ["src/"]
      })
    )
    .pipe(gulp.dest("dist"));
  done();
});

gulp.task("serve", done => {
  server.init({
    notify: false,
    logPrefix: "DIST",
    server: {
      baseDir: "dist",
      index: "default.html",
      routes: {
        '/vendor': 'node_modules'
      }
    },
    port: 3000
  });

  gulp.watch("src/*.html", gulp.series("templates", "reload"));
  gulp.watch("src/**/*.html", gulp.series("templates", "reload"));
  done();
});

gulp.task("reload", done => {
  server.reload();
  done();
});

gulp.task("default", gulp.series("clean:dist", "templates", "serve"));