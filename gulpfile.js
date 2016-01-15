const gulp = require('gulp');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const watchify = require('watchify');  
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');  
const path = require('path')

gulp.task('default', ['connect', 'watchCss'])

config = {
  serverDir: path.join(__dirname, 'dist'),
  port: 3838,
  entryJs: path.join(__dirname, 'src', 'fullSlider.js'),
  distJs: path.join(__dirname, 'dist', 'js'),
  distCss: path.join(__dirname, 'dist', 'css')
}

gulp.task('connect', function () {
  connect.server({
    root: config.serverDir,
    livereload: true,
    port: config.port,
  });
});

gulp.task('watchCss', function(){
   gulp.watch('./src/*.scss', ['buildcss']);
});


var b = browserify({
  entries: [config.entryJs],
  cache: {},
  packageCache: {},
  plugin: [watchify]
});

b.on('update', bundle);
bundle()
buildCss()

gulp.task('buildcss', function () {
  buildCss()
})

function bundle() {
  return b.transform("babelify", {presets: ["es2015"]})
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('fullSlider.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.distJs))
    .pipe(connect.reload())
} 

function buildCss(){
  return gulp.src('./src/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest(config.distCss))
   .pipe(connect.reload())
}



// var b = watchify(browserify(_.assign({}, watchify.args, {  
//   cache: {}, // required for watchify
//   packageCache: {}, // required for watchify
//   entries: ['./src/js/entry.jsx'],
//   transform: [babelify, reactify]
// }))); 

// gulp.task('default', ['connect', 'buildjs', 'buildcss', 'watchcss']);  
// b.on('update', bundle); // on any dep update, runs the bundler  
// b.on('log', gutil.log); // output build logs to terminal

// gulp.task('buildjs', function(){
//   bundle()
// })

// gulp.task('buildcss',function(){
//   return gulp.src('./src/styles/entry.less')
//   .pipe(less())
//   .pipe(rename('bundle.css'))
//   .pipe(gulp.dest('./dist/styles'))
//   .pipe(connect.reload());
// });

// gulp.task('watchcss', function(){
//    gulp.watch('./src/styles/**/*.*', ['buildcss']);
// });

// function bundle(){
//   return b.bundle()
//     .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     // .pipe(uglify())
//     .pipe(gulp.dest('./dist/js'))
//     .pipe(connect.reload());
// }


// /*
//   production 
//   $ gulp build
//  */
// gulp.task('build',['bundlejs','bundlecss']);

// gulp.task('bundlejs',function(){
//   browserify('./src/js/entry.jsx')
//   .transform(reactify)
//   .transform(babelify)
//   .bundle()
//   .pipe(source('bundle.js'))
//   .pipe(buffer())
//   .pipe(uglify())
//   .pipe(gulp.dest('./dist/js/'))
//   console.log('seccessful build the js !!!!!!!!!!!!!!!!!!!')
// });

// gulp.task('bundlecss',function(){
//   return gulp.src('./src/styles/entry.less')
//   .pipe(less())
//   .pipe(minicss())
//   .pipe(rename('bundle.css'))
//   .pipe(gulp.dest('./dist/styles/'))
//   console.log('seccessful build the css !!!!!!!!!!!!!!!!!!!')
// });



