import request from '@/utils/request'

let model = '/solution-company'

export function getList(data) {
  return request({
    url: model + '/index',
    method: 'get',
    params: data
  })
}

export function getInfo(data) {
  return request({
    url: model + '/info',
    method: 'get',
    params: data
  })
}

export function productList(data) {
  return request({
    url: 'solution-product/index',
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

export function editProduct(data) {
  return request({
    url: '/solution-product/edit',
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

export function createProduct(data) {
  return request({
    url:'/solution-product/create',
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

export function productStatus(data) {
  return request({
    url: '/solution-product/change-status',
    method: 'post',
    data
  })
}

export function destroy(data) {
  return request({
    url: model + '/destroy',
    method: 'post',
    data
  })
}
