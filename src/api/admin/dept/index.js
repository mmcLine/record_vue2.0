import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/admin/dept/page',
    method: 'get',
    params: query
  });
}
export function listAll() {
  return fetch({
    url: '/api/admin/dept/all',
    method: 'get',
  });
}


export function addObj(obj) {
  return fetch({
    url: '/api/admin/dept',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/dept/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/dept/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/dept/' + id,
    method: 'put',
    data: obj
  })
}
