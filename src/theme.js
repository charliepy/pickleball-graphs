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
