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
  console.log('Constructed image URL:', optimizedSrc);
  return (
    <Image source={{ uri: optimizedSrc }} style={{ width: 300, height: 300 }} />
  );
};

export default ResponsiveImage;
