import { Dimensions } from 'react-native';
import type { TSrcSet } from './types';
import type { IEDirectives } from '@imageengine/imageengine-helpers';
import type { IEFormat } from '@imageengine/imageengine-helpers';
import { build_IE_url } from '@imageengine/imageengine-helpers';

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
  const directives = chosenEntry.directives;
  const finalDirectives = {
    ...directives,
    width: chosenEntry.width
      ? parseInt(chosenEntry.width.replace('w', ''), 10)
      : undefined,
  };
  return constructUrl(`${deliveryAddress}${processedSrc}`, finalDirectives);
}

export function chooseAppropriateImage(
  srcSet: TSrcSet,
  availableWidth: number,
  defaultSrc: string,
  defaultWidth: number
) {
  let bestFit: TSrcSet[number] | null = null;
  for (let i = 0; i < srcSet.length; i++) {
    const entry = srcSet[i];
    if (!entry) continue;
    const entryWidth = parseInt(entry.width.replace('w', ''), 10);
    if (
      availableWidth >= entryWidth &&
      (!bestFit || entryWidth > parseInt(bestFit.width.replace('w', ''), 10))
    ) {
      bestFit = entry;
    }
  }
  // Compare bestFit with default, ensuring it doesn't exceed availableWidth
  if (
    bestFit &&
    parseInt(bestFit.width.replace('w', ''), 10) < defaultWidth &&
    defaultWidth < availableWidth
  ) {
    bestFit = null;
  }
  return (
    bestFit || {
      src: defaultSrc,
      width: defaultWidth?.toString(),
      directives: {}, // should add default directives in the main function if it makes sense
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

export function processUrl(url: string, stripFromSrc: string) {
  if (stripFromSrc) {
    url = url.replace(stripFromSrc, '');
  }
  const extension = url.split('.').pop()?.toLowerCase() as IEFormat;
  if (!extension || !ALLOWED_INPUT_EXTENSIONS.includes(extension)) {
    console.warn(`Unsupported image format: ${extension}`);
  }
  return url;
}

export function constructUrl(src: string, directives: IEDirectives) {
  return build_IE_url(src, directives);
}
