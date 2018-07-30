var gulp          = require('gulp'), 
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglifyjs'),
    cssnano       = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename        = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
  //  cleanCSS      = require('gulp-clean-css'), 
    sourcemaps    = require('gulp-sourcemaps'),
    del           = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin      = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant      = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache         = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer  = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов


var sassfiles = [
  "app/sass/style.scss",
];

var jsfiles = [
  "app/libs/js/jquery.min.js",
  "app/libs/js/mixitup.min.js",
  "app/libs/js/*.js"
];

var cssfiles = [
    "app/libs/css/*.css"
];

gulp.task('browser-sync', function() { // Создаем таск browser-sync
  browserSync({ // Выполняем browser Sync
      server: { // Определяем параметры сервера
          baseDir: 'app' // Директория для сервера - app
      },
      notify: false
  });
});

gulp.task('sass', function(){
  return gulp.src(sassfiles)
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
   // .pipe(cssnano()) // Сжимаем
   // .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task('libs-css', function(){
    return gulp.src(cssfiles)
    .pipe(concat('libs.css'))
   // .pipe(cssnano()) // Сжимаем
   // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task('style.min.css', ['sass', 'libs-css'], function(){
  return gulp.src(['app/css/libs.css', 'app/css/style.css'])
  .pipe(concat('style.min.css'))
  .pipe(cssnano())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.stream());
});

gulp.task('libs-js', function() {
  return gulp.src(jsfiles)
    .pipe(concat('libs.js'))
   // .pipe(uglify())
   // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/js'));
});

gulp.task('script.min.js', ['libs-js'], function() {
  return gulp.src(['app/js/libs.js', 'app/js/script.js'])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

/*gulp.task('watch', ['browser-sync', 'sass', 'libs-css', 'js', 'libs-js'], function(){
    gulp.watch(sassfiles, [sass]);
    gulp.watch(cssfiles, [libs-css]);
    gulp.watch('app/js/index.js', [js]);
    gulp.watch(jsfiles, [libs-js]); 
    gulp.watch('app/*.html', browserSync.reload()); // Наблюдение за HTML файлами в корне проекта
});*/

gulp.task('clean', function() {
  return del.sync(['img', 'js', 'css', 'fonts']); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
  return gulp.src('app/img/**/*') // Берем все изображения из app
      .pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      })))
      .pipe(gulp.dest('img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'style.min.css', 'script.min.js'], function() {

  var buildCss = gulp.src([ // Переносим CSS стили в продакшен
      'app/css/style.min.css',
      'app/css/*.css',
      'app/libs/*.css'
    //  cssfiles
      ])
  .pipe(gulp.dest('css'));

  var buildFonts = gulp.src('app/webfonts/**/*') // Переносим шрифты в продакшен
  .pipe(gulp.dest('webfonts'));

  var buildJs = gulp.src([ // Переносим js в продакшен
    'app/js/script.min.js',
    'app/js/*.js',
    'app/libs/*.js'
  //  jsfiles
    ]) // Переносим скрипты в продакшен
  .pipe(gulp.dest('js'));

  var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
  .pipe(gulp.dest(''));
});

gulp.task('clear', function () {
  return cache.clearAll();
});

gulp.task('default', ['watch']);