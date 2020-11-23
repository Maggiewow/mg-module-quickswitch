/*
 * @Author: your name
 * @Date: 2020-10-26 14:56:23
 * @LastEditTime: 2020-11-19 16:06:24
 * @LastEditors: 赵婷婷
 * @Description: In User Settings Edit
 * @FilePath: \manuscript-pc\src\api\common.js
 */
import gridsAxios from "ym-bridge-shandianyun";

let basePath = "https://shandianyun-extraction.iqilu.com";

export const getGridsList = params => {
  return gridsAxios.request({
    url: basePath + "/xxx",
    method: "get",
    params
  });
};

export const getSyncGridUrl = id => {
  return gridsAxios.request({
    url: basePath + "/sync?id=" + id,
    method: "get"
  });
};
