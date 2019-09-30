import request from '@/utils/request'

let model = '/setting'

export function getInfo(data) {
  return request({
    url: model + '/info',
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

