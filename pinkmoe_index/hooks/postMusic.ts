/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-27 22:05:53
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-28 16:31:27
 * @FilePath: /pinkmoe_index/hooks/postMusic.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved.
 */
import { useUserStore } from '/@/store/modules/user'
import { buyPostMusic, getPostMusic } from '/@/api/post'
import { createDialogModal } from '../utils/createModal'
import MsgConfirm from '/@/components/Msgconfirm/index.vue'

export const usePostMusic = (props) => {
  const auth = useUserStore()
  const postMusic = ref()
  const route = useRoute()
  const router = useRouter()
  const { proxy } = getCurrentInstance()
  const musicList = ref()
  const getMusic = async () => {
    postMusic.value = await getPostMusic({ postId: props.postId })
    if (JSON.stringify(postMusic.value) !== '{}') {
      musicList.value = postMusic.value
      musicList.value.forEach((element) => {
        element.title = element.name
        element.src = element.url
        element.artist = props.nickName
      })
    }
  }

  const buyMusic = async (item) => {
    const res = await createDialogModal(MsgConfirm, {
      msg: '确认购买此商品？',
    })
    if (res) {
      if (!auth.isLogin) {
        proxy.$login({
          type: 'login',
          router,
          route,
        })
        return
      }
      proxy.$message({
        successMsg: '购买成功',
        failedMsg: '购买失败',
        loadFun: async () => {
          const { code, message } = await buyPostMusic({
            postId: props.postId,
            musicId: item.ID,
          })
          return { code, message }
        },
      }).then((res) => {
        if (res.code === 200)
          getMusic()
      })
    }
  }

  onMounted(() => {
    getMusic()
  })

  return {
    postMusic,
    buyMusic,
    musicList,
  }
}
