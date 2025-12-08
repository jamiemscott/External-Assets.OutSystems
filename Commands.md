# Gulp Project - Complete Guide

## Quick Start

### First Time Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <project-folder>
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

Your site will open at `http://localhost:3000` with live reload enabled.

---

## Project Structure

```
my-project/
├── src/                          # Source files
│   ├── scss/                     # Sass files
│   │   ├── _buttons.scss
│   │   ├── _colors.scss
│   │   └── style.scss
│   ├── images/                   # Images to optimize
│   │   ├── photo.jpg
│   │   └── logo.png
│   ├── assets/                   # Other assets (fonts, videos)
│   ├── partials/                 # HTML partials
│   │   ├── header.html
│   │   └── footer.html
│   └── index.html                # HTML files
├── dist/                         # Build output (auto-generated)
│   ├── assets/
│   │   ├── css/
│   │   └── images/
│   ├── styleguide/
│   └── index.html
├── reports/                      # Accessibility reports
├── gulpfile.js                   # Gulp configuration
├── package.json                  # Dependencies
└── netlify.toml                  # Netlify deployment config
```

---

## Available Gulp Commands

### Development Commands

#### `gulp` or `gulp serve` (default)
- Starts the development server with BrowserSync on `http://localhost:3000`
- Watches for changes in Sass, HTML, and image files
- Auto-reloads browser when files change
- **Best for:** Daily development work

**Usage:**
```bash
gulp
# or
npm start
```

#### `gulp sass`
- Compiles Sass files to CSS once
- Includes autoprefixer and source maps (in dev mode)
- Outputs to `dist/assets/css/`
- **Best for:** Quick CSS compilation without starting the server

**Usage:**
```bash
gulp sass
```

#### `gulp html`
- Processes HTML files once
- Includes partials (@@include syntax)
- Beautifies output in dev mode
- **Best for:** Quick HTML processing without starting the server

**Usage:**
```bash
gulp html
```

### Asset Processing Commands

#### `gulp images`
- Optimizes all images in `src/images/`
- Compresses JPG, PNG, SVG, and GIF files
- Only processes new/changed images
- Outputs to `dist/assets/images/`
- **Best for:** Manually optimizing images

**Usage:**
```bash
gulp images
```

#### `gulp webp`
- Generates WebP versions of JPG and PNG images
- WebP format provides ~30% better compression
- Outputs to `dist/assets/images/`
- **Best for:** Creating modern image formats

**Usage:**
```bash
gulp webp
```

#### `gulp assets`
- Copies other assets (fonts, videos, etc.) to dist
- Copies from `src/assets/` to `dist/assets/`
- **Best for:** Copying non-processed files

**Usage:**
```bash
gulp assets
```

### Quality & Testing Commands

#### `gulp a11y`
- Runs accessibility checks on HTML files in `dist/` folder
- Generates reports in `reports/accessibility/` folder
- Checks against WCAG 2.0 AA standards
- **Best for:** Checking accessibility compliance during development

**Usage:**
```bash
gulp a11y
```

#### `gulp test`
- Builds the project for production
- Then runs accessibility checks automatically
- **Best for:** Pre-deployment testing and validation

**Usage:**
```bash
gulp test
# or
npm test
```

### Style Guide Commands

#### `gulp styleguide`
- Generates the complete style guide from KSS comments in Sass
- Parses documentation from `src/scss/` files
- Creates interactive documentation at `dist/styleguide/`
- **Best for:** Creating/updating the style guide

**Usage:**
```bash
gulp styleguide
```

#### `gulp styleguide:serve`
- Starts a development server for the style guide on `http://localhost:3001`
- Auto-regenerates when Sass files change
- **Best for:** Working on components and seeing live updates

**Usage:**
```bash
gulp styleguide:serve
```

### Production Commands

#### `gulp build`
- Builds production-ready files
- Compiles and minifies CSS
- Processes and minifies HTML
- Optimizes all images
- Generates WebP versions
- Copies assets
- Generates style guide
- Removes source maps and comments
- **Best for:** Creating optimized files for deployment

**Usage:**
```bash
gulp build
# or
npm run build
```

---

## NPM Script Shortcuts

If you prefer using npm commands:

| NPM Command | Gulp Equivalent | Description |
|-------------|----------------|-------------|
| `npm start` | `gulp serve` | Start development server |
| `npm run dev` | `gulp serve` | Start development server |
| `npm run build` | `gulp build` | Build for production |
| `npm test` | `gulp test` | Build and run accessibility tests |

---

## Working with HTML Partials

You can break your HTML into reusable components using the `@@include` syntax:

**src/partials/header.html:**
```html
<header>
  <h1>My Website</h1>
  <nav>@@include('nav.html')</nav>
</header>
```

**src/index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Project</title>
  <link rel="stylesheet" href="assets/css/style.css?v={{timestamp}}">
</head>
<body>
  @@include('partials/header.html')
  
  <main>
    <h2>Welcome</h2>
  </main>
  
  @@include('partials/footer.html')
