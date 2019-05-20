
/**
 * 从组件中获取hook函数并调用
 *
 * @export getHookFromComponent
 * @param {VNode} component 查找的组件上下文
 * @param {String} name hook函数名称
 * @returns 找到的hook函数或false
 */
export function getHookFromComponent(component, name) {
  return component[name] || (component.options && component.options[name])
}

/**
 * 从组件列表调用hook函数
 *
 * @export
 * @param {VNode[]} componentList 组件列表
 * @param {String} hookName hook函数名称
 * @param {*} params 调用hook函数传入的参数列表
 * @returns
 */
export function callComponentsHookWith(componentList, hookName, params) {
  return componentList.map((component) => {
    const hook = getHookFromComponent(component, hookName)

    if (hook) {
      return hook(params)
    }
  }).filter(_ => _)
}

/**
 * 获取顶级 `vnode` 对象
 *
 * @export getRootVnode
 * @param {VNode} context 开始查找的vnode对象
 * @returns 返回顶级对象
 */
export function getRootVnode (context) {
  const parent = context.parent
  if (parent === undefined) {
    return context
  } else {
    return getRootVnode(parent)
  }
}