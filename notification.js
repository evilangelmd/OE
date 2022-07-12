(function(win){
    function requestNotificationsPermission() {
        Notification.requestPermission().then(function(result) {
            console.log('Permesso per le notifiche: ' + result);
        });
    }

    function notifyMe(title, text, icon) {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("Notifiche sono disattivati...");
        }

        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            createNotification(title, text, icon);
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied") {
            Notification.requestPermission(function(permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    createNotification(title, text, icon);
                }
            });
        }
    }

    function createNotification(title, text, icon) {
        let options = {
            body: text,
            icon: icon,
            requireInteraction: true
        };
        let notification = new Notification(title, options);
        notification.onclick = function() {
            window.focus();
        };
    }

    if(typeof OE !== 'object') {
        win.OE = {};
    }
    
    win.OE.notification = {
        send: notifyMe,
        request: requestNotificationsPermission
    };
    requestNotificationsPermission();
})(window);
