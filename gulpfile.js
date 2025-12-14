const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
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
const kss = require('kss');
const fs = require('fs');

// Environment flag - use function to check at runtime
function isDev() {
  return process.env.NODE_ENV !== 'production';
}

// Compile Sass to CSS
function compileSass() {
  const isProduction = !isDev();
  
  let stream = gulp.src('src/assets/scss/**/*.scss')
    .pipe(plumber())
    .pipe(gulpif(isDev(), sourcemaps.init()))
    .pipe(sass({
      outputStyle: isDev() ? 'expanded' : 'compressed'
    }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulpif(isProduction, cleanCSS()));
  
  // In production, rename to .min.css
  if (isProduction) {
    stream = stream.pipe(rename('styles.min.css'));
  }
  
  return stream
    .pipe(gulpif(isDev(), sourcemaps.write('.')))
    .pipe(gulp.dest('dist/assets/css'))
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
    .pipe(gulpif(isDev(), beautify({
      indent_size: 2,
      preserve_newlines: true,
      max_preserve_newlines: 1
    })))
    .pipe(gulpif(!isDev(), htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true
    })))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// Copy images (without optimization)
function copyImages(done) {
  // Check if src/assets/images exists
  if (!fs.existsSync('src/assets/images')) {
    console.log('No images folder found, skipping...');
    done();
    return;
  }
  
  return gulp.src('src/assets/images/**/*.{jpg,jpeg,png,svg,gif,webp}', { encoding: false })
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(browserSync.stream());
}

// Copy other assets (fonts, videos, etc)
function copyAssets(done) {
  // Check if src/assets exists and has files other than scss and images
  if (!fs.existsSync('src/assets')) {
    console.log('No assets folder found, skipping...');
    done();
    return;
  }
  
  return gulp.src([
    'src/assets/**/*',
    '!src/assets/scss',
    '!src/assets/scss/**',
    '!src/assets/images',
    '!src/assets/images/**'
  ])
    .pipe(gulp.dest('dist/assets'));
}

// Generate style guide to dist folder
async function styleGuide() {
  try {
    await kss({
      source: 'src/assets/scss/',
      destination: 'dist/styleguide/',
      css: '../assets/css/styles.min.css',
      title: 'Project Style Guide',
      homepage: 'styleguide.md',
      placeholder: '[modifier]',
      nav: true
    });
    console.log('\n✓ Style guide generated successfully');
    console.log('View at: dist/styleguide/index.html');
  } catch (error) {
    console.error('Style guide generation failed:', error);
  }
}

// Initialize BrowserSync server
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000,
    notify: false
  });
  
  gulp.watch('src/assets/scss/**/*.scss', compileSass);
  gulp.watch(['src/**/*.html', 'src/partials/**/*.html'], processHTML);
  gulp.watch('src/assets/images/**/*', copyImages);
  gulp.watch('src/assets/**/*', copyAssets);
}

// Serve style guide
function serveStyleGuide() {
  browserSync.init({
    server: {
      baseDir: './dist/styleguide'
    },
    port: 3001
  });
  
  gulp.watch('src/assets/scss/**/*.scss', gulp.series(compileSass, styleGuide));
}

// Build task for production
function build(done) {
  process.env.NODE_ENV = 'production';
  return gulp.series(
    gulp.parallel(compileSass, processHTML, copyImages, copyAssets),
    styleGuide
  )(done);
}

// Generate complete style guide
const generateStyleGuide = gulp.series(compileSass, styleGuide);

// Export tasks
exports.sass = compileSass;
exports.html = processHTML;
exports.images = copyImages;
exports.assets = copyAssets;
exports.styleguide = generateStyleGuide;
exports['styleguide:serve'] = serveStyleGuide;
exports.serve = serve;
exports.build = build;
exports.default = serve;