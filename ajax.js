function ajax(options) {
  let method = options.method || 'GET',
      params = options.params,
      data   = options.data,
      url    = options.url + (params ? '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&') : ''),
      async  = options.async === false ? false : true,
      success = options.success,
      headers = options.headers;

  let xhr;
  // 创建xhr对象
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      success && success(xhr.responseText);
    }
  }

  xhr.open(method, url, async);
  
  if(headers) {
    Object.keys(Headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
  }

  method === 'GET' ? xhr.send() : xhr.send(data)
}

ajax({
  method: 'GET',
  url: 'https://www.baidu.com',
  success: function(res) {
    console.log('success', res);
  },
  async: true,
  params: {
    p: 'test',
    t: 666
  },
  headers: {
    'Content-Type': 'application/json'
  }
})