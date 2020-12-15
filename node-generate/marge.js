const regExps = require('./utils/regExps')

/**
 * 合并HOC代码
 * @param {*} oldValue
 * @param {*} newValue
 * @param {*} name
 */
function margeHOCSlotCode(oldValue, newValue, name = 'BaseTemplate') {
  const oldArr = oldValue ? oldValue.split('\n') : []
  const newArr = newValue ? newValue.split('\n') : []

  const margeArr = [...new Set([...oldArr, ...newArr])]
  let str = name
  margeArr.forEach(item => {
    if (item) {
      str = `${item}(${str})`
    }
  })

  return `export default ${str}`
}

/**
 * 合并import代码
 *
 * import React from 'react';
 * import { useState } from 'react';
 * import React, { useState } from 'react';
 *
 */
function mergeImportSlotCode(oldValue, newValue) {
  const oldArr = oldValue
    ? oldValue.split('\n').map(str => importStrToVirtual(str))
    : []
  const newArr = newValue
    ? newValue.split('\n').map(str => importStrToVirtual(str))
    : []

  for (let i = 0; i < newArr.length; i++) {
    const newVirtual = newArr[i]
    if (!newVirtual) {
      break
    }

    const oldVirtual = oldArr.find(
      oldVirtual => oldVirtual.fromModule === newVirtual.fromModule,
    )

    if (oldVirtual) {
      if (
        oldVirtual.importDefault &&
        oldVirtual.importDefault !== newVirtual.importDefault
      ) {
        throw new Error('合并import失败， 默认命名冲突')
      } else {
        oldVirtual.importDefault = newVirtual.importDefault
      }

      if (newVirtual.importChildren.length) {
        oldVirtual.importChildren = Array.from(
          new Set([...oldVirtual.importChildren, ...newVirtual.importChildren]),
        )
      }
    } else {
      oldArr.push(newVirtual)
    }
  }

  return oldArr.map(obj => importVirtualToStr(obj)).join('\n')
}

/**
 * 将import字符串 导入语句转成 虚拟import
 * @param {*} str
 */
function importStrToVirtual(str) {
  const virtual = {
    fromModule: '',
    importDefault: '',
    importChildren: [],
  }

  if (!str) return null

  const strFrom = str.split('from')
  // 获取导入的模块
  virtual.fromModule = strFrom[1].replace(regExps.spaceQuote, '')

  // 获取导入的组件
  const strImport = strFrom[0].split('import')[1]
  if (strImport.includes('{')) {
    // 匹配 import React, { useState } from 'react' 中的 React,
    var tmp = strImport.match(/(.+?)(?={.+?})/g)
    if (tmp) {
      // 默认组件名
      virtual.importDefault = tmp[0].replace(regExps.spaceComma, '')

      // 子组件列表
      // 匹配 import React, { useState } from 'react' 中的 { useState }
      virtual.importChildren =
        strImport
          .match(/({.+?})/g)[0]
          .replace(/\s|\{|\}/g, '')
          .split(',') || []
    } else {
      // 子组件列表
      virtual.importChildren =
        strImport.replace(/\s|\{|\}/g, '').split(',') || []
    }
  } else {
    // 默认组件名
    virtual.importDefault = strImport.replace(/\s/g, '')
  }

  return virtual
}

/**
 * 将虚拟import 导入语句转成 import字符串
 * @param {*} obj
 */
function importVirtualToStr(obj) {
  let str = ''
  const strChildren = obj.importChildren.length
    ? `{${obj.importChildren.join(',')}}`
    : ''

  if (obj.importDefault) {
    if (strChildren) {
      str = `${obj.importDefault}, ${strChildren}`
    } else {
      str = obj.importDefault
    }
  } else {
    str = strChildren
  }

  return `import ${str} from '${obj.fromModule}';`
}

module.exports = {
  margeHOCSlotCode,
  mergeImportSlotCode,
}
