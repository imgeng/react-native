import { Dimensions } from 'react-native';
import type { TSrcSet } from './types';
import type { IEDirectives } from '@imageengine/imageengine-helpers';
import type { IEFormat } from '@imageengine/imageengine-helpers';

export function generateOptimizedImageUrl(
  srcSet: TSrcSet,
  deliveryAddress: string,
  defaultSrc: string,
  defaultWidth: number,
  stripFromSrc: string
) {
  const screenWidth = Dimensions.get('window').width;
  const chosenEntry = chooseAppropriateImage(
    srcSet,
    screenWidth,
    defaultSrc,
    defaultWidth
  );
  const processedSrc = processUrl(chosenEntry.src, stripFromSrc);
  const directives = chosenEntry.directives || {};
  const finalDirectives = {
    ...directives,
    width: chosenEntry.width
      ? parseInt(chosenEntry.width.replace('w', ''), 10)
      : undefined,
  };
  return constructUrl(`${deliveryAddress}${processedSrc}`, finalDirectives);
}

function chooseAppropriateImage(
  srcSet: TSrcSet,
  availableWidth: number,
  defaultSrc: string,
  defaultWidth: number
) {
  let bestFit: TSrcSet[number] | null = null;
  srcSet.forEach((entry) => {
    const entryWidth = parseInt(entry.width.replace('w', ''), 10);
    if (
      availableWidth >= entryWidth &&
      (!bestFit || entryWidth > parseInt(bestFit.width.replace('w', ''), 10))
    ) {
      bestFit = entry;
    }
  });
  return (
    bestFit || {
      src: defaultSrc,
      width: defaultWidth?.toString(),
      directives: {},
    }
  );
}

const ALLOWED_INPUT_EXTENSIONS: (IEFormat | 'tif')[] = [
  'png',
  'gif',
  'jpg',
  'jpeg',
  'bmp',
  'webp',
  'jp2',
  'svg',
  'mp4',
  'jxr',
  'avif',
  'jxl',
  'tif',
];

function processUrl(url: string, stripFromSrc: string) {
  if (stripFromSrc) {
    url = url.replace(stripFromSrc, '');
  }
  const extension = url.split('.').pop()?.toLowerCase() as IEFormat;
  if (!extension || !ALLOWED_INPUT_EXTENSIONS.includes(extension)) {
    console.warn(`Unsupported image format: ${extension}`);
  }
  return url;
}

function constructUrl(src: string, _directives: IEDirectives) {
  return src;
}
