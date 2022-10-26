<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js"></script>
<script>
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
            if ({{ Js::from(session()->has('token')) }} && Notification.permission !== 'denied') {

                fetch({{ Js::from(route('push-web')) }}, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + {{ Js::from(Session::get('token')) }}
                        },
                        body: JSON.stringify({
                            token: token
                        }),
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .then((data) => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        })
        .catch(function(err) {
            console.log('err', err);
            const content = {
                icon: "far fa-bell-slash",
                target: "_blank",
                title: 'Peringatan!',
                message: 'Tolong berikan izin untuk mendapatkan notifikasi',
            };

            const placementFrom = "bottom";
            const placementAlign = "right"
            const state = "danger";

            $.notify(content, {
                type: state,
                placement: {
                    from: placementFrom,
                    align: placementAlign
                },
                time: 1000,
                delay: 0,
            });
        });
    // }

    // enable popup when focused    
    const enableForegroundNotification = false;
    messaging.onMessage(function(payload) {
        console.log('Message received. ', payload);

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
