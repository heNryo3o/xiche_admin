import request from '@/utils/request'

let model = '/account'   //指定模块名称,快速生成增删改查接口名

export function workerDeposit(data) {
  return request({
    url: model + '/worker-deposit',
    method: 'get',
    params: data
  })
}

export function userDeposit(data) {
  return request({
    url: model + '/user-deposit',
    method: 'get',
    params: data
  })
}

export function successOrder(data) {
  return request({
    url: model + '/success-order',
    method: 'get',
    params: data
  })
}

export function workerWithdraw(data) {
  return request({
    url: model + '/worker-withdraw',
    method: 'get',
    params: data
  })
}

export function withdrawAudit(data) {
  return request({
    url: model + '/withdraw-audit',
    method: 'post',
    data
  })
}

export function couponIndex(data) {
  return request({
    url: model + '/coupon-index',
    method: 'get',
    params: data
  })
}

export function couponCreate(data) {
  return request({
    url: model + '/coupon-create',
    method: 'post',
    data
  })
}
