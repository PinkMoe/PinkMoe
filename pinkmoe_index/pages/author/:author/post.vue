<!--
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-22 17:31:17
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-27 11:25:30
 * @FilePath: /pinkmoe_index/pages/author/:author/post.vue
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved.
-->
<script lang="ts" setup name="AuthorAuthorPost">
import AuthorLayout from '/@/components/Authorlayout/index.vue'
import NotFound from '/@/components/NotFound/index.vue'
import Spin from '/@/components/Spin/index.vue'
import MoreBtn from '/@/components/Morebtn/index.vue'
import { useAuthorPost } from '/@/hooks/author/post'
import { useAppStore } from '/@/store/modules/app'
import { useHead } from '@vueuse/head'

const { authorPostList, loading, hasMore, nextPage } = useAuthorPost()

const { siteBasic } = useAppStore()
useHead({
  title: '用户文章 - 用户主页',
  meta: [
    { name: 'og:type', content: 'post' },
    {
      name: 'og:title',
      content: '用户文章 - 用户主页',
    },
    { name: 'og:url', content: siteBasic?.url },
  ],
})
</script>

<template>
  <AuthorLayout>
    <div class="flex justify-start flex-wrap mt-4 animate-fadeIn30">
      <Spin :show="loading">
        <div
          v-if="authorPostList && authorPostList.list?.length"
          class="w-full flex justify-start flex-wrap animate-fadeIn30"
        >
          <div v-for="(post, v) in authorPostList.list" :key="v" class="w-1/6 p-1.5">
            <Article :post="post" img-height="h-60" />
          </div>
          <div class="w-full p-1.5 text-gray-500">
            <MoreBtn v-if="hasMore" @click="nextPage" />
          </div>
        </div>
        <NotFound v-else />
      </Spin>
    </div>
  </AuthorLayout>
</template>
