/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-23 14:24:31
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-28 17:03:31
 * @FilePath: /pinkmoe_index/hooks/user-center/settings.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved.
 */
import { useUserStore } from '/@/store/modules/user'
import {
  updateUserAvatar,
  updateUserDetail,
  updateUserEmail,
  updateUserEmailCaptcha,
  updateUserPwd,
} from '/@/api/user'
import type {
  ReqUserAvatar,
  ReqUserDetail,
  ReqUserEmail,
  ReqUserEmailCaptcha,
  ReqUserPwd,
} from '/@/api/user/types'
import { upload } from '/@/api/upload'
import { useUtil } from '../util'

export const useUserCenterSettings = () => {
  const formUserDetail = ref()
  const formUserEmail = ref()
  const formUserPwd = ref()
  const loading = ref(false)
  const { checkForm } = useUtil()
  const sendCaptcha = ref<boolean>(true)
  const captchaTimer = ref<number>(60)
  const auth = useUserStore()
  const { proxy } = getCurrentInstance()

  const detailFormParams: ReqUserDetail = reactive({
    desc: auth.userInfo?.desc,
    nickName: auth.userInfo?.nickName,
  })

  const pwdFormParams: ReqUserPwd = reactive({
    oldPassword: '',
    password: '',
    reNewPwd: '',
  })

  const emailFormParams: ReqUserEmail = reactive({
    emailCode: '',
    emailCaptcha: '',
  })

  const emailCaptchaFormParams: ReqUserEmailCaptcha = reactive({
    emailCode: '',
    emailType: 'changePwd',
  })

  const avatarFormParams: ReqUserAvatar = reactive({
    avatar: auth.userInfo?.avatar,
  })

  async function updateDetail() {
    if (
      checkForm(detailFormParams.nickName?.toString(), '[\\s\\S]{1,7}$', '请输入正确的昵称格式')
      && checkForm(detailFormParams.desc?.toString(), '[\\s\\S]{3,100}$', '请输入正确的描述格式')
    ) {
      proxy.$message({
        successMsg: '更新成功',
        failedMsg: '更新失败',
        loadFun: async () => {
          const { code, message } = await updateUserDetail(detailFormParams)
          return { code, message }
        },
      })
    }
  }

  async function updateAvatar() {
    proxy.$message({
      successMsg: '更新成功',
      failedMsg: '更新失败',
      loadFun: async () => {
        const { code, message } = await updateUserAvatar(avatarFormParams)
        return { code, message }
      },
    })
  }

  async function getEmailCaptcha() {
    if (sendCaptcha.value) {
      const email = RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')
      emailCaptchaFormParams.emailCode = emailFormParams.emailCode
      if (!email.test(<string>emailCaptchaFormParams.emailCode)) {
        proxy.$message({
          type: 'warning',
          successMsg: '请输入正确的邮箱格式',
          loadFun: async () => {
            const code = 200
            return { code }
          },
        })
        return
      }
      proxy.$message({
        successMsg: '获取成功',
        failedMsg: '获取失败',
        loadFun: async () => {
          const { code, message } = await updateUserEmailCaptcha(emailCaptchaFormParams)
          return { code, message }
        },
      }).then(async (res) => {
        if (res.status === 200) {
          sendCaptcha.value = false
          const timer = setInterval(() => {
            captchaTimer.value--
            if (captchaTimer.value < 1) {
              clearInterval(timer)
              sendCaptcha.value = true
            }
          }, 1000)
        }
      })
    }
  }

  async function updateEmail() {
    if (
      checkForm(
        emailFormParams.emailCaptcha?.toString(),
        '[0-9]{5,6}$',
        '请输入正确的邮箱验证码格式',
      )
      && checkForm(
        emailFormParams.emailCode,
        '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$',
        '请输入正确的邮箱格式',
      )
    ) {
      emailFormParams.emailCaptcha = emailFormParams.emailCaptcha?.toString()
      proxy.$message({
        successMsg: '更新成功',
        failedMsg: '更新失败',
        loadFun: async () => {
          const { code, message } = await updateUserEmail(emailFormParams)
          return { code, message }
        },
      })
    }
  }

  async function updatePwd() {
    if (
      checkForm(
        pwdFormParams.oldPassword,
        '(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$',
        '请输入正确的密码格式',
      )
      && checkForm(
        pwdFormParams.password,
        '(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$',
        '请输入正确的密码格式',
      )
      && checkForm(
        pwdFormParams.reNewPwd,
        '(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$',
        '请输入正确的密码格式',
      )
    ) {
      if (pwdFormParams.password !== pwdFormParams.reNewPwd) {
        proxy.$message({
          type: 'warning',
          successMsg: '二次密码不一样',
          loadFun: async () => {
            const code = 200
            return { code }
          },
        })
        return
      }
      proxy.$message({
        successMsg: '更新成功',
        failedMsg: '更新失败',
        loadFun: async () => {
          const { code, message } = await updateUserPwd(pwdFormParams)
          return { code, message }
        },
      })
    }
  }

  async function uploadPostImg(event: any) {
    const fd = new FormData()
    fd.append('file', event.target.files[0])
    fd.append('uuid', auth.userInfo?.uuid as string)
    fd.append('type', 'user')
    const { code, message, result } = await upload(fd)
    if (code === 200) {
      avatarFormParams.avatar = result.file?.url
      updateAvatar()
    }
    else {
      proxy.$message({
        type: 'warning',
        successMsg: message || '更新失败',
        loadFun: async () => {
          const code = 200
          return { code }
        },
      })
    }
    event.target.value = ''
  }

  onMounted(() => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 300)
  })

  return {
    loading,
    auth,
    sendCaptcha,
    captchaTimer,
    detailFormParams,
    emailFormParams,
    avatarFormParams,
    pwdFormParams,
    formUserDetail,
    formUserPwd,
    formUserEmail,
    updateDetail,
    uploadPostImg,
    updatePwd,
    getEmailCaptcha,
    updateEmail,
  }
}
