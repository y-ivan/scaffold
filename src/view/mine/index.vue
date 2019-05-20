
<template>
  <panel>
    <div class="top">
			<div class="top-cell cell-between">
				<div class="top-cell__info cell-auto">
					<avatar :size="38" :src="$publicPath + info.avatar" />
					<span class="top-cell__info__name">{{ info.name }}</span>
				</div>
				<div class="top-cell__btn cell-between">
					<van-icon name="user-circle-o"></van-icon>
					<span class="top-cell__btn__text">{{ $t("mine.changeBtn") }}</span>
				</div>
			</div>

			<div class="top-cont">
				<div class="top-cont__card">
					<div class="card-company card-cell">
						<span class="card-cell__key">{{ $t("company.name") }}: </span><span class="card-cell__value">{{ info.companys && info.companys.company_name }}</span>
					</div>
					<div class="card-permissions">
						<span class="card-permissions__item">大神</span>
						<span class="card-permissions__item">大神</span>
						<span class="card-permissions__item">大神</span>
						<span class="card-permissions__item">大神</span>
						<span class="card-permissions__item">大神</span>
						<span class="card-permissions__item">大神</span>
						<span class="card-permissions__item">大神</span>
					</div>
					<div class="card-tel card-cell">
						<span  class="card-cell__key">{{ $t("info.tel") }}: </span><span  class="card-cell__value">{{ info.phone }}</span>
					</div>
				</div>
			</div>
		</div>

    <van-cell-group>
      <van-cell :title="$t('mine.cellText.self')" is-link></van-cell>
      <van-cell :title="$t('mine.cellText.add')" is-link></van-cell>
      <van-cell :title="$t('mine.cellText.join')" is-link></van-cell>

      <van-cell :title="$t('mine.cellText.private')" :value="$t('mine.cellText.privated')" is-link></van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="envelop-o" :title="$t('mine.cellText.email')" is-link></van-cell>
      <van-cell icon="setting-o" :title="$t('mine.cellText.setting')" is-link :to="{ name: 'setting' }"></van-cell>
    </van-cell-group>
  </panel>
</template>

<script>

import Avatar from "../../components/avatar"
import { createNamespacedHelpers } from "vuex"

const { mapState } = createNamespacedHelpers("User")

export default {

  components: {
    [Avatar.name]: Avatar,
  },

  computed: {
    ...mapState([
      "info",
    ]),
  },

}
</script>

<style lang="less" scoped>

  @import "../../assets/css/mixins.less";

  .top {
    padding: @spacing-row-base @spacing-row-lg 20px;
    background: @bg-color-inverse;

		.top-cell {

			padding: 0 @spacing-row-base @spacing-col-base;

			&__info {
				display: flex;
				align-items: center;
				font-size: @font-size-lg;

				&__name {
					margin-left: @spacing-col-base;
				}
			}

			&__btn {
        box-sizing: border-box;
				height: 24px;
				padding: 0 @spacing-col-base 0 @spacing-row-sm;
				font-size: @font-size-base;
				border: 1px solid @color-primary;
				border-radius: 12px;
        color: @color-primary;

        &:active {
          background: @bg-color-hover;
        }

				&__text {
          margin-left: @spacing-row-sm;
          font-size: @font-size-sm;
				}
			}

		}

		.top-cont {
      border-radius: @border-radius-lg;
      background: url("../../assets/image/info-card@1.png") no-repeat center/cover;
      overflow: hidden;

			.top-cont__card {
				padding: @spacing-row-lg;
        color: @text-color-inverse;

        .card-company {
					font-size: @font-size-base;
				}

				.card-permissions {
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					align-items: flex-start;
					align-content: space-around;
					height: 45px;
					width: 70%;
					margin: @spacing-col-lg 0;

					&__item {
						padding: 0 @spacing-row-sm;
						font-size: @font-size-sm;
						color: @color-primary;
						background: @bg-color-inverse;
						border-radius: 10px;
						margin-right: @spacing-col-base;
					}
				}
				.card-tel {
					font-size: @font-size-sm;
				}
			}
    }

  }

  .van-cell-group {
    &:not(:last-of-type) {
      margin-bottom: @spacing-col-lg;
    }
  }

</style>
