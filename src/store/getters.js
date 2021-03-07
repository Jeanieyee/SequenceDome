/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-07 10:51:29
 * @LastEditTime: 2019-08-12 19:59:32
 * @LastEditors: Please set LastEditors
 */
const getters = {
  sidebar: state => state.app.sidebar,
  subSidebar: state => state.app.subSidebar,
  device: state => state.app.device,
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  mobile: state => state.user.mobile,
  email: state => state.user.email,
  personId: state => state.user.personId,
  communityCode: state => state.user.communityCode,
  communityQRCode: state => state.user.communityQRCode,
  sidebarRouters: state => state.permission.sidebarRouters,
  sliderActiveIndex: state => state.sidebar.sliderActiveIndex,
}
export default getters
