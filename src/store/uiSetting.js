/*
 * @Author: 0604hx/集成显卡
 * @Date: 2022-03-26 21:58:12
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2023-07-04 15:19:17
 *
 * UI 相关配置
 */
import { defineStore } from 'pinia'

let detectTheme = v =>{
    let theme = v || H.store.get("ui.theme", "auto")
    let _dark = theme==='dark'
    if(!_dark && theme==='auto'){
        let hour = new Date().getHours()
        _dark = hour >= 18 || hour<=8
    }
    return _dark?"dark":"light"
}

export const useUISetting = defineStore('ui', {
    state: () => ({
        theme: detectTheme(),           // light，dark，auto（自动）
    }),
    getters: {
        getTheme() {
            return this.theme
        }
    },
    actions: {
        updateTheme(theme) {
            this.theme = detectTheme(theme)
            H.store.set("ui.theme", theme)
        }
    }
})
