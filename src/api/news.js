import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/news/index',
    method: 'get',
    params: data
  })
}

export function getInfo(data) {
  return request({
    url: '/news/info',
    method: 'get',
    params: data
  })
}

export function changeStatus(data) {
  return request({
    url: '/news/change-status',
    method: 'post',
    data
  })
}

export function cateOptions() {
  return request({
    url: '/news/cate-options',
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: '/news/edit',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/news/create',
    method: 'post',
    data
  })
}

export function getNews(data) {
  return request({
    url: '/news/change-status',
    method: 'post',
    data
  })
}

export function setSticky(data) {
  return request({
    url: '/news/set-sticky',
    method: 'post',
    data
  })
}

export function destroy(data) {
  return request({
    url: '/news/destroy',
    method: 'post',
    data
  })
}

export function getSectionList(data) {
  return request({
    url: '/news-section/index',
    method: 'get',
    params: data
  })
}

export function changeSectionStatus(data) {
  return request({
    url: '/news-section/change-status',
    method: 'post',
    data
  })
}

export function editSection(data) {
  return request({
    url: '/news-section/edit',
    method: 'post',
    data
  })
}

export function createSection(data) {
  return request({
    url: '/news-section/create',
    method: 'post',
    data
  })
}

export function getNewsSectionList(data) {
  return request({
    url: '/news-section-list/index',
    method: 'get',
    params: data
  })
}

export function addNewsToList(data) {
  return request({
    url: '/news-section-list/create',
    method: 'post',
    data
  })
}

export function changeSectionListStatus(data) {
  return request({
    url: '/news-section-list/change-status',
    method: 'post',
    data
  })
}

export function setSectionListSticky(data) {
  return request({
    url: '/news-section-list/set-sticky',
    method: 'post',
    data
  })
}
