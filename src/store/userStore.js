/*
 * @Author: 集成显卡
 * @Date: 2022-08-25 08:36:34
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2022-09-01 16:19:41
 *
 * 用户相关操作
 * 1、获取当前用户角色
 * 2、判断是否具备某个角色
 */

import { defineStore } from 'pinia'

let inited  = false

export const useUser = defineStore("user", {
    state: () => ({
        roles   : [],
        name    : ""
    }),
    // getters: {
    //     getRoles (){
    //         return this.roles
    //     },
    //     getName (){
    //         return this.name
    //     }
    // },
    actions: {
        /**
         * 加载用户角色列表，如果 inited 为 true 则直接返回
         * @returns
         */
        loadRole (){
            return new Promise((ok, fail)=>{
                if(inited)  return ok(this.roles)

                RESULT("/kaoping/overview", {}, d=> {
                    this.roles   = d.data.roles
                    this.name    = d.data.name
                    console.debug("获取用户总览信息", this.roles, this.name)
                    ok(this.roles)
                    inited  = true
                })
            })
        }
    }
})
