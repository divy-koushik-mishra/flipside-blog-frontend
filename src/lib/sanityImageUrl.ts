// src/lib/sanityImageUrl.js
import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanityConfig';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}