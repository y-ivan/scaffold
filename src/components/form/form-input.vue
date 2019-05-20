
<template>
    <div class="form-input">
        <van-field
            ref="input"
            v-model="currentVal"
            :label="label"
            :type="type"
            :size="size"
            :border="border"
            :disabled="disabled"
            :readonly="readonly"
            :clearable="clearable"
            :required="required"
            :is-link="isLink"
            :error="error"
            :error-message="errorMessage"
            :label-width="labelWidth"
            :label-align="labelAlign"
            :input-align="inputAlign"
            :error-message-align="errorMessageAlign"
            :autosize="autosize"
            :left-icon="leftIcon"
            :right-icon="rightIcon"
            :maxlength="maxlength"
            :placeholder="placeholder"
            :autofocus="autofocus"
            @input="inputHandle"
            @focus="focusHandle"
            @blur="blurHandle"
            @keypress="keypressHandle"
            @clear="clearHandle"
            @click-left-icon="clickLeftIconHandle"
            @click-right-icon="clickRightIconHandle"
        >
            <slot v-if="$slots.leftIcon" name="left-icon" slot="left-icon"></slot>
            <slot v-if="$slots.rightIcon" name="right-icon" slot="right-icon"></slot>
            <slot v-if="$slots.label" name="label" slot="label"></slot>
            <slot v-if="$slots.button" name="button" slot="button"></slot>
        </van-field>
    </div>
</template>

<script>
import emitter from "../../assets/mixins/emitter"
import { Field } from "vant"

export default {
  name: "v-form-input",

  componentName: "VFormInput",

  mixins: [ emitter ],

  components: {
    [Field.name]: Field,
  },

  inject: {
    VForm: {
      default: "",
    },
    VFormItem: {
      default: "",
    },
  },

  props: {
    label: {
      default: null,
    },
    value: {
      type: [ String, Number ],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    size: {
      type: String,
      default: "",
    },
    border: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    isLink: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    labelWidth: {
      type: [ String, Number ],
      default: "90px",
    },
    labelAlign: {
      type: String,
      default: "left",
    },
    inputAlign: {
      type: String,
      default: "left",
    },
    errorMessageAlign: {
      type: String,
      default: "left",
    },
    autosize: {
      type: [ Boolean, Object ],
      default: false,
    },
    leftIcon: {
      type: String,
      default: "",
    },
    rightIcon: {
      type: String,
      default: "",
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
    maxlength: Number,
    placeholder: {
      type: String,
      default: "",
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    currentVal (val) {
      if (this.validateEvent) {
        this.dispatch("VFormItem", "form.change", [ val ]);
      }
    },
    value (val) {
      this.currentVal = val
    },
  },

  data() {
    return {
      currentVal: this.value,
    }
  },
  methods: {
    focus() {
      this.$refs.input && this.$refs.input.focus();
    },

    blur() {
      this.$refs.input && this.$refs.input.blur();
    },
    inputHandle (event) {
      this.$emit("input", event);
    },
    blurHandle (event) {
      this.focused = false;
      this.$emit("blur", event);
      if (this.validateEvent) {
        this.dispatch("VFormItem", "form.blur", [ this.currentVal ]);
      }
    },
    clearHandle (event) {
      this.$emit("clear", event)
    },
    focusHandle (event) {
      this.focused = true;
      this.$emit("focus", event)
    },
    keypressHandle (event) {
      this.$emit("keypress", event)
    },
    changeHandle (event) {
      this.$emit("change", event)
    },
    clickLeftIconHandle () {
      this.$emit("click-left-icon")
    },
    clickRightIconHandle () {
      this.$emit("click-right-icon")
    },
  },
}
</script>