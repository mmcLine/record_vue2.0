import fetch from 'utils/fetch';

export function getAllGroupTypes() {
  return fetch({
    url: '/api/admin/groupType/all',
    method: 'get'
  });
}

export function fetchTree(query) {
  return fetch({
    url: '/api/admin/role/tree',
    method: 'get',
    params: query
  });
}


export function addObj(obj) {
  return fetch({
    url: '/api/admin/role',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/role/' + id,
    method: 'get'
  });
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/role/' + id,
    method: 'delete'
  });
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/role/' + id,
    method: 'put',
    data: obj
  });
}

export function getUsers(id) {
  return fetch({
    url: '/api/admin/role/' + id + '/user',
    method: 'get'
  });
}

export function modifyUsers(id, data) {
  return fetch({
    url: '/api/admin/role/' + id + '/user',
    method: 'put',
    params: data
  });
}


export function removeElementAuthority(id, data) {
  return fetch({
    url: '/api/admin/role/' + id + '/authority/element/remove',
    method: 'put',
    params: data
  });
}

export function addElementAuthority(id, data) {
  return fetch({
    url: '/api/admin/role/' + id + '/authority/element/add',
    method: 'put',
    params: data
  });
}

export function getElementAuthority(id) {
  return fetch({
    url: '/api/admin/role/' + id + '/authority/element',
    method: 'get'
  });
}

export function modifyMenuAuthority(id, data) {
  return fetch({
    url: '/api/admin/role/' + id + '/authority/menu',
    method: 'put',
    params: data
  });
}


export function getMenuAuthority(id) {
  return fetch({
    url: '/api/admin/role/' + id + '/authority/menu',
    method: 'get'
  });
}


