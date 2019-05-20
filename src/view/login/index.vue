
<template>
  <panel
    :border="false"
    :right-text="$t('register')"
    :bg-color="$colors.bgColorInverse"
    @click-right="toRegisterHandle"
    @click-left="function noop() {}"
    >
    <div slot="left" @click="changeLangHandle">{{ $t("lang.lang") }}</div>

    <div class="logo">
      <van-row type="flex" justify="center">
        <van-col span="6">
          <img v-lazy="img" width="100%" >
        </van-col>
      </van-row>
    </div>

    <div class="form-group">
      <v-form :rules="rules" :model="model" ref="form">
        <van-cell-group>
          <van-cell>
            <v-form-item prop="phone">
              <div class="label" slot="label">
                <van-icon name="phone"></van-icon>
              </div>
              <v-form-input v-model="model.phone" :placeholder="$t('form.phone.placeholder')"></v-form-input>
            </v-form-item>
          </van-cell>
          <van-cell>
            <v-form-item prop="password">
              <div class="label" slot="label">
                <van-icon name="lock"></van-icon>
              </div>
              <v-form-input type="password" v-model="model.password" :placeholder="$t('form.password.placeholder')"></v-form-input>
            </v-form-item>
          </van-cell>
        </van-cell-group>
        <div class="forgotten">
          <span class="tips" @click="toForgottenHandle">{{ $t("forgotten") }}</span>
        </div>
      </v-form>

      <div class="action">
        <van-button :loading="logining" :disabled="logining" :loading-text="$t('logining')" size="large" type="info" @click="loginHandle">{{ $t('login') }}</van-button>
      </div>

    </div>

    <div slot="fixed">
      <van-actionsheet
        v-model="showLang"
        :actions="langActions"
        @select="langSelectHandle"
      />
    </div>
  </panel>
</template>

<script>

import VForm from "../../components/form/form"
import VFormItem from "../../components/form/form-item"
import VFormInput from "../../components/form/form-input"
import storage from "good-storage"
import img from "../../assets/image/logo.png"
// import userApi from "../../api/user"

import { mobile } from "../../assets/utils/util"
import { setup } from "../../assets/locales"

import { Actionsheet } from "vant"
import { mapActions, mapMutations, createNamespacedHelpers } from "vuex"

const UserStore = createNamespacedHelpers("User")

let validateMobile

export default {

  components: {
    [VForm.name]: VForm,
    [VFormItem.name]: VFormItem,
    [VFormInput.name]: VFormInput,
    [Actionsheet.name]: Actionsheet,
  },
  data () {
    validateMobile = (rule, value, callback) => {
      let isMoblie = mobile(value)

      if (!isMoblie) {
        return callback(new Error(this.$t("form.phone.error")))
      }
      callback()
    }
    return {
      img,
      logining: false,
      showLang: false,
      model: {
        phone: "",
        password: "",
      },
    }
  },
  computed: {
    rules () {
      let that = this
      let phoneRules = [
        { required: true, message: that.$t("form.phone.required"), trigger: "blur" },
        { validator: validateMobile, trigger: "change" },
      ]

      let passwordRules = [
        { required: true, message: that.$t("form.password.required"), trigger: "blur" },
        { pattern: /^[a-zA-Z]\w{0,}$/, message: that.$t("form.password.error"), trigger: "change" },
        { pattern: /^.{6,17}$/, message: that.$t("form.password.required"), trigger: "change" },
      ]
      return {
        phone: phoneRules,
        password: passwordRules,
      }
    },
    langActions () {
      return [ {
        name: this.$t("lang.en-US"),
        key: "en-US",
      }, {
        name: this.$t("lang.zh-CN"),
        key: "zh-CN",
      } ]
    },
  },
  created () {
    let phone = storage.get("phone")
    let password = storage.get("password")

    if (phone) {
      this.model.phone = phone
      this.model.password = password
    }
  },

  methods: {
    toRegisterHandle () {
      this.$router.push({ name: "register" })
    },
    toForgottenHandle () {
      this.$router.push({ name: "forgotten" })
    },
    changeLangHandle () {
      this.showLang = true
    },
    langSelectHandle (item) {
      this.showLang = false
      setup(item.key)
    },
    loginHandle () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.logining = true
          setTimeout(() => {
            this.logining = false
            this.$router.push({ name: "mine" })
          }, 3000)
        }
      })
    },
    ...mapActions([
      "toggleKeep",
    ]),
    ...mapMutations([
      "updateToken",
      "updateLifeTime",
    ]),
    ...UserStore.mapActions([
      "getUserInfo",
    ]),
  },
}
</script>

<style lang="less" scoped>
  .logo {
    padding: 25px 0 40px;
  }

  .form-group {
    padding: 0 @spacing-row-lg;

    /deep/ .van-cell {
      padding: @spacing-col-base @spacing-row-lg;
    }

    .label {
      text-align: center;
      width: 30px;
      padding: 0 @spacing-row-sm;
      margin-right: -@spacing-row-base;
      border-right: 1px solid @border-color;
    }

    .forgotten {
      padding: @spacing-col-base @spacing-row-base;
      font-size: @font-size-sm;
      color: @color-danger;
      text-align: right;
    }

    .action {
      margin-top: 60px;
      padding: 0 @spacing-row-lg;
    }
  }
</style>
