const { SLOT } = require('./utils/constant');

export const templateMap = {
  // import申明
  [SLOT.import]: [],
  // 外部代码
  [SLOT.externalCode]: [],
  // 变量申明代码
  [SLOT.varCode]: [],
  // 逻辑代码
  [SLOT.logicCode]: [],
  // 组件渲染
  [SLOT.render]: [],
  // 外部参数
  [SLOT.propTypes]: [],
};
