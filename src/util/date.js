import dayjs from "dayjs"

const YMD = "YYYY-MM-DD"
const HMS = "HH:mm:ss"

let date        = (d=new Date(), f=YMD)=>dayjs(d).format(f)
let time        = (d=new Date())=>dayjs(d).format(HMS)
let datetime    = (d=new Date())=>dayjs(d).format(`${YMD} ${HMS}`)
let addDay      = (step=1, d, key="day")=>dayjs(d).add(step, key).format(YMD)
// let relative    = t=>{
//     let mins = Math.floor((Date.now() - t)/1000/60)
//     if(mins< 60)     return `${mins} 分钟`
//     if(mins<24*60)  return `${Math.ceil(mins/60)} 小时`
//     return `${Math.ceil(mins/24/60)} 天`
// }
let relative    = (t, minSuffix="", timePrefix="于")=>{
    let mins = Math.floor((Date.now() - t)/1000/60)
    if(mins< 180)     return `${mins} 分钟${minSuffix}`
    return dayjs(new Date(t)).format(`${timePrefix} HH:mm`)
}

window.D = window.D || {
    date,
    time,
    datetime,
    relative,
    relativeHistory (t){
        return relative(t, "前")
    },
    hour (){
        return new Date().getHours()
    },
    addDay,
    /**
     * 获取时间点开始日期
     * @param {*} key
     * @returns
     */
    beginOf (key="month"){
        return dayjs().startOf(key).format(YMD)
    },
    endOf (key="month"){
        return dayjs().endOf(key).format(YMD)
    },
    /**
     * 获取两个日期相差的值，默认为天数
     * @param {*} from
     * @param {*} to
     * @param {*} type
     */
    diff (from, to, type="day"){
        return dayjs(from).diff(dayjs(to), type)
    }
}

export default D
