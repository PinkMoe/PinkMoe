<!--
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-22 09:55:56
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-27 11:24:11
 * @FilePath: /pinkmoe_index/components/Commentcontent/index.vue
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved.
-->
<script lang="ts" setup name="Commentcontent">
import CommentContent from '/@/components/Commentcontent/index.vue'

defineProps({
  item: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['showComment'])
function showComment(item) {
  emit('showComment', item)
}

defineExpose({
  showComment,
})
</script>

<template>
  <div v-for="(i, index) in item.children" :key="index">
    <div
      class="flex flex-row justify-between items-center bg-gray-100 dark:bg-gray-800 dark:border-gray-500 pl-2 border-l-2 border-gray-300"
    >
      <div class="text-xs text-gray-500 dark:text-gray-200 py-2 flex flex-row">
        <NuxtLink :to="`/author/${i.FormUidRelation.uuid}/userInfo`" class="text-pink-400">
          {{ i.FormUidRelation.nickName }}
        </NuxtLink>
        回复
        <NuxtLink :to="`/author/${i.FormUidRelation.uuid}/userInfo`" class="text-pink-400">
          {{ i.ToUidRelation.nickName }}
        </NuxtLink>
        :
        <div class="flex flex-row" v-html="i.content" />
      </div>
      <div
        class="text-xs text-pink-400 dark:hover:bg-pink-400 dark:hover:text-white w-10 py-2 flex justify-center items-center hover:bg-pink-400 hover:text-white duration-300 cursor-pointer"
        @click="showComment(i)"
      >
        回复
      </div>
    </div>
    <CommentContent :item="i" @showComment="showComment" />
  </div>
</template>
