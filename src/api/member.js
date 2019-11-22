import request from '@/utils/request'

let model = '/user'   //指定模块名称,快速生成增删改查接口名

export function getList(data) {
  return request({
    url: model + '/index',
    method: 'get',
    params: data
  })
}

export function edit(data) {
  return request({
    url: model + '/edit',
    method: 'post',
    data
  })
}

export function deposit(data) {
  return request({
    url: model + '/deposit',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: model + '/create',
    method: 'post',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: model + '/change-status',
    method: 'post',
    data
  })
}

export function changePassword(data) {
  return request({
    url: model + '/change-password',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: model + '/info',
    method: 'get',
    params: data
  })
}

export function getLogs(data) {
  return request({
    url: model + '/logs',
    method: 'get',
    params: data
  })
}

export function loginCalculate(data) {
  return request({
    url: model + '/login-calculate',
    method: 'get',
    params: data
  })
}

export function validateInfo(data) {
  return request({
    url: model + '/validate-info',
    method: 'get',
    params: data
  })
}

export function storeInfo(data) {
  return request({
    url: model + '/store-info',
    method: 'get',
    params: data
  })
}

export function serviceList(data) {
  return request({
    url: model + '/service-list',
    method: 'get',
    params: data
  })
}

export function publishTask(data) {
  return request({
    url: model + '/publish-task',
    method: 'get',
    params: data
  })
}

export function joinTask(data) {
  return request({
    url: model + '/join-task',
    method: 'get',
    params: data
  })
}

export function casesList(data) {
  return request({
    url: model + '/cases-list',
    method: 'get',
    params: data
  })
}
