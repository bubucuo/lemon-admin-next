// @ts-ignore
/* eslint-disable */
// import { request } from '@umijs/max';

import http from "src/utils/http";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return http.get("/api/currentUser", options);
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return http.post("/api/login/outLogin", options);
}

/** 登录接口 POST /api/login/account */
export async function login(
  body: API.LoginParams,
  options?: { [key: string]: any }
) {
  return http.post("/api/login/account", body, options);
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return http.get("/api/notices", options);
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return http.get("/api/rule", {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return http.post("/api/rule", options);
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return http.post("/api/rule", options);
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return http.post("/api/rule", options);
}
