/*
 * @Author: 集成显卡
 * @Date: 2021-09-16 16:17:29
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2022-09-30 16:06:28
 */
const ROOMS     = "meeting.room"
const MEETINGS  = "meeting.list"

let getRooms    = ()=> Store.getList(ROOMS)
let meetings    = ()=> Store.getList(MEETINGS)
let toHour      = i=>i<10?("0"+i):i

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
        let rooms = getRooms()
        let index = rooms.indexOf(r=> r.id==opts.body.id)
        if(index > -1)
            rooms.slice(index, 1)

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

    },
    'meeting/confirm': opts=>{

    }
}
