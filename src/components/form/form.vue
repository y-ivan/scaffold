
<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>

import { merge } from "../../assets/utils/util"

export default {
  name: "v-form",

  componentName: "VForm",

  provide () {
    return {
      VForm: this,
    }
  },

  props: {
    model: {
      type: Object,
    },

    rules: {
      type: Object,
    },
    showMessage: {
      type: Boolean,
      default: true,
    },
    labelSuffix: {
      type: String,
      default: ":",
    },
  },

  watch: {
    rules() {
      this.fields.forEach(field => {
        field.removeValidateEvents()
        field.addValidateEvents()
      })

      if (this.validateOnRuleChange) {
        this.validate(() => {})
      }
    },
  },

  data () {
    return {
      fields: [],
    }
  },

  created(){
    this.$on("on-form-item-add", item => {
      if (item) {
        this.fields.push(item)
      }
    })
    this.$on("on-form-item-remove", item =>{
      if (item.prop) {
        this.fields.splice(this.fields.indexOf(item), 1)
      }
    })
  },

  methods:{

    resetFields(){
      this.fields.forEach(field => {
        field.resetField()
      })
    },

    clearValidate(props = []) {
      const fields = props.length
        ? (typeof props === "string"
          ? this.fields.filter(field => props === field.prop)
          : this.fields.filter(field => props.indexOf(field.prop) > -1)
        ) : this.fields

      fields.forEach(field => {
        field.clearValidate()
      })
    },

    validate(callback){
      let promise

      if (typeof callback !== "function" && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function(valid) {
            valid ? resolve(valid) : reject(valid);
          }
        });
      }

      let valid = true
      let count = 0
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true)
      }

      let invalidFields = {}

      this.fields.forEach(field => {

        field.validate("", (message, field) => {
          if (message) {
            valid = false;
          }
          invalidFields = merge({}, invalidFields, field);
          if (typeof callback === "function" && ++count === this.fields.length) {
            callback(valid, invalidFields);
          }
        });
      });

      if (promise) {
        return promise
      }
    },

    validateField(props, cb) {
      props = [].concat(props)

      const fields = this.fields.filter(field => props.indexOf(field.prop) !== -1)

      if (!fields.length) {
        console.warn("[Form Warn]please pass correct props!")
        return
      }

      fields.forEach(field => {
        field.validate("", cb);
      });
    },
  },
}
</script>

<style lang="less" scoped>

</style>
