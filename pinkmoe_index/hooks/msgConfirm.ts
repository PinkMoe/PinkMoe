/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-28 13:15:23
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-19 17:47:12
 * @FilePath: /pinkmoe_vitesse/src/hooks/msgConfirm.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved.
 */
export const useMsgConfirm = (props, emit) => {
  const dialog = ref()
  const showAnimate = ref<boolean>(false)
  const { proxy } = getCurrentInstance()

  onMounted(() => {
    dialog.value.show()
  })

  return {
    showAnimate,
    dialog,
  }
}
