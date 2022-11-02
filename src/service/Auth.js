/*
 * @Author: 集成显卡
 * @Date: 2022-11-02 13:34:30
 * @Last Modified by:   集成显卡
 * @Last Modified time: 2022-11-02 13:34:30
 */

export function checkRole(requireRole) {
    let roles = window.User ? (User.roles || []) : []
    return typeof (requireRole) === 'string' ? roles.includes(requireRole) : requireRole(roles)
}
