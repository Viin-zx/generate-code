/**
 * 导出模板文件
 */

const fs = require('fs')
const path = require('path')
const { prettierFormat } = require('./utils')
const { insertSlotCode } = require('./insertSlotCode')

const distPath = path.resolve(__dirname, '../dist')

const exportTemplate = props => {
  const component = require(path.resolve(
    __dirname,
    '../src/components/GList/template.js',
  ))

  const component1 = require(path.resolve(
    __dirname,
    '../src/components/GTabBar/template.js',
  ))

  // 读取基础模板代码
  fs.readFile(path.resolve(__dirname, './baseTemplate.js'), (err, data) => {
    if (err) {
      return console.error(err)
    }

    // 分隔基础模板代码，方便插入
    let baseTemplateArr = data.toString().split('\n')

    // 将模板代码插入到contentTemplate中
    // FIXME: 写死两个模板代码，后续用读取的方式
    let contentTemplate = {}
    contentTemplate = insertSlotCode(contentTemplate, component)
    contentTemplate = insertSlotCode(contentTemplate, component1)

    for (const slot in contentTemplate) {
      if (contentTemplate.hasOwnProperty(slot)) {
        const value = contentTemplate[slot]

        for (let i = 0; i < baseTemplateArr.length; i++) {
          const row = baseTemplateArr[i]
          // 将代码插入到指定插槽后面
          if (row.indexOf(`@#${slot}#@`) > -1) {
            baseTemplateArr.splice(i + 1, 0, value)
            break
          }
        }
      }
    }

    // 格式化内容
    const writeContent = prettierFormat(baseTemplateArr.join('\n'))

    // 创建输出到dist文件夹的文件
    fs.rmdir(path.resolve(__dirname, '../dist'), () => {})
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath, () => {})
    }

    // 输出文件
    fs.writeFile(
      path.resolve(__dirname, '../dist/template.jsx'),
      writeContent,
      err => {
        if (err) {
          return console.error(err)
        }
        console.log('success')
      },
    )
  })
}

module.exports = {
  exportTemplate,
}
