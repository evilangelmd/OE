(function(win){
        async function checkAnnouncement(announce) {
        function send(announce, resolve, reject, tries = 1) {
            let formdata = new URLSearchParams();
            formdata.append('url', announce.link);
            formdata.append('type', announce.type);
            formdata.append('price', announce.price);

            win.OE.http.post(OE.urls.check, formdata.toString(), 'json', function(responseDetails){
                announce.cs = responseDetails.response;
                resolve(announce);
            }, function(){
                if(tries === 5) {
                    reject(false);
                }

                send(announce, resolve, reject, tries++);
            });
        }

        return new Promise(function (resolve, reject) {
            setTimeout(()=>{
                console.log('checking announce: ' + announce.link);
                send(announce, resolve, reject, 1);
            }, 100);
        });
    }

async function sendDataToReos(url, announce, resolve, reject){
        function send(announce, resolve, reject, tries = 1){
            let formdata = new URLSearchParams();
            formdata.append('url', announce.link);
            formdata.append('announce', JSON.stringify({'announce': announce}));

            win.OE.http.post(OE.urls.send, formdata.toString(), 'json', function(responseDetails){
                resolve(true);
            }, function(){
                if(tries === 5) {
                    reject(false);
                }
                send(announce, resolve, reject, tries++);
            });
        }


        return new Promise(function (resolve, reject) {
            setTimeout(()=>{
                console.log('sending data announce: ' + announce.link);
                send(announce, resolve, reject, 1);
            }, 100);
        });
    }
        
        
  if(typeof OE !== 'object') {
        win.OE = {};
    }
        
    win.OE.common = {
        check: checkAnnouncement,
        send: sendDataToReos
    };
})(unsafeWindow);
