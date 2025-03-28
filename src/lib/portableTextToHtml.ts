// src/lib/portableTextToHtml.js
import { toHTML } from '@portabletext/to-html';
import { urlFor } from './sanityImageUrl';

// Define your custom components
const components = {
  types: {
    image: ({ value }:any) => {
      return `<img src="${urlFor(value).width(800).url()}" alt="${value.alt || ''}" class="rounded-lg my-6" />`;
    },
    code: ({ value }:any) => {
      return `<pre class="bg-gray-800 p-4 rounded text-white overflow-x-auto"><code class="language-${value.language || 'text'}">${value.code}</code></pre>`;
    },
  },
  marks: {
    link: ({ children, value }:any) => {
      const rel = value.href.startsWith('/') ? '' : 'noreferrer noopener';
      return `<a href="${value.href}" ${rel ? `rel="${rel}"` : ''} class="text-blue-600 hover:underline">${children}</a>`;
    },
    strong: ({ children }:any) => `<strong>${children}</strong>`,
    em: ({ children }:any) => `<em>${children}</em>`,
  },
  block: {
    h2: ({ children }:any) => `<h2 class="text-2xl font-bold mt-8 mb-4">${children}</h2>`,
    h3: ({ children }:any) => `<h3 class="text-xl font-bold mt-6 mb-3">${children}</h3>`,
    normal: ({ children }:any) => `<p class="my-4">${children}</p>`,
    blockquote: ({ children }:any) => `<blockquote class="border-l-4 border-gray-300 pl-4 italic my-6">${children}</blockquote>`,
  },
  list: {
    bullet: ({ children }:any) => `<ul class="list-disc ml-6 my-4">${children}</ul>`,
    number: ({ children }:any) => `<ol class="list-decimal ml-6 my-4">${children}</ol>`,
  },
  listItem: {
    bullet: ({ children }:any) => `<li>${children}</li>`,
    number: ({ children }:any) => `<li>${children}</li>`,
  },
};

// Export the conversion function
export function portableTextToHtml(portableText: any) {
  return toHTML(portableText, { components });
}