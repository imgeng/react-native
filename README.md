# ImageEngine React Native

This project provides a React Native package for building optimized image URLs using ImageEngine. It includes utility functions and components to handle responsive images efficiently.

## Live Demo

Check out our [CodeSandbox demo](https://codesandbox.io/p/sandbox/serene-wing-jtz6cl) to see the `imageengine-reactnative` package in action.

## Installation

`npm install imageengine-reactnative`

## Usage

### Utilities (`src/utils.ts`)

- **`generateOptimizedImageUrl`**: Constructs an optimized image URL based on the provided `srcSet`, `deliveryAddress`, and other parameters.
- **`chooseAppropriateImage`**: Selects the best image from a `srcSet` that fits the available screen width.
- **`processUrl`**: Cleans up the URL by removing unwanted parts and checks for supported image formats.
- **`constructUrl`**: Builds the final image URL using the provided source and directives.

### Responsive Component (`src/responsive_comp.tsx`)

- **`ResponsiveImage`**: A React component that renders an image optimized for the current screen size. It uses `generateOptimizedImageUrl` to determine the best image URL to use.

### Example Application (`example/src/App.tsx`)

- **`App`**: Demonstrates the usage of the `ResponsiveImage` component with a predefined `srcSet`. It logs when the component is rendered and displays a sample image.

## Types

- **`IEFormat`**: Enum for supported image formats.
- **`IEFit`**: Enum for image fit options.
- **`IEDirectives`**: Class defining image transformation directives.
