import React from 'react';
import { SafeAreaView } from 'react-native';
import { Types } from '../../src/index';
import ResponsiveImage from '../../src/responsive_comp';
import { Text } from 'react-native';

const srcSet: Types.TSrcSet = [
  {
    src: '/images/pic_1_variation_2.jpg',
    directives: { rotate: 180 },
    width: '320w',
  },
  {
    src: '/images/pic_1_variation_2.jpg',
    directives: { rotate: 180 },
    width: '480w',
  },
  {
    src: '/images/pic_1_variation_1.jpg',
    directives: { rotate: 180 },
    width: '800w',
  },
];

const App: React.FC = () => {
  console.log('App component rendered');
  return (
    <SafeAreaView>
      <Text>App Component Loaded</Text>
      <ResponsiveImage
        srcSet={srcSet}
        src="/images/pic_1_variation_2.jpg"
        deliveryAddress="http://blazing-fast-pics.cdn.imgeng.in"
        stripFromSrc=""
      />
    </SafeAreaView>
  );
};

export default App;
