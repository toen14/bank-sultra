importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyAww9tKPn-_b6w_ApX1mlMsLIpe1MrG-I4",
    databaseURL: 'https://push-76877.firebaseio.com',
    authDomain: "push-76877.firebaseapp.com",
    projectId: "push-76877",
    storageBucket: "push-76877.appspot.com",
    messagingSenderId: "723470492555",
    appId: "1:723470492555:web:be72570aa5f91a7eb9458e",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
const messaging = firebase.messaging();

console.log('nice')

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: 'Simple piece of body text.\nSecond line of body text :)',
        // icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        // notificationTitle,
        // notificationOptions,
    );
});


self.addEventListener('notificationclick', (event) => {
    console.log('On notification click: ', event);
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: "window"
    }).then((clientList) => {
        for (const client of clientList) {
            if (client.url === '/' && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow('/');
    }));
});


