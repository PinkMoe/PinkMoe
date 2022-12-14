/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-22 10:47:46
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-28 16:07:00
 * @FilePath: /pinkmoe_index/hooks/author/layout.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved.
 */
import { useUserStore } from '/@/store/modules/user'
import { getUserInfo } from '/@/api/user'
import type { ReqFollowStatus } from '/@/api/follow/types'
import { createFollow, deleteFollow, followStatus } from '/@/api/follow'
import { useUtil } from '../util'

export const useAuthorLayout = (emit) => {
  const currentMenu = computed(() =>
    route.path.split('/')[3] ? route.path.split('/')[3] : 'userInfo',
  )
  const { proxy } = getCurrentInstance()
  const { getLevel } = useUtil()
  const lev = ref<any>()
  const route = useRoute()
  const router = useRouter()
  const userInfo = ref()

  // 获取作者信息
  const getAuthor = async () => {
    userInfo.value = await getUserInfo({
      uuid: route.params.author,
    })
    lev.value = getLevel(userInfo.value?.exp)
    emit('userInfo', userInfo)
  }

  const menu = [
    {
      icon: ['fas', 'address-card'],
      value: 'userInfo',
      url: `/author/${route.params.author}/userInfo`,
      name: '总览',
    },
    {
      icon: ['fas', 'paint-brush'],
      value: 'post',
      url: `/author/${route.params.author}/post`,
      name: '帖子',
    },
    {
      icon: ['fas', 'user-plus'],
      value: 'follow',
      url: `/author/${route.params.author}/follow`,
      name: '关注',
    },
    {
      icon: ['fas', 'users'],
      value: 'fans',
      url: `/author/${route.params.author}/fans`,
      name: '粉丝',
    },
    {
      icon: ['fas', 'comments'],
      value: 'comment',
      url: `/author/${route.params.author}/comment`,
      name: '评论',
    },
  ]
  const status = ref<boolean>(false)
  const auth = useUserStore()

  const formParams: ReqFollowStatus = reactive({
    toUid: route.params.author as string,
  })

  const getFollowStatus = async () => {
    if (auth.isLogin)
      status.value = await followStatus(formParams)
  }

  const follow = async () => {
    if (!auth.isLogin) {
      proxy.$login({
        type: 'login',
        router,
        route,
      })
    }
    else {
      proxy.$message({
        successMsg: '取消关注成功',
        failedMsg: '取消关注失败',
        loadFun: async () => {
          const { code, message } = await deleteFollow(formParams)
          return { code, message }
        },
      }).then(async (res) => {
        if (res === 200)
          await getFollowStatus()
      })
    }
  }

  const unFollow = async () => {
    if (!auth.isLogin) {
      proxy.$login({
        type: 'login',
        router,
        route,
      })
    }
    else {
      proxy.$message({
        successMsg: '关注成功',
        failedMsg: '关注失败',
        loadFun: async () => {
          const { code, message } = await createFollow(formParams)
          return { code, message }
        },
      }).then(async (res) => {
        if (res === 200)
          await getFollowStatus()
      })
    }
  }

  const jump = () => {
    if (!auth.isLogin) {
      proxy.$login({
        type: 'login',
        router,
        route,
      })
    }
    else {
      router.push({
        path: '/user-center/im',
        query: { sendId: userInfo.value?.uuid },
      })
    }
  }

  onMounted(() => {
    getAuthor()
    getFollowStatus()
  })

  return {
    jump,
    unFollow,
    follow,
    menu,
    userInfo,
    currentMenu,
    status,
    lev,
  }
}
