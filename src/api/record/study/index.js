import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/record/study/page',
    method: 'get',
    params: query
  });
}
export function listAll() {
  return fetch({
    url: '/api/record/study/all',
    method: 'get',
  });
}


export function addObj(obj) {
  return fetch({
    url: '/api/record/study',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/record/study/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/record/study/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/record/study/' + id,
    method: 'put',
    data: obj
  })
}
