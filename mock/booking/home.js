/*
 * @Author: 集成显卡
 * @Date: 2021-09-16 16:17:29
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2022-10-08 13:27:21
 *
 * mockjs语法 https://www.jianshu.com/p/533a869c808c
 * 使用 mockjs 随机生成大批量常用字段的值 https://blog.csdn.net/wuyujin1997/article/details/111656446
 */
import Mock from "mockjs"
const R = Mock.Random

const ROOMS     = "meeting.room"
const MEETINGS  = "meeting.list"

let getRooms    = ()=> Store.getList(ROOMS)
let meetings    = ()=> Store.getList(MEETINGS)
let toHour      = i=>i<10?("0"+i):i
let getId       = opts=> JSON.parse(opts.body).id

/**
 * 修改或者删除指定预约
 * @param {*} opts          mock 传递过来的参数对象
 * @param {*} modifyFunc    修改函数或者 true（删除元素）
 */
let modifyMeeting = (opts, modifyFunc)=>{
    let id      = getId(opts)
    let list    = meetings()

    if(typeof(modifyFunc) == 'function'){
        let m   = list.filter(m=> m.id==id)[0]
        if(!m)  throw Error(`ID=${id} 的会议预约不存在`)

        modifyFunc(m)
    }
    else if(modifyFunc == true){
        let index = list.map(m=>m.id).indexOf(id)
        if(index > -1)
            list.splice(index, 1)
    }
    else
        throw Error("参数 2 必须为 函数 或者 TRUE")

    Store.setList(MEETINGS, list)
}

export default {
    'overview': opts=>{
        return {
            roles   : ['ADMIN'],
            name    : "集成显卡"
        }
    },
    'room/list' : opts=> getRooms(),
    'room/add'  : opts=>{
        let r = JSON.parse(opts.body)
        let rooms = getRooms()
        if(r.id){
            rooms[rooms.findIndex(v=>v.id==r.id)] = r
        }
        else{
            r.id = Date.now()
            rooms.push(r)
        }
        Store.setList(ROOMS, rooms)
    },
    'room/delete': opts=>{
        let id      = getId(opts)
        let rooms   = getRooms()
        let index   = rooms.map(r=>r.id).indexOf(id)
        if(index > -1)
            rooms.splice(index, 1)

        Store.setList(ROOMS, rooms)
    },
    /*
    会议预约相关
    */
    'meeting/overview': opts=>{
        let day = JSON.parse(opts.body).day
        let mList = meetings().filter(m=>m.day==day)
        return {
            hourBegin: 9,
            hourEnd: 20,
            rooms: getRooms().map(v=>{
                let label = v.name
                let begin = `${toHour(9+Math.floor(Math.random()*10))}:00`
                return {
                    label,
                    value: v.id,
                    color: "#18a058",//colors[v],
                    items: mList.filter(m=>m.roomId==v.id)
                }
            })
        }
    },
    'meeting/list': opts=>{
        return meetings()
    },
    'meeting/mine': opts=>{
        return meetings()
    },
    //提交会议预约，不做冲突处理
    'meeting/add': opts=>{
        let m = JSON.parse(opts.body)
        let room = getRooms().filter(v=>v.id==m.roomId)[0]
        if(!room)   throw Error(`会议室 ${m.roomId} 不存在`)

        m.uid   = "admin"
        m.uname = "集成显卡(admin)"
        m.room  = room.name
        m.status = room.special? 0 : 1
        m.createOn = D.date()
        let list = meetings()
        list.push(m)

        Store.setList(MEETINGS, list)
    },
    'meeting/delete': opts=>{
        modifyMeeting(opts, true)
    },
    'meeting/confirm': opts=>{
        modifyMeeting(opts, m=> m.status = 1)
    },
    'meeting/dashboard': opts=>{
        let rooms = getRooms().map(r=>r.name)
        let res = Mock.mock({
            "data|40-100": [{
                id: "@increment",
                title: "@cword(5,20)",
                'status|0-1': 1,
                'uid|000101-000999': 1,
                uname: "@cname",
                day:"@date(2022-MM-dd)"
            }]
        })
        let meetings = res.data
        meetings.forEach(m=> m.room = rooms[R.integer(0, rooms.length-1)])
        return { data: {rooms, meetings}, message:"" }
    }
}
