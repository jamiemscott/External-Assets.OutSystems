# Gulp Commands Summary

## Available Gulp Commands

### `gulp` or `gulp serve` (default)
- Starts the development server with BrowserSync on `http://localhost:3000`
- Watches for changes in Sass and HTML files
- Auto-reloads browser when files change
- **Best for:** Daily development work

### `gulp sass`
- Compiles Sass files to CSS once
- Includes autoprefixer and source maps (in dev mode)
- **Best for:** Quick CSS compilation without starting the server

### `gulp html`
- Processes HTML files once
- Includes partials and beautifies the output (in dev mode)
- **Best for:** Quick HTML processing without starting the server

### `gulp build`
- Builds production-ready files
- Minifies CSS and HTML
- Removes source maps and comments
- **Best for:** Creating optimized files for deployment

### `gulp a11y`
- Runs accessibility checks on HTML files in `dist/` folder
- Generates reports in `reports/accessibility/` folder
- Checks against WCAG 2.0 AA standards
- **Best for:** Checking accessibility compliance during development

### `gulp test`
- Builds the project for production
- Then runs accessibility checks automatically
- **Best for:** Pre-deployment testing and validation

## NPM Script Shortcuts

If you added the scripts to `package.json`, you can also use:

- `npm start` or `npm run dev` → runs `gulp serve`
- `npm run build` → runs `gulp build`
- `npm test` → runs `gulp test` (add `"test": "gulp test"` to scripts)

## Accessibility Checking

The `gulp a11y` command validates your HTML for:
- Missing alt attributes on images
- Proper heading hierarchy (h1, h2, h3...)
- Form labels and input associations
- Color contrast ratios
- ARIA attributes usage
- Semantic HTML structure
- Keyboard navigation support
- Link text clarity

Reports are saved to `reports/accessibility/` after running accessibility checks.

## Development vs Production

**Development Mode (default)**
- Code remains readable
- Includes source maps for debugging
- HTML is beautified
- CSS is expanded

**Production Mode (`gulp build`)**
- Fully optimized and minified
- No source maps
- Comments removed
- Smaller file sizes