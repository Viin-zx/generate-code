const fs = require('fs');
const path = require('path');
const { SLOT } = require('./constant');
const { prettierFormat } = require('./utils');

const template = require(path.resolve(
  __dirname,
  '../src/components/GList/template.js',
));

const insertSlotCode = (arrTemplate, slot, context) => {
  for (let i = 0; i < arrTemplate.length; i++) {
    const row = arrTemplate[i];
    if (row.indexOf(`#${slot}#`) > -1) {
      arrTemplate.splice(i + 1, 0, context);
      return arrTemplate;
    }
  }
  arrTemplate;
};

fs.readFile(path.resolve(__dirname, './baseTemplate.js'), (err, data) => {
  if (err) {
    return console.error(err);
  }

  let baseTemplateArr = data.toString().split('\r\n');

  Object.values(SLOT).forEach(slot => {
    baseTemplateArr = insertSlotCode(baseTemplateArr, slot, template[slot]);
  });

  const context = prettierFormat(baseTemplateArr.join('\r\n'));

  fs.rmdir(path.resolve(__dirname, '../dist'), () => {});
  fs.mkdir(path.resolve(__dirname, '../dist'), () => {});

  fs.writeFile(
    path.resolve(__dirname, '../dist/template.jsx'),
    context,
    err => {
      if (err) {
        return console.error(err);
      }

      console.log('success');
    },
  );
});
