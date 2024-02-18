import { brandIcons, eye, eyeClosed, genesisIcons } from '@formkit/icons';
import { generateClasses } from '@formkit/themes';
import genesis from '@formkit/themes/tailwindcss/genesis';

/***
 * Formkit
 ***/

// Create some re-useable definitions because
// many input types are identical in how
// we want to style them.
// console.log({ ...genesis });

genesis['select'] = {
  inner:
    'flex relative max-w-md items-center rounded mb-1 ring-1 ring-gray-400 focus-within:ring-blue-500 focus-within:ring-2 [&>span:first-child]:focus-within:text-blue-500',
  input:
    'w-full pl-3 pr-8 py-2 rounded border-none text-base text-gray-700 placeholder-gray-400 formkit-multiple:p-0 data-[placeholder="true"]:text-gray-400 formkit-multiple:data-[placeholder="true"]:text-inherit',
  option: 'formkit-multiple:p-3 formkit-multiple:text-sm text-gray-700',
};

export const formkitConfig = {
  config: {
    classes: generateClasses(genesis),
  },
  icons: {
    // include supporting icons from @formkit/icons
    eye,
    eyeClosed,
    ...brandIcons,
    ...genesisIcons,
  },
};
