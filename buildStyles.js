import fs from 'fs';
import config from './config';

const { colors } = config;

const colorsToVariables = colorsDict =>
  Object.keys(colorsDict).reduce(
    (acc, color) => `${acc}$${color}: ${colorsDict[color]};\n`,
    '',
  );

try {
  let file = '// colors\n';
  file += colorsToVariables(colors);

  const template = fs
    .readFileSync('./src/styles/variablesTemplate.scss')
    .toString();
  file += template;

  fs.writeFileSync('./src/styles/variables.scss', file);
} catch (err) {
  console.log(err.message); //eslint-disable-line
}
