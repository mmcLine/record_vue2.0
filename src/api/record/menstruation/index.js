import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/record/menstruation/page',
    method: 'get',
    params: query
  });
}
export function listAll() {
  return fetch({
    url: '/api/record/menstruation/all',
    method: 'get',
  });
}


export function addObj(obj) {
  return fetch({
    url: '/api/record/menstruation',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/record/menstruation/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/record/menstruation/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/record/menstruation/' + id,
    method: 'put',
    data: obj
  })
}
