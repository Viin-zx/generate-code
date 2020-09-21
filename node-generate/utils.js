const prettier = require('prettier');

const prettierFormat = str =>
  prettier.format(str, {
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    arrowParens: 'always',
    bracketSpacing: true,
    singleQuote: true,
    semi: true,
    eslintIntegration: false,
    parser: 'babel',
  });

module.exports = {
  prettierFormat,
};
