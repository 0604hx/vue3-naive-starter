/*
 * @Author: 集成显卡
 * @Date: 2022-03-31 17:50:26
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2022-08-26 13:03:54
 *
 * 分页复用模块
 */

import { ref, onMounted,reactive, createVNode } from 'vue'

export default (api, autoLoad=true, loader=undefined)=>{
    let ps = typeof(api) == 'object'? api: {url: api, form:{}}
    let beans = ref([])
    let pagination = reactive({
        loading: false,
        page:1,
        pageSize: 20,
        showSizePicker:true,
        pageSizes: [20, 50, 100],
        itemCount:0,
        prefix: info=> createVNode('div', {}, `加载 ${beans.value.length} 条数据（数据总数 ${info.itemCount}）`),
        onChange: page=> {
            pagination.page = page
            refresh()
        },
        onUpdatePageSize : pageSize => {
            pagination.pageSize = pageSize
            refresh()
        }
    })
    let form = ref(ps.form||{})

    let refresh = loader || function(){
        let p = {page: pagination.page, pageSize: pagination.pageSize}
        pagination.loading = true
        RESULT(ps.url, {form: form.value, pagination: p}, d=>{
            beans.value = d.data
            pagination.itemCount = d.total
            pagination.loading = false
            console.debug(`分页信息加载完成`, ps.url, d)
        })
    }

    onMounted(() => {
        if(autoLoad)    refresh()
    })

    return { beans, pagination, form, refresh }
}
