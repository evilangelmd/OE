(function(win) {

  const defaultHeaders = {
    'User-Agent': navigator.userAgent,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': navigator.languages?.join(',') || navigator.language,
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': location.href,
    'Origin': location.origin,
    'Connection': 'keep-alive',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'Sec-CH-UA': navigator.userAgentData?.brands?.map(b => `"${b.brand}";v="${b.version}"`).join(', ') || '',
    'Sec-CH-UA-Mobile': navigator.userAgentData?.mobile ? '?1' : '?0',
    'Sec-CH-UA-Platform': `"${navigator.userAgentData?.platform || navigator.platform}"`
  };

  function get(url, type, callback, onerror) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: url,
      responseType: type,
      anonymous: false,
      withCredentials: true,
      headers: { ...defaultHeaders },
      onload: callback,
      onerror: onerror
    });
  }

  function post(url, postdata, type, callback, onerror) {
    GM_xmlhttpRequest({
      method: 'POST',
      url: url,
      data: postdata,
      responseType: type,
      anonymous: false,
      withCredentials: true,
      headers: {
        ...defaultHeaders,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      onload: callback,
      onerror: onerror
    });
  }

  if (typeof OE !== 'object') {
    win.OE = {};
  }

  win.OE.http = {
    get: get,
    post: post
  };

})(unsafeWindow);
