/*
 * @Author: your name
 * @Date: 2020-10-26 14:56:23
 * @LastEditTime: 2021-01-08 10:28:56
 * @LastEditors: 赵婷婷
 * @Description: In User Settings Edit
 * @FilePath: \manuscript-pc\src\api\common.js
 */

import Cookies from 'js-cookie';
import gridsAxios from 'ym-bridge-shandianyun';

// let basePath = 'https://shandianyun-extraction.iqilu.com';
// let basePath = 'http://user.shandian.design';
let basePath = '';

console.log('gridsAxios', gridsAxios);
console.log('COOKIE', Cookies.get('jwt_token'));

export const getGridsList = (params) => {
  return gridsAxios.request({
    url: basePath + '/sync/list',
    method: 'get',
    params,
  });
};

export const getSyncGridUrl = (id) => {
  return gridsAxios.request({
    url: basePath + '/sync?id=' + id,
    method: 'get',
  });
};
