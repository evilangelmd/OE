(function(win){
let storage = {
        get: function(key){
            if (!this.isSupported()) {
                return false;
            } else {
                try {
                    const _data = win.localStorage.getItem(key);
                    if (_data !== null) {
                        const _json = JSON.parse(_data);
                        return _json.json;
                    }
                } catch (e) {}
                return false;
            }
        },
        set: function(key, value){
            if (!this.isSupported()) {
                return false;
            } else {
                win.localStorage.setItem(key, JSON.stringify(
                    {
                        'json': value
                    }
                ));
                return true;
            }
        },
        remove: function(key) {
            if (!this.isSupported()) {
                return false;
            } else {
                win.localStorage.removeItem(key);
                return true;
            }
        },
        isSupported: function() {
            try {
                win.localStorage.setItem('test', '1');
                win.localStorage.removeItem('test');
                return true;
            } catch (e) {
                console.log('errore sulla storage');
                console.log(e);
                return false;
            }
        }
    };
  
   if(typeof OE !== 'object') {
        win.OE = {};
    }
    
    win.OE.storage = storage;
})(window)
