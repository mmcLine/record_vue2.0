import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/record/order/page',
    method: 'get',
    params: query
  });
}
export function listAll() {
  return fetch({
    url: '/api/record/order/all',
    method: 'get',
  });
}


export function addObj(obj) {
  return fetch({
    url: '/api/record/order',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/record/order/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/record/order/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/record/order/' + id,
    method: 'put',
    data: obj
  })
}

export function getMonthReport(){
  return fetch({
    url:'/api/record/order/monthReport',
    method:'post'
  })
}
