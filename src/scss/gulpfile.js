const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const replace = require('gulp-replace');
const beautify = require('gulp-html-beautify');
const accessibility = require('gulp-accessibility');

// Environment flag
const isDev = process.env.NODE_ENV !== 'production';

// Compile Sass to CSS
function compileSass() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(sass({
      outputStyle: isDev ? 'expanded' : 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulpif(!isDev, cleanCSS()))
    .pipe(gulpif(isDev, sourcemaps.write('.')))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// Process HTML files
function processHTML() {
  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(replace('{{timestamp}}', Date.now()))
    .pipe(gulpif(isDev, beautify({
      indent_size: 2,
      preserve_newlines: true,
      max_preserve_newlines: 1
    })))
    .pipe(gulpif(!isDev, htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true
    })))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// Check accessibility
function checkA11y() {
  return gulp.src('dist/*.html')
    .pipe(accessibility({
      force: true, // Continue on errors
      accessibilityLevel: 'WCAG2AA', // WCAG2A, WCAG2AA, or WCAG2AAA
      reportType: 'txt', // txt, json, or both
      reportLocation: 'reports/accessibility',
      reportLevels: {
        notice: true,
        warning: true,
        error: true
      },
      verbose: true
    }))
    .on('error', console.log)
    .on('data', function(file) {
      console.log('\n✓ Accessibility check complete');
      console.log('Report saved to: reports/accessibility/');
    });
}

// Initialize BrowserSync server
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000
  });
  
  gulp.watch('src/scss/**/*.scss', compileSass);
  gulp.watch('src/**/*.html', processHTML);
  gulp.watch('src/partials/**/*.html', processHTML);
}

// Build task for production
function build() {
  process.env.NODE_ENV = 'production';
  return gulp.parallel(compileSass, processHTML)();
}

// Test task - build and check accessibility
const test = gulp.series(build, checkA11y);

// Export tasks
exports.sass = compileSass;
exports.html = processHTML;
exports.a11y = checkA11y;
exports.test = test;
exports.serve = serve;
exports.build = build;
exports.default = serve;
