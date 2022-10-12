importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyBXzIHhTm_i7LNl9XW1BrFy8irVa1SskpI",
    databaseURL: 'https://sisfo-e-mitra-bank-sultra.firebaseio.com',
    authDomain: "sisfo-e-mitra-bank-sultra.firebaseapp.com",
    projectId: "sisfo-e-mitra-bank-sultra",
    storageBucket: "sisfo-e-mitra-bank-sultra.appspot.com",
    messagingSenderId: "245247663013",
    appId: "1:245247663013:web:34d2c2d4548e9a3783a64c",
    measurementId: "G-512B7QQDCZ"
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


