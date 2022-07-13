(function(win){
  
  function get(url, type, callback, onerror) {
    GM_xmlhttpRequest ( {
                method:       'GET',
                responseType: type,
                url:          url,
                onload: callback,
                onerror: onerror
            });
  }
  
  function post(url, postdata, type, callback, onerror){
    GM_xmlhttpRequest ( {
                method:     'POST',
                data:         postdata,
                responseType: type,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                url:        url,
                onload:    callback,
                onerror: onerror
            });
  }
    
  if(typeof OE !== 'object') {
        win.OE = {};
    }
    
    win.OE.http = {
        get: get,
        post: post
    };
})(unsafeWindow);
