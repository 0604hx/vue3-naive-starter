/**
 * 权限判断指令，如组件标记了 v-role="ADMIN"  需要 ADMIN 权限方可显示
 */
export const Role = {
    mounted(el, binding) {
        const { value } = binding
        /**
         * 由于自定义指令无法作用于自定义组件上（即智能用于 div、span 等标准元素）
         * 所以移除 dom 元素时，直接将父元素移除
         */
        if (!checkRole(value)) el.parentNode && el.parentNode.remove()
    }
}
