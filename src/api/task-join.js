import request from '@/utils/request'

let model = '/task-join'

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

export function changeStatus(data) {
  return request({
    url: model + '/change-status',
    method: 'post',
    data
  })
}

export function cateOptions() {
  return request({
    url: model + '/cate-options',
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: model + '/edit',
    method: 'post',
    data
  })
}

export function getNews(data) {
  return request({
    url: model + '/change-status',
    method: 'post',
    data
  })
}

export function setSticky(data) {
  return request({
    url: model + '/set-sticky',
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
