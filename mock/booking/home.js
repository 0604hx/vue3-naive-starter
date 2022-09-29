/*
 * @Author: 集成显卡
 * @Date: 2021-09-16 16:17:29
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2022-09-29 11:15:36
 */
const ROOMS     = "meeting.room"
const MEETINGS  = "meeting.list"

let getRooms = ()=> Store.getList(ROOMS)
let meetings = ()=> Store.getList(MEETINGS)

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
    'meeting/list': opts=>{
        return []
    },
    'meeting/add': opts=>{

    },
    'meeting/delete': opts=>{

    },
    'meeting/confirm': opts=>{

    }
}
