# Project Style Guide

Welcome to the style guide for this project. This living document showcases all available UI components, styling patterns, and design tokens used throughout the site.

## Overview

This style guide is automatically generated from inline documentation in our Sass files using KSS (Knyle Style Sheets) notation. It provides:

- Visual examples of all components
- Code snippets for implementation
- Available modifiers and variations
- Usage guidelines

## How to Use This Guide

Browse through the sections in the navigation menu to explore different components:

- **Base** - Foundation styles including colors, typography, and variables
- **Layout** - Page structure components like headers, footers, and grids
- **Modules** - Reusable UI components such as buttons, cards, and forms
- **State** - Dynamic states and animations

## Getting Started

All components are built using the SMACSS (Scalable and Modular Architecture for CSS) methodology, which organizes styles into five categories:

1. **Base** - Default HTML element styles
2. **Layout** - Major structural components
3. **Modules** - Reusable, modular components
4. **State** - How modules look in different states
5. **Theme** - Color schemes and visual themes

## Design Tokens

### Colors

Our color palette is defined in `base/_variables.scss` and includes:
- Primary, secondary, and accent colors
- Semantic colors (success, warning, danger, info)
- Neutral grays for text and backgrounds

### Typography

Typography scales and font families are defined to maintain visual hierarchy and readability across the site.

### Spacing

We use a consistent spacing scale based on an 8px grid system for predictable and harmonious layouts.

## Code Standards

- Use BEM naming convention for modules
- Prefix layout classes with `l-`
- Prefix state classes with `is-` or `has-`
- Keep specificity low
- Use Sass variables for all values that may change

## Contributing

When adding new components:

1. Create the component file in the appropriate SMACSS folder
2. Add KSS documentation comments
3. Import the file in `style.scss`
4. Run `gulp styleguide` to regenerate the style guide

## Questions?

For more information about KSS documentation syntax, see the [KSS Documentation Guide](KSS-DOCUMENTATION-GUIDE.md).