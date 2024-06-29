import {axios} from './request'

export function getMemberInfo(params) {
  return axios({
    url: '/user/memberInfo',
    method: 'get',
    params
  })
}
export function getMemberPointsBalance(params) {
  return axios({
    url: '/user/memberPointsBalance',
    method: 'get',
    params
  })
}
export function getMemberStake(params) {
    return axios({
      url: '/user/memberStake',
      method: 'get',
      params
    })
  }
export function getMemberPointsJournal(params) {
  return axios({
    url: '/user/memberPointsJournal',
    method: 'get',
    params
  })
}
export function getBenefits(params) {
  return axios({
    url: '/benefits',
    method: 'get',
    params
  })
}
export function getMemberBenefits(params) {
  return axios({
    url: '/benefits/memberBenefits',
    method: 'get',
    params
  })
}
export function getMemberBenefitsByAddress(params) {
  return axios({
    url: '/benefits/memberBenefitsByAddress',
    method: 'get',
    params
  })
}

export function joinBenefits(params) {
  return axios({
    url: '/benefits/joinBenefits',
    method: 'get',
    params,
  })
}
export function editSocialInfo(data) {
  return axios({
    url: '/user/editSocial',
    method: 'post',
    data,
  })
}
export function editRealAddress(params) {
  return axios({
    url: '/user/editRealAddress',
    method: 'get',
    params,
  })
}