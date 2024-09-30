import React from 'react';
import { Image } from 'react-native';
import { generateOptimizedImageUrl } from './utils';
import type { TSrcSet } from './types';

interface ResponsiveImageProps {
  srcSet: TSrcSet;
  src: string;
  deliveryAddress: string;
  stripFromSrc?: string;
  width?: number;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  srcSet,
  src,
  deliveryAddress,
  stripFromSrc,
  width,
}) => {
  const optimizedSrc = generateOptimizedImageUrl(
    srcSet,
    deliveryAddress,
    src,
    width ?? 0,
    stripFromSrc ?? ''
  );
  return <Image source={{ uri: optimizedSrc }} />;
};

export default ResponsiveImage;
