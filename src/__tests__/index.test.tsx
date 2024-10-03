import {
  generateOptimizedImageUrl,
  processUrl,
  chooseAppropriateImage,
} from '../utils';
import { Dimensions } from 'react-native';

jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(),
  },
}));

describe('generateOptimizedImageUrl', () => {
  beforeEach(() => {
    (Dimensions.get as jest.Mock).mockReturnValue({ width: 800 });
  });

  it('should generate URL with appropriate image based on screen width', () => {
    const srcSet = [
      { src: 'image-400w.jpg', width: '400w', directives: {} },
      { src: 'image-800w.jpg', width: '800w', directives: {} },
    ];
    const url = generateOptimizedImageUrl(
      srcSet,
      'https://example.com/',
      'default.jpg',
      400,
      ''
    );
    expect(url).toBe('https://example.com/image-800w.jpg');
  });

  it('should use default image if no appropriate image found', () => {
    const srcSet = [{ src: 'image-200w.jpg', width: '200w', directives: {} }];
    const url = generateOptimizedImageUrl(
      srcSet,
      'https://example.com/',
      'default.jpg',
      400,
      ''
    );
    expect(url).toBe('https://example.com/default.jpg');
  });

  it('should strip specified part from URL', () => {
    const srcSet = [{ src: 'image-800w.jpg', width: '800w', directives: {} }];
    const url = generateOptimizedImageUrl(
      srcSet,
      'https://example.com/',
      'default.jpg',
      400,
      'image-'
    );
    expect(url).toBe('https://example.com/800w.jpg');
  });

  it('should warn if image format is unsupported', () => {
    console.warn = jest.fn();
    const srcSet = [{ src: 'image-800w.xyz', width: '800w', directives: {} }];
    generateOptimizedImageUrl(
      srcSet,
      'https://example.com/',
      'default.jpg',
      400,
      ''
    );
    expect(console.warn).toHaveBeenCalledWith('Unsupported image format: xyz');
  });

  it('should apply directives correctly', () => {
    const srcSet = [
      { src: 'image-800w.jpg', width: '800w', directives: { rotate: 90 } },
    ];
    const url = generateOptimizedImageUrl(
      srcSet,
      'https://example.com/',
      'default.jpg',
      400,
      ''
    );
    expect(url).toBe('https://example.com/image-800w.jpg?imgeng=/r_90/w_800');
  });
});

describe('processUrl', () => {
  it('should strip specified part from URL', () => {
    const url = processUrl('image-800w.jpg', 'image-');
    expect(url).toBe('800w.jpg');
  });

  it('should warn if image format is unsupported', () => {
    console.warn = jest.fn();
    processUrl('image-800w.xyz', '');
    expect(console.warn).toHaveBeenCalledWith('Unsupported image format: xyz');
  });

  it('should not warn if image format is supported', () => {
    console.warn = jest.fn();
    processUrl('image-800w.jpg', '');
    expect(console.warn).not.toHaveBeenCalled();
  });
});

describe('chooseAppropriateImage', () => {
  it('should choose the best fit image based on available width', () => {
    const srcSet = [
      { src: 'image-400w.jpg', width: '400w', directives: {} },
      { src: 'image-800w.jpg', width: '800w', directives: {} },
    ];
    const chosenImage = chooseAppropriateImage(srcSet, 800, 'default.jpg', 400);
    expect(chosenImage.src).toBe('image-800w.jpg');
  });

  it('should return default image if no appropriate image found', () => {
    const srcSet = [{ src: 'image-200w.jpg', width: '200w', directives: {} }];
    const chosenImage = chooseAppropriateImage(srcSet, 800, 'default.jpg', 400);
    expect(chosenImage.src).toBe('default.jpg');
  });
});
