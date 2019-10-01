import request from '@/utils/request'

let model = '/price'   //指定模块名称,快速生成增删改查接口名

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

