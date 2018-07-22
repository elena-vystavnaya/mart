var gulp          = require('gulp'), 
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync').create(),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglifyjs'),
    cssnano       = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename        = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    cleanCSS      = require('gulp-clean-css'), 
    sourcemaps    = require('gulp-sourcemaps'),
    del           = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin      = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant      = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache         = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer  = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов


var sassfiles = [
  "app/sass/main.scss",
  "app/sass/**/*.scss"
];

var jsfiles = [
  "app/libs/jquery/jquery.min.js",
  "app/libs/owl.carousel/owl.carousel.min.js",
  "app/libs/wow/wow.min.js"
];

var cssfiles = [
    "app/libs/owl.carousel/owl.carousel.min.css",
    "app/libs/owl.carousel/owl.theme.default.min.css",
    "app/libs/wow/animate.css",
    "app/libs/fontawesome/all.min.css"
  ];

gulp.task('sass', function(){
  return gulp.src(sassfiles)
 
    .pipe(concat('style.scss'))
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
  
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task('libs-css', function(){
    return gulp.src(cssfiles)
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
  browserSync({ // Выполняем browser Sync
      server: { // Определяем параметры сервера
          baseDir: 'app' // Директория для сервера - app
      },
  });
});

gulp.task('libs-js', function() {
  return gulp.src(jsfiles)
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/js'));
});

gulp.task('uglify-js', function() {
    return gulp.src('app/js/index.js')
      .pipe(uglify())
      .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
      .pipe(gulp.dest('app/js'));
});

gulp.task('uglify-css', ['sass', 'libs-css'], function() {
  return gulp.src(['app/css/libs.css', 'app/css/style.css']) // Выбираем файл для минификации
      .pipe(cssnano()) // Сжимаем
      .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
      .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('watch', ['libs-js', 'uglify-js', 'uglify-css'], function(){
    gulp.watch(sassfiles, [sass]);
    gulp.watch('app/*.html', browserSync.reload()); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload()); // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
  return del.sync('dist'); // Удаляем папку dist перед сборкой
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

gulp.task('build', ['clean', 'img', 'uglify-css', 'uglify-js', 'libs-js'], function() {

  var buildCss = gulp.src([ // Переносим CSS стили в продакшен
      'app/css/style.min.css',
      'app/css/libs.min.css'
      ])
  .pipe(gulp.dest('css'));

  var buildFonts = gulp.src('app/webfonts/**/*') // Переносим шрифты в продакшен
  .pipe(gulp.dest('webfonts'));

  var buildJs = gulp.src([ // Переносим CSS стили в продакшен
    'app/js/index.min.js',
    'app/js/libs.min.js'
    ]) // Переносим скрипты в продакшен
  .pipe(gulp.dest('js'));

  var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
  .pipe(gulp.dest(''));
});

gulp.task('clear', function () {
  return cache.clearAll();
});

gulp.task('default', ['watch']);

