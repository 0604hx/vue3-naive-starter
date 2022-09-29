/*
 * @Author: 集成显卡
 * @Date: 2021-09-16 16:17:29
 * @Last Modified by: 0604hx/集成显卡
 * @Last Modified time: 2022-09-29 23:25:06
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
                    items:[
                        { begin, cell: Math.ceil(Math.random()*4), title: `${name}（${begin})` }
                    ]
                }
            })
        }
    },
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
