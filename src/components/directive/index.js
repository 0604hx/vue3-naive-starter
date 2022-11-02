import * as PermissionDirectives from "./Permission"

export function setupDirectives(app) {
    console.groupCollapsed("[注册自定义指令]")
    let directives = [PermissionDirectives]
    directives.forEach(ds=>{
        Object.keys(ds).forEach(key => {
            app.directive(key, ds[key])
            console.debug(`自定义指令\t${key}`)
        })
    })
    console.groupEnd()
}
