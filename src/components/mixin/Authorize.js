import { ref, onMounted,reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import { useUser } from "@Store/userStore"

const user = useUser()

/**
 * 判断是否具备某个角色，否则跳转到指定的页面
 * @param {*} role
 * @param {*} jumpTo
 */
export function needRole(role, jumpTo="403"){
    let roles = ref([])
    let authed = ref(false)

    onBeforeMount(async ()=>{
        const router = useRouter()

        roles.value = await user.loadRole()
        authed.value= roles.value.includes(role)
        if(!authed.value) {
            console.debug(`%c当前页面（${router.currentRoute.value.path}）需要角色 ${role} ！！`, "color:white;background:red;padding:10px")
            router.replace({name:"403"})
        }
    })

    return { roles, authed }
}
