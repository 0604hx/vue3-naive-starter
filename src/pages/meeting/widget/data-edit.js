import { ref } from 'vue'

/**
 *
 * @param {*} beforeEdit
 * @param {*} afterEdit
 */
export function enableEdit(beforeEdit=()=>{}, afterEdit()=>{}) {
    let bean = ref({})
    let isNew= ref(false)

    let toEdit = row=>{
        isNew.value= !row || !row.id
        bean.value = row

        beforeEdit()
    }

    defineExpose({ toEdit })

    return { bean, isNew }
}
