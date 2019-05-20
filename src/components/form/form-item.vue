
<template>
    <div class="form-item">
        <label
            v-if="label || $slots.label"
            :for="labelFor"
            class="form-item-label"
            :class="[
                'form-item-label__required' ? isRequired : ''
            ]">
            <slot name="label">{{ label + form.labelSuffix }}</slot>
        </label>
        <div class="form-item-content">
            <slot :state="validateState" :message="validateMessage"></slot>
            <transition :name="showMessageAninate || form.showMessageAninate || 'van-fade'">
                <slot
                    v-if="validateState === 'error' && showMessage && form.showMessage"
                    name="error"
                    :error="validateMessage">
                    <div
                        class="form-item-content__error"
                        :class="[ 'form-item-content__error__' + dir ]"
                    >
                        {{ validateMessage }}
                    </div>
                </slot>
            </transition>
        </div>
    </div>
</template>

<script>
import AsyncValidator from "async-validator"
import emitter from "../../assets/mixins/emitter"
import { noop, getPropByPath, merge } from "../../assets/utils/util"

export default {
  name: "v-form-item",

  componentName: "VFormItem",

  mixins: [ emitter ],

  provide() {
    return {
      VFormItem: this,
    }
  },

  inject: [ "VForm" ],

  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: {
      type: Boolean,
      default: undefined,
    },
    rules: [ Object, Array ],
    error: String,
    validateStatus: String,
    for: String,
    showMessage: {
      type: Boolean,
      default: true,
    },
    dir: {
      type: String,
      default: "bottom",
    },
    showMessageAninate: {
      type: String,
      default: "",
    },
  },
  watch: {
    error: {
      immediate: true,
      handler(value) {
        this.validateMessage = value;
        this.validateState = value ? "error" : ""
      },
    },
    validateStatus(value) {
      this.validateState = value
    },
  },
  computed: {
    labelFor() {
      return this.for || this.prop
    },

    form() {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== "VForm") {
        parent = parent.$parent
        parentName = parent.$options.componentName
      }
      return parent
    },

    fieldValue() {
      const model = this.form.model

      if (!model || !this.prop) { return }

      let path = this.prop

      if (path.indexOf(":") !== -1) {
        path = path.replace(/:/, ".")
      }
      return getPropByPath(model, path, true).v
    },

    isRequired() {
      let rules = this.getRules()
      let isRequired = false
      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            isRequired = true
            return false
          }
          return true
        })
      }
      return isRequired
    },
  },

  data() {
    return {
      validateState: "",
      validateMessage: "",
      validateDisabled: false,
    }
  },
  methods: {
    validate(trigger, callback = noop) {
      this.validateDisabled = false
      const rules = this.getFilteredRule(trigger)

      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback();
        return true;
      }
      this.validateState = "validating"

      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        })
      }
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)
      const model = {}

      model[this.prop] = this.fieldValue
      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.validateState = !errors ? "success" : "error"
        this.validateMessage = errors ? errors[0].message : ""
        callback(this.validateMessage, invalidFields)
        this.VForm && this.VForm.$emit("validate", this.prop, !errors, this.validateMessage || null);
      })
    },

    clearValidate() {
      this.validateState = "";
      this.validateMessage = "";
      this.validateDisabled = false;
    },
    resetField() {
      this.validateState = "";
      this.validateMessage = "";
      let model = this.form.model;
      let value = this.fieldValue;
      let path = this.prop;
      if (path.indexOf(":") !== -1) {
        path = path.replace(/:/, ".");
      }
      let prop = getPropByPath(model, path, true);
      this.validateDisabled = true;
      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.initialValue);
      } else {
        prop.o[prop.k] = this.initialValue;
      }

      // this.broadcast('ElTimeSelect', 'fieldReset', this.initialValue);
    },
    getRules() {
      let formRules = this.form.rules
      console.log(formRules)
      const selfRules = this.rules
      const requiredRule = this.required !== undefined ? { required: !!this.required } : [];
      const prop = getPropByPath(formRules, this.prop || "");
      formRules = formRules ? (prop.o[this.prop || ""] || prop.v) : [];
      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },

    getFilteredRule(trigger) {
      const rules = this.getRules()

      return rules.filter(rule => {
        if (!rule.trigger || trigger === "") return true;

        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1;
        } else {
          return rule.trigger === trigger;
        }
      }).map(rule => merge({}, rule));
    },
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }
      this.validate("change");
    },

    addValidateEvents() {
      const rules = this.getRules();
      if (rules.length || this.required !== undefined) {
        this.$on("form.blur", this.onFieldBlur)
        this.$on("form.change", this.onFieldChange)
      }
    },
    removeValidateEvents() {
      this.$off();
    },
  },
  mounted() {
    if (this.prop) {
      this.dispatch("VForm", "on-form-item-add", [ this ]);
      let initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, "initialValue", {
        value: initialValue,
      });
      this.addValidateEvents();
    }
  },
  beforeDestroy() {
    this.dispatch("VForm", "on-form-item-remove", [ this ]);
  },
}
</script>

<style lang="less">
    @import "../../assets/css/var.less";

    .form-item {
        display: flex;
        align-items: center;

        &-label {
            margin-right: @spacing-row-base;
        }

        &-content {
            flex: 1;
            position: relative;

            &__error {
                display: flex;
                align-items: center;
                position: absolute;
                color: @color-warning-dark;
                font-size: @font-size-sm;
                z-index: 1;
                line-height: @font-size-base;

                &__right {
                  right: 0;
                  top: 0;
                  bottom: 0;
                }
                &__left {
                  left: 0;
                  top: 0;
                  bottom: 0;
                }
                &__top {
                  left: @spacing-row-lg;
                  top: 0;
                  transform: translateY(-100%);
                }
                &__bottom {
                  left: @spacing-row-lg;
                  bottom: 0;
                  transform: translateY(50%);
                }
            }

            /deep/ .van-cell {
                padding: 0;
            }
        }

    }
</style>
