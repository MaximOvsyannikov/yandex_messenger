import Handlebars from 'handlebars';

export const registerHelpers = () => {
  Handlebars.registerHelper('eq', (a, b) => a === b);
  Handlebars.registerHelper('noteq', (a, b) => a !== b);
};
