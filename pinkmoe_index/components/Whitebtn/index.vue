<!--
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-23 17:33:37
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-28 19:58:23
 * @FilePath: /pinkmoe_index/components/Whitebtn/index.vue
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved.
-->
<script lang="ts" setup name="Whitebtn">
defineProps({
  value: {
    type: String,
    default: '登陆',
  },
  icon: {
    type: String,
    default: '',
  },
  classes: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div
    :class="classes"
    class="w-full flex justify-center items-center select-none py-1.5 cursor-pointer dark:bg-gray-800 dark:text-gray-200 dark:border-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-700 hover:bg-gray-200 duration-300 active:bg-gray-100 bg-white border-2 border-gray-200 text-xs text-gray-600 text-center"
  >
    <i :class="`inline-block i-${icon}`" />
    <span class="ml-1">{{ value }}</span>
  </div>
</template>
