
/**
 * 广播 通知到子组件
 *
 * @param {String} componentName 通知的需要查找的组件名称
 * @param {String} eventName 通知的组件需要触发的事件名称
 * @param {*} params 通知的组件触发事件所携带的参数
 */
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    if (componentName === child.$options.componentName) {
      child.$emit.apply(child, [ eventName ].concat(params))
    } else {
      broadcast.apply(child, [ componentName, eventName ].concat(params))
    }
  })
}

export default {
  methods: {

    /**
     * 派发 通知到父组件
     *
     * @param {String} componentName 通知的需要查找的组件名称
     * @param {String} eventName 通知的组件需要触发的事件名称
     * @param {*} params 通知的组件触发事件所携带的参数
     * @param {VNode} context 改变派发开始的上下文 `应用于子组件没有添加 emitter mixins`
     */
    dispatch(componentName, eventName, params, context) {
      let parent = context || this.$parent || this.$root
      let name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [ eventName ].concat(params))
      }
    },

    /**
     * 广播 通知到子组件
     *
     * @param {String} componentName 通知的需要查找的组件名称
     * @param {String} eventName 通知的组件需要触发的事件名称
     * @param {*} params 通知的组件触发事件所携带的参数
     */
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    },

    /**
     * 内部不能引用 emitter 的子组件的帮助函数
     *
     * @param {*} params 通知的组件触发事件所携带的参数
     * @param {*} name 引用子组件上下文的ref
     * @param {*} trigger 通知的组件需要触发的类型
     * @param {String} [eventName="VFormItem"] 通知的需要查找的组件名称
     */
    triggerHandle (params, name, trigger, componentName = "VFormItem") {
      this.dispatch(componentName, "form." + trigger, [ params ], this.$refs[name]);
    },
  },
}
