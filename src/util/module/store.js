/*
 * @Author: 集成显卡
 * @Date: 2021-11-30 08:30:23
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2022-09-20 17:50:40
 *
 * 基于 localStorage 的简单封装
 */
const get = (k, dv)=> localStorage.getItem(k) || dv
const set = (k, dv)=> localStorage.setItem(k, dv)

export const boolean = (k, dv=false)=> {
    let v = get(k)
    return v == undefined?dv: (v ==='true'|| v==='1')
}

export const getObj = (k, dv={})=>{
    let item = get(k)
    return /^{.*}$/.test(item)? JSON.parse(item) : dv
}

export const setObj = (k, v, v2)=>{
    if(typeof(v) === 'object')
            return set(k, JSON.stringify(v))
    else if(typeof(v)==='string'){
        let obj = getObj(k)
        obj[v]  = v2
        return set(k, JSON.stringify(obj))
    }
}

export const getList = k=> JSON.parse(get(k,"[]"))

export const setList = (k, v, maxLen=10)=>{
    let l = []
    if(Array.isArray(v)) l = v
    else {
        l = getList(k)
        let oldIndex = l.indexOf(v)
        if(oldIndex>=0) l.splice(oldIndex, 1)
        l.unshift(v)
    }
    set(k, JSON.stringify(l.slice(0, maxLen)))
}

export { set, get }
