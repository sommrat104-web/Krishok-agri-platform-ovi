/**
 * ============================================
 * Firebase Messaging Service Worker
 * ফাইল: firebase-messaging-sw.js
 * ============================================
 */

// ===== Firebase SDK Import =====
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// ===== Firebase Config (তোমার নিজেরটা বসাও) =====
const firebaseConfig = {
  apiKey: "AIzaSyDdLpJXpXpXpXpXpXpXpXpXpXpXpXpXpXpXpXo",
  authDomain: "krisok-app.firebaseapp.com",
  projectId: "krisok-app",
  storageBucket: "krisok-app.firebasestorage.app",
  messagingSenderId: "49087555147",
  appId: "1:49087555147:web:abcdef123456"
};

// ===== Firebase Initialize =====
firebase.initializeApp(firebaseConfig);

// ===== Messaging =====
const messaging = firebase.messaging();

// ===== Background Message =====
messaging.onBackgroundMessage(function(payload) {
  console.log('📨 [sw.js] ব্যাকগ্রাউন্ড মেসেজ পেয়েছি:', payload);

  const notificationTitle = payload.notification?.title || 'কৃষি সহায়তা';
  const notificationOptions = {
    body: payload.notification?.body || 'নতুন আপডেট এসেছে!',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: payload.data?.url || '/'
    }
  };

  // Notification দেখানো
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ===== Notification Click =====
self.addEventListener('notificationclick', function(event) {
  console.log('📨 [sw.js] Notification এ ক্লিক করা হয়েছে');
  event.notification.close();

  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.openWindow(url)
  );
});

console.log('✅ [sw.js] Service Worker লোড হয়েছে!');
