import type { IEDirectives } from '@imageengine/imageengine-helpers';

export type TSrcSet = Array<{
  // Relative path to the image.
  src: string;
  // Width descriptor.
  width: string;
  directives?: IEDirectives;
}>;
