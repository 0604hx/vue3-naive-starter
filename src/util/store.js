/*
 * @Author: 集成显卡
 * @Date: 2021-11-30 08:30:23
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2022-09-20 17:50:40
 *
 * 基于 localStorage 的简单封装
 */

let S = {
    boolean (k, dv=false){
        let v = this.get(k, 'false')
        return v ==='true'|| v==='1'
    },
    set (k, v){
        return localStorage.setItem(k, v)
    },
    get (k, dv){
        return localStorage.getItem(k) || dv
    },
    getObj (k, dv){
        let item = this.get(k)
        return /^{.*}$/.test(item)? JSON.parse(item) : dv
    },
    setObj (k, v){
        return this.set(k, JSON.stringify(v))
    },
    getList (k){
        return JSON.parse(this.get(k, "[]"))
    },
    setList (k, v, maxLen=10){
        let l = []
        if(Array.isArray(v)) l = v
        else {
            l = this.getList(k)
            let oldIndex = l.indexOf(v)
            if(oldIndex>=0) l.splice(oldIndex, 1)
            l.unshift(v)
        }
        this.set(k, JSON.stringify(l.slice(0, maxLen)))
    }
}
window.Store = window.Store || S
export default S
