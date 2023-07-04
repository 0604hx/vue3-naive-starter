import dayjs from "dayjs"

const YMD = "YYYY-MM-DD"
const HMS = "HH:mm:ss"

let date = (d = new Date(), f = YMD) => dayjs(d).format(f)
let time = (d = new Date()) => dayjs(d).format(HMS)
let datetime = (d = new Date()) => dayjs(d).format(`${YMD} ${HMS}`)
let addDay = (step = 1, d, key = "day") => dayjs(d).add(step, key).format(YMD)

export {
    date,
    time,
    datetime,
    addDay
}

export const compact = (d = new Date())=> date(d, "YYYYMMDD")
export const compactTime = (d=new Date())=> date(d, "HHmmss")
export const hour  = ()=> new Date().getHours()
/**
 * 获取时间点开始日期
 * @param {*} key
 * @returns
 */
export const beginOf = (key="month", f = YMD)=> dayjs().startOf(key).format(f)
export const endOf = (key="month",f = YMD) => dayjs().endOf(key).format(f)
/**
 * 获取两个日期相差的值，默认为天数
 * @param {*} from
 * @param {*} to
 * @param {*} type
 */
export const diff = (form, to, type="day")=> dayjs(from).diff(dayjs(to), type)
/**
 * 日期字符串转化为时间戳
 * @param {*} v
 * @returns
 */
export const toLong = v=> new Date(v).getTime()

/**
* 转换为 Y，M，D 数组
* @returns
*/
export const array = (d=new Date()) => date(d).split("-")
