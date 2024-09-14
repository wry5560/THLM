import {axios} from './request'

export function getMemberInfo(params) {
  return axios({
    url: '/gpoints/memberInfo',
    method: 'get',
    params
  })
}
export function getMemberPointsBalance(params) {
  return axios({
    url: '/gpoints/memberPointsBalance',
    method: 'get',
    params
  })
}
export function getAllMpsProjectInfo(params) {
    return axios({
      url: '/gpoints/allMpsProjectInfo',
      method: 'get',
      params
    })
  }
export function getMpsProjectInfo(params) {
  return axios({
    url: '/gpoints/mpsProjectInfo',
    method: 'get',
    params
  })
}
export function getMpsMemberPayRankPage(params) {
  return axios({
    url: '/gpoints/mpsMemberPayRankPage',
    method: 'get',
    params
  })
}
export function getMpsMemberPointsJournal(params) {
  return axios({
    url: '/gpoints/mpsMemberPointsJournal',
    method: 'get',
    params
  })
}

export function editMpsMemberInfo(data) {
  return axios({
    url: '/gpoints/editMpsMemberInfo',
    method: 'post',
    data,
  })
}