</body>
</html>
```

The `{{timestamp}}` variable is automatically replaced during build for cache busting.

---

## Working with Images

### Basic Usage

Place images in `src/images/`:
```
src/images/
├── hero.jpg
├── logo.png
└── icon.svg
```

Reference them in HTML:
```html
<img src="assets/images/hero.jpg" alt="Hero image">
```

### Using WebP with Fallback

For better performance with modern browsers:

```html
<picture>
  <source srcset="assets/images/hero.webp" type="image/webp">
  <img src="assets/images/hero.jpg" alt="Hero image">
</picture>
```

---

## Accessibility Checking

The `gulp a11y` command validates your HTML for:

- ✅ Missing alt attributes on images
- ✅ Proper heading hierarchy (h1, h2, h3...)
- ✅ Form labels and input associations
- ✅ Color contrast ratios
- ✅ ARIA attributes usage
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Link text clarity

Reports are saved to `reports/accessibility/` after running checks.

---

## Style Guide Documentation

Document your Sass components using KSS notation for automatic style guide generation.

**Example:**
```scss
// Buttons
//
// Standard button styles for the project.
//
// Markup:
// <button class="btn {{modifier_class}}">Click me</button>
//
// .btn--primary - Primary action button
// .btn--secondary - Secondary action button
//
// Weight: 1
//
// Styleguide Components.Buttons

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  
  &--primary {
    background-color: #007bff;
    color: white;
  }
}
```

See `KSS-DOCUMENTATION-GUIDE.md` for complete documentation instructions.

---

## Development vs Production

### Development Mode (default)
- Code remains readable
- Includes source maps for debugging
- HTML is beautified
- CSS is expanded
- Faster builds
- Live reload enabled

### Production Mode (`gulp build`)
- Fully optimized and minified
- No source maps
- Comments removed
- Smaller file sizes
- WebP images generated
- Ready for deployment

---

## Deployment to Netlify

### Automatic Deployment

1. **Push to GitHub:**
```bash
git add .
git commit -m "Your message"
git push
```

2. **Netlify automatically:**
   - Detects the push
   - Runs `npm run build`
   - Deploys the `dist/` folder
   - Updates your live site

### Manual Deployment

Using Netlify CLI:
```bash
netlify deploy --prod
```

### Accessing Your Sites

After deployment:
- **Main site:** `https://your-subdomain.yourdomain.com/`
- **Style guide:** `https://your-subdomain.yourdomain.com/styleguide/`

---

## Troubleshooting

### "gulp: command not found"
Use `npx gulp` instead of `gulp`, or install globally:
```bash
npm install -g gulp-cli
```

### CSS not loading
- Check the path is `assets/css/style.css` in your HTML
- Verify the file exists in `dist/assets/css/`
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)

### Images not optimizing
- Ensure images are in `src/images/`
- Run `gulp images` or `gulp build`
- Check `dist/assets/images/` for output

### BrowserSync not reloading
- Check terminal for error messages
- Ensure you're running `gulp` or `gulp serve`
- Try restarting the server

### NPM vulnerabilities
- Run `npm audit` to see issues
- Run `npm audit fix` (without --force) for safe updates
- Most low-severity dev dependency warnings are safe to ignore

### Build fails on Netlify
- Check build logs in Netlify dashboard
- Verify all dependencies are in `devDependencies`
- Ensure `netlify.toml` is properly configured
- Test build locally with `npm run build`

---

## Git Workflow

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### Regular Updates
```bash
git add .
git commit -m "Description of changes"
git push
```

### What Gets Committed
- ✅ Source files (`src/`)
- ✅ Configuration files (`gulpfile.js`, `package.json`, `netlify.toml`)
- ✅ Documentation files (`.md` files)
- ❌ `node_modules/` (excluded in `.gitignore`)
- ❌ `dist/` (excluded in `.gitignore` - built on deploy)
- ❌ `reports/` (excluded in `.gitignore`)

---

## Additional Resources

- **Gulp Documentation:** https://gulpjs.com/
- **Sass Documentation:** https://sass-lang.com/
- **Netlify Documentation:** https://docs.netlify.com/
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **KSS Documentation:** https://github.com/kss-node/kss-node

---

## Package List

Core dependencies installed in this project:

- `gulp` - Task runner
- `gulp-sass` & `sass` - Sass compilation
- `gulp-clean-css` - CSS minification
- `autoprefixer` & `gulp-postcss` - Vendor prefixing
- `gulp-sourcemaps` - Source map generation
- `browser-sync` - Live reload server
- `gulp-if` - Conditional tasks
- `gulp-plumber` - Error handling
- `gulp-htmlmin` - HTML minification
- `gulp-file-include` - HTML partials
- `gulp-replace` - Text replacement
- `gulp-html-beautify` - HTML formatting
- `gulp-accessibility` - Accessibility checking
- `kss` - Style guide generation
- `gulp-imagemin` - Image optimization
- `gulp-newer` - Process only new files
- `gulp-webp` - WebP generation

---

## Support

If you encounter issues not covered in this guide:

1. Check the terminal/console for error messages
2. Verify all dependencies are installed (`npm install`)
3. Try deleting `node_modules` and reinstalling:
```bash
rm -rf node_modules package-lock.json
npm install
```
4. Check the Gulp documentation for specific plugins
5. Review this project's GitHub issues (if applicable)