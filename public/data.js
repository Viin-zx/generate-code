/** 虚拟dom结构 */
var vnode = {
  componentType: "html" || "antd" || "component", // 组件类型 原生dom | antd组件 | 自定义组件
  componentName: "div" || "Icon" || "MyComponent", // 元素名称 | 组件名称
  // 属性
  props: {
    type: "left",
    disabled: true,
  },
  children: [vnode, vnode], // 子节点
};

/** 页面模板 */
const pageTemplate = {
  // 路由信息
  route: {
    path: "/main/index", // 路由地址
  },

  // 文件信息
  file: {
    name: "MainPage", // 要生成的文件名
    suffix: "js", // 文件后缀
    path: "/", // 文件路径
  },

  // 顶部导航栏信息
  navBar: {
    title: "主页", // 中间显示的title
    leftContent: "返回" || vnode, // 左侧内容 默认 antd 箭头 <
    rightContent: vnode, // 右侧内容
  },
  // 内容
  content: [vnode, vnode, vnode],
};
