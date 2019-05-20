
const autoprefixer = require("autoprefixer")
const pxtorem = require("postcss-pxtorem")

module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/" : '/',
  css: {
    loaderOptions: {
      less: {
        // 样式变量两份  一份为 vant 框架 一份便于自己使用 看自己习惯
        modifyVars: {
          blue: "#1989fa",
          "color-primary": "#1989fa",

          green: "#07c160",
          "color-success": "#07c160",

          orange: "#ff976a",
          "color-warning": "#ff976a",

          red: "#f44",
          "color-danger": "#f44",

          orangeDark: "#ed6a0c",
          "color-warning-dark": "#ed6a0c",

          orangeLight: "#fffbe8",
          "color-warning-light": "#fffbe8",

          white: "#fff",
          "text-color-inverse": "#fff",
          "bg-color-inverse": "#fff",

          gray: "#c9c9c9",
          "text-color-gray": "#c9c9c9",

          grayLight: "#e5e5e5",
          "text-color-gray-light": "#e5e5e5",

          grayDarker: "#7d7e80",
          "text-color-gray-dark": "#7d7e80",

          grayDark: "#969799",
          "text-color-disabled": "#969799",

          textColor: "#323233",
          "text-color": "#323233",

          borderColor: "#ebedf0",
          "border-color": "#ebedf0",

          activeColor: "#f2f3f5",
          "bg-color-hover": "#f2f3f5",

          backgroundColor: "#f8f8f8",
          "bg-color-gray": "#f8f8f8",

          backgroundColorLight: "#fafafa",
          "bg-color": "#fafafa",

          black: "#000",

          "bg-color-mask": "rgba(0, 0, 0, 0.4)",

          "font-size-sm": "12px",
          "font-size-base": "14px",
          "font-size-lg": "16px",

          "img-size-sm": "20px",
          "img-size-base": "36px",
          "img-size-lg": "40px",

          "border-radius-sm": "2px",
          "border-radius-base": "4px",
          "border-radius-lg": "6px",
          "border-radius-circle": "50%",

          "spacing-row-sm": "5px",
          "spacing-row-base": "10px",
          "spacing-row-lg": "15px",

          "spacing-col-sm": "4px",
          "spacing-col-base": "8px",
          "spacing-col-lg": "12px",

          "opacity-disabled": "0.3",

          "color-title": "#2C405A", // 文章标题颜色
          "font-size-title": "20px",
          "color-subtitle": "#555555", // 二级标题颜色
          "font-size-subtitle": "18px",
          "color-paragraph": "#3F536E", // 文章段落颜色
          "font-size-paragraph": "15px",
        },
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: [ "*" ],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: [ "van-circle__layer" ],
          }),
        ],
      },
    },
  },

  // 开启 eslint 校验
  lintOnSave: process.env.NODE_ENV !== "production",

  devServer: {
    proxy: {
      "/api": {
        // 需要代理的api
        target: "http://api-host.cn/",
        changeOrigin: true,
        pathRewrite: {
          "^api": "",
        },
      },
    },
  },
}