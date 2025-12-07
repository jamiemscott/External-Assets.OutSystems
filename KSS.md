# How to Document Your Sass Files with KSS

This guide explains how to add documentation comments to your Sass files so the style guide can be automatically generated.

## KSS Comment Format

KSS documentation uses special comment blocks in your Sass files. The basic format is:

```scss
// Title
//
// Description of the component
//
// Markup:
// <div class="component {{modifier_class}}">Example</div>
//
// .modifier-1 - Description of first modifier
// .modifier-2 - Description of second modifier
//
// Weight: 1
//
// Styleguide Section.Component
```

## Example: Buttons

**src/scss/_buttons.scss:**

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
// .btn--danger - Dangerous action button
//
// Weight: 1
//
// Styleguide Components.Buttons

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &--primary {
    background-color: #007bff;
    color: white;
    
    &:hover {
      background-color: #0056b3;
    }
  }
  
  &--secondary {
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: #545b62;
    }
  }
  
  &--danger {
    background-color: #dc3545;
    color: white;
    
    &:hover {
      background-color: #c82333;
    }
  }
}
```

## Example: Colors

**src/scss/_colors.scss:**

```scss
// Colors
//
// Color palette for the project.
//
// Colors:
// $primary: #007bff - Primary brand color
// $secondary: #6c757d - Secondary color
// $success: #28a745 - Success state
// $danger: #dc3545 - Error/danger state
// $warning: #ffc107 - Warning state
// $info: #17a2b8 - Info state
//
// Weight: 0
//
// Styleguide Foundation.Colors

$primary: #007bff;
$secondary: #6c757d;
$success: #28a745;
$danger: #dc3545;
$warning: #ffc107;
$info: #17a2b8;
```

## Example: Typography

**src/scss/_typography.scss:**

```scss
// Typography
//
// Heading styles and text formatting.
//
// Markup:
// <h1 class="{{modifier_class}}">Heading Text</h1>
//
// .heading--large - Extra large heading
// .heading--medium - Medium heading
// .heading--small - Small heading
//
// Weight: 2
//
// Styleguide Foundation.Typography

.heading {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  
  &--large {
    font-size: 48px;
    line-height: 1.2;
  }
  
  &--medium {
    font-size: 32px;
    line-height: 1.3;
  }
  
  &--small {
    font-size: 24px;
    line-height: 1.4;
  }
}
```

## KSS Syntax Breakdown

### Title (First Line)
```scss
// Buttons
```
The component or section name that appears in the style guide.

### Description
```scss
// Standard button styles for the project.
```
A brief explanation of what this component does or when to use it.

### Markup (Optional)
```scss
// Markup:
// <button class="btn {{modifier_class}}">Click me</button>
```
HTML example showing how to use the component. Use `{{modifier_class}}` as a placeholder for modifiers.

### Modifiers (Optional)
```scss
// .btn--primary - Primary action button
// .btn--secondary - Secondary action button
```
List of CSS class variations and what they do.

### Weight (Optional)
```scss
// Weight: 1
```
Controls the order components appear in the style guide (lower numbers appear first).

### Styleguide Reference (Required)
```scss
// Styleguide Components.Buttons
```
Defines the section and hierarchy in the style guide. Format: `Section.Subsection.Component`

## Organizing Your Style Guide

Use dot notation to create hierarchy:

- `Styleguide Foundation` - Base styles (colors, typography)
- `Styleguide Foundation.Colors` - Color subsection
- `Styleguide Foundation.Typography` - Typography subsection
- `Styleguide Components` - UI components
- `Styleguide Components.Buttons` - Button subsection
- `Styleguide Components.Forms` - Forms subsection
- `Styleguide Layout` - Layout patterns

## Tips for Good Documentation

1. **Be descriptive**: Explain when and why to use each component
2. **Show variations**: Document all modifier classes
3. **Include examples**: Provide realistic HTML markup
4. **Keep it updated**: Update docs when you change styles
5. **Use weights**: Order components logically (0 = first, higher = later)
6. **Group logically**: Use consistent section names

## Generating the Style Guide

After documenting your Sass files, run:

```bash
gulp styleguide
```

Then open `styleguide/index.html` in your browser, or run:

```bash
gulp styleguide:serve
```

To view it at `http://localhost:3001` with auto-reload on changes.