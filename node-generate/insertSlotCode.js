const { SLOT } = require('./utils/constant')
const { prettierFormat } = require('./utils')
const { margeHOCSlotCode, mergeImportSlotCode } = require('./marge')

/**
 * 向指定插槽下一行插入代码
 */
const insertSlotCode = (oldTemplate, component) => {
  Object.keys(component).forEach(slot => {
    const newValue = prettierFormat(component[slot], { printWidth: 1000 })
    let oldValue = oldTemplate[slot] || ''

    switch (slot) {
      case SLOT.import:
        // import 合并
        oldTemplate[slot] = mergeImportSlotCode(oldValue, newValue)
        break

      case SLOT.HOC:
        // HOC 合并
        oldTemplate[slot] = margeHOCSlotCode(oldValue, newValue)
        break

      default:
        oldTemplate[slot] = oldValue.concat('\n', newValue)
        break
    }
  })

  return oldTemplate
}

module.exports = {
  insertSlotCode,
}
