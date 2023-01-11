/*
 * @Author: your name
 * @Date: 2020-10-26 14:56:23
 * @LastEditTime: 2023-01-11 18:03:26
 * @LastEditors: 赵婷婷
 * @Description: In User Settings Edit
 * @FilePath: \manuscript-pc\src\api\common.js
 */

import Cookies from 'js-cookie'
import gridsAxios from 'ym-bridge-shandianyun'

export const getGridsList = (basePath) => {
  return gridsAxios.request({
    url: basePath + '/sync/list',
    method: 'get',
  })
}

export const getSyncGridUrl = (id, basePath) => {
  return gridsAxios.request({
    url: basePath + '/sync?id=' + id,
    method: 'get',
  })
}

//获取模块
export const getModules = (basePath) => {
  return gridsAxios.request({
    url: basePath + '/user/get-module',
    method: 'get',
  })
}
