<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js"></script>
<script>
    // const notifContainer = document.getElementById('notif-container');

    // TODO: Replace firebaseConfig you get from Firebase Console
    const firebaseConfig = {
        apiKey: {{ Js::from(env('FCM_API_KEY')) }},
        databaseURL: {{ Js::from(env('FCM_DATABASE_URL')) }},
        authDomain: {{ Js::from(env('FCM_AUTH_DOMAIN')) }},
        projectId: {{ Js::from(env('FCM_PROJECT_ID')) }},
        storageBucket: {{ Js::from(env('FCM_STORAGE_BUCKET')) }},
        messagingSenderId: {{ Js::from(env('FCM_MESSAGING_SENDER_ID')) }},
        appId: {{ Js::from(env('FCM_APP_ID')) }},
    };
    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();
    messaging
        .requestPermission()
        .then(function() {
            console.log('Notification permission granted.');

            // get the token in the form of promise
            return messaging.getToken();
        })
        .then(function(token) {
            console.log(token);
        })
        .catch(function(err) {
            console.log('Unable to get permission to notify.', err);
        });

    // enable popup when focused    
    const enableForegroundNotification = false;
    messaging.onMessage(function(payload) {
        console.log('Message received. ', payload);

        // const divBottomPx = notifContainer.children.length === 0 ? "20px" : (20 + (notifContainer.children
        //     .length * 87)) + "px";

        // const div = document.createElement('div');
        // div.className = "col-10 col-xs-11 col-sm-4 alert alert-primary alert-dismissible fade show";
        // div.setAttribute("data-notify", "container");
        // div.setAttribute("role", "alert");
        // div.setAttribute("data-notify-position", "bottom-right");
        // div.style.display = "inline-block";
        // div.style.margin = "0px auto";
        // div.style.paddingLeft = "65px";
        // div.style.position = "fixed";
        // div.style.transition = "all 0.5s ease-in-out 0s";
        // div.style.zIndex = "1031";
        // div.style.bottom = divBottomPx;
        // div.style.right = "20px";

        // const button = document.createElement("button");
        // button.innerText = "x";
        // button.ariaHidden = "true";
        // button.className = "close";
        // button.setAttribute("data-dismiss", "alert");
        // button.setAttribute("data-notify", "dismiss");
        // button.style.position = "absolute";
        // button.style.right = "10px";
        // button.style.top = "5px";
        // button.style.zIndex = "1033";

        // const spanIcon = document.createElement("span");
        // spanIcon.setAttribute("data-notify", "icon");
        // spanIcon.className = "fa fa-bell";

        // const spanTitle = document.createElement("span");
        // spanTitle.innerText = payload.notification.title;
        // spanTitle.setAttribute("data-notify", "title");

        // const spanMessage = document.createElement("span");
        // spanMessage.innerText = payload.notification.body;
        // spanMessage.setAttribute("data-notify", "message");

        // const a = document.createElement("a");
        // a.href = "www.google.com";
        // a.setAttribute("data-notify", "url");
        // a.style.backgroundImage =
        //     "url(&quot;data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7&quot;)";
        // a.style.height = "100%";
        // a.style.left = "0px";
        // a.style.position = "absolute";
        // a.style.top = "0px";
        // a.style.width = "100%";
        // a.style.zIndex = "1032";

        // div.append(button, spanIcon, spanTitle, spanMessage, a);
        // notifContainer.append(div);

        const content = {
            icon: "fa fa-bell",
            url: "www.google.com",
            target: "_blank",
            message: payload.notification.body,
            title: payload.notification.title,
        };

        const placementFrom = "bottom";
        const placementAlign = "right"
        const state = "info";


        $.notify(content, {
            type: state,
            placement: {
                from: placementFrom,
                align: placementAlign
            },
            time: 1000,
            delay: 0,
        });

        if (enableForegroundNotification) {
            const notification = payload.notification;
            navigator.serviceWorker
                .getRegistrations()
                .then((registration) => {
                    registration[0].showNotification(notification.title);
                });
        }
    });
</script>
