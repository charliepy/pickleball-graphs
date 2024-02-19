import { brandIcons, eye, eyeClosed, genesisIcons } from '@formkit/icons';
import { generateClasses } from '@formkit/themes';
import genesis from '@formkit/themes/tailwindcss/genesis';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

/***
 * FontAwesome
 ***/
export const faIcons = [faSpinner];

/***
 * Formkit
 ***/

// Create some re-useable definitions because
// many input types are identical in how
// we want to style them.
// console.log({ ...genesis });

genesis.global = {
  fieldset:
    'bg-white border border-gray-200 rounded px-2 pb-1 formkit-invalid:border-red-500 disabled:bg-gray-100',
  help: 'text-sm text-gray-500',
  inner:
    'formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none',
  input:
    'appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none',
  label: 'block mb-1 font-bold',
  legend: 'font-bold',
  loaderIcon: 'inline-flex items-center w-4 text-gray-600 animate-spin',
  message: 'text-red-500 mb-1 text-sm',
  messages: 'list-none p-0 mt-1 mb-0',
  outer: 'mb-4 formkit-disabled:opacity-50',
  prefixIcon:
    'w-10 flex self-stretch grow-0 shrink-0 rounded-tl rounded-bl border-r border-gray-400 bg-white bg-gradient-to-b from-transparent to-gray-200 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto',
  suffixIcon:
    'w-7 pr-3 p-3 flex self-stretch grow-0 shrink-0 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto',
};

genesis['family:box'] = {
  decorator:
    'block relative h-5 w-5 ml-0.5 mr-2 -translate-y-3.5 rounded bg-white bg-gradient-to-b from-transparent to-gray-200 ring-1 ring-cloud peer-checked:ring-blue-500 text-transparent peer-checked:text-blue-500',
  decoratorIcon:
    'flex p-[3px] w-full h-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
  help: 'mb-2 mt-1.5',
  input: 'w-0 h-0 overflow-hidden opacity-0 pointer-events-none peer',
  inner: '$remove:formkit-disabled:bg-gray-200',
  label: '$reset text-gray-700 mt-1 select-none',
  wrapper: 'flex items-end',
};

genesis['family:button'] = {
  input:
    '$reset inline-flex items-center bg-blue-500/90 hover:bg-blue-500 text-white text-base font-semibold py-3 px-6 rounded-lg focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 formkit-disabled:bg-gray-400 formkit-loading:before:w-4 formkit-loading:before:h-4 formkit-loading:before:mr-2 formkit-loading:before:border formkit-loading:before:border-2 formkit-loading:before:border-r-transparent formkit-loading:before:rounded-3xl formkit-loading:before:border-white formkit-loading:before:animate-spin',
  wrapper: 'mb-1',
  prefixIcon: '$reset block w-4 -ml-2 mr-2 stretch',
  suffixIcon: '$reset block w-4 ml-2 stretch',
};

genesis['family:text'] = {
  inner:
    'flex items-center ring-1 focus-within:ring-blue-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-gray-700 rounded-md mb-1 ring-cloud hover:ring-blue-500',
  input:
    'w-full px-3 py-2 border-none rounded-md text-base placeholder-gray-400',
};

genesis.radio = {
  decorator: 'rounded-full',
  decoratorIcon: 'w-5 p-[5px]',
};

genesis['select'] = {
  inner:
    'flex relative max-w-md items-center rounded mb-1 ring-1 ring-gray-400 focus-within:ring-blue-500 focus-within:ring-2 [&>span:first-child]:focus-within:text-blue-500',
  input:
    'w-full pl-3 pr-8 py-2 border-none text-base text-gray-700 placeholder-gray-400 formkit-multiple:p-0 data-[placeholder="true"]:text-gray-400 formkit-multiple:data-[placeholder="true"]:text-inherit',
  selectIcon:
    'flex p-[3px] shrink-0 w-5 mr-2 -ml-[1.5em] h-full pointer-events-none [&>svg]:w-[1em]',
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
