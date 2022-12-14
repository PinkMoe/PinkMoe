/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-04-26 00:39:36
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-07 09:25:44
 * @FilePath: /pinkmoe_admin/src/views/system/api/columns.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved. 
 */
import { h } from 'vue';
import { NTag } from 'naive-ui';

export const columns = [
  {
    title: 'api路径',
    key: 'path',
  },
  {
    title: 'api描述',
    key: 'description',
  },
  {
    title: '方法',
    key: 'method',
    render(row) {
      return h(
        NTag,
        {},
        {
          default: () => (row.method ? row.method : '暂无'),
        }
      );
    },
  },
  {
    title: 'api分组',
    key: 'apiGroup',
  },
];
