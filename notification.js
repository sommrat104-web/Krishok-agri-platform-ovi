/**
 * ============================================
 * Push Notification - Frontend
 * ফাইল: js/notification.js
 * ============================================
 */

(function() {
  'use strict';

  // ===== VAPID Key (তোমার নিজেরটা বসাও) =====
  const VAPID_KEY = 'BCLvraTGuNvr-8gRl6rz8hBtHg1foV4YyW9j8P7c48E6rgwm0Ehh8v0LMMH5bLz05IakBBOQOBOm0rcvSQNdAsU';

  // ===== DOM Ready =====
  document.addEventListener('DOMContentLoaded', function() {
    console.log('🔔 Notification সিস্টেম শুরু হচ্ছে...');

    // Firebase রেডি হওয়া পর্যন্ত অপেক্ষা
    if (typeof firebase !== 'undefined') {
      initNotification();
    } else {
      console.warn('⏳ Firebase লোড হয়নি, অপেক্ষা করছে...');
      setTimeout(function() {
        if (typeof firebase !== 'undefined') {
          initNotification();
        } else {
          console.error('❌ Firebase লোড হয়নি!');
        }
      }, 3000);
    }
  });

  // ===== Init =====
  function initNotification() {
    console.log('✅ Firebase পাওয়া গেছে!');

    // Permission চাও
    requestPermission();

    // Foreground Message সেটআপ
    setupForegroundMessage();
  }

  // ===== ১. Permission চাওয়া =====
  function requestPermission() {
    if (!('Notification' in window)) {
      console.log('ℹ️ এই ব্রাউজার Notification সাপোর্ট করে না');
      return;
    }

    if (Notification.permission === 'granted') {
      console.log('✅ Notification Permission ইতিমধ্যে আছে');
      getFCMToken();
      return;
    }

    if (Notification.permission === 'denied') {
      console.log('❌ Notification Permission ডিনাই করা হয়েছে');
      return;
    }

    // Permission চাও
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        console.log('✅ Notification Permission দেওয়া হয়েছে!');
        getFCMToken();
      } else {
        console.log('❌ Notification Permission দেওয়া হয়নি');
      }
    });
  }

  // ===== ২. FCM Token পাওয়া =====
  function getFCMToken() {
    console.log('🔑 FCM Token নেওয়া হচ্ছে...');

    if (typeof firebase === 'undefined') {
      console.error('❌ Firebase পাওয়া যায়নি!');
      return;
    }

    const messaging = firebase.messaging();

    // Service Worker রেজিস্টার
    navigator.serviceWorker.register('firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('✅ Service Worker রেজিস্টার হয়েছে');
        return messaging.getToken({
          serviceWorkerRegistration: registration,
          vapidKey: VAPID_KEY
        });
      })
      .then(function(token) {
        if (token) {
          console.log('✅ FCM Token:', token);
          localStorage.setItem('fcmToken', token);
          // Token সেভ করো (ঐচ্ছিক)
          saveTokenToServer(token);
        } else {
          console.log('❌ FCM Token পাওয়া যায়নি');
        }
      })
      .catch(function(error) {
        console.error('❌ Token পেতে সমস্যা:', error);
      });
  }

  // ===== ৩. Token Server-এ সেভ (ঐচ্ছিক) =====
  function saveTokenToServer(token) {
    if (window.database) {
      window.database.ref('fcmTokens/' + token).set({
        token: token,
        timestamp: Date.now()
      });
      console.log('💾 Token সেভ করা হয়েছে');
    }
  }

  // ===== ৪. Foreground Message =====
  function setupForegroundMessage() {
    if (typeof firebase === 'undefined') return;

    const messaging = firebase.messaging();

    messaging.onMessage(function(payload) {
      console.log('📨 ফোরগ্রাউন্ড মেসেজ পেয়েছি:', payload);

      const title = payload.notification?.title || 'কৃষি সহায়তা';
      const body = payload.notification?.body || 'নতুন আপডেট!';

      // Toast দেখাও
      showToast('🔔 ' + title + ': ' + body, 'success');
    });
  }

  // ===== ৫. Toast Function =====
  function showToast(msg, type) {
    const toast = document.getElementById('toast');
    if (!toast) {
      console.log('📢', msg);
      return;
    }
    type = type || 'success';
    toast.textContent = msg;
    toast.className = 'toast show ' + type;
    setTimeout(function() {
      toast.classList.remove('show');
    }, 4000);
  }

  // ===== ৬. কনসোল লগ =====
  console.log('✅ notification.js লোড হয়েছে!');

})();