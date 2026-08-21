/**
 * ============================================
 * Google Analytics - Tracking Code
 * ফাইল: js/analytics.js
 * ============================================
 */

// ===== Google Analytics Tag =====
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());

// ===== গুগল অ্যানালিটিক্স আইডি =====
// তোমার নিজের Measurement ID বসাও
const GA_MEASUREMENT_ID = 'G-4ENS6VCHEF'; // ← এখানে তোমার আইডি বসাও

gtag('config', GA_MEASUREMENT_ID);

// ============================================================
// 1. পেজ ভিউ ট্র্যাক (Page View)
// ============================================================
function trackPageView(pageTitle, pagePath) {
    gtag('event', 'page_view', {
        page_title: pageTitle || document.title,
        page_location: pagePath || window.location.href,
        page_path: pagePath || window.location.pathname
    });
    console.log('📊 পেজ ভিউ ট্র্যাক:', pageTitle || document.title);
}

// ============================================================
// 2. ইভেন্ট ট্র্যাক (Event Tracking)
// ============================================================
function trackEvent(eventCategory, eventAction, eventLabel, eventValue) {
    gtag('event', eventAction, {
        event_category: eventCategory,
        event_label: eventLabel || '',
        value: eventValue || 0
    });
    console.log('📊 ইভেন্ট ট্র্যাক:', eventCategory, '→', eventAction);
}

// ============================================================
// 3. ক্লিক ট্র্যাক
// ============================================================
function trackClick(elementId, elementName) {
    trackEvent('ক্লিক', elementName || 'button_click', elementId);
}

// ============================================================
// 4. ফর্ম সাবমিট ট্র্যাক
// ============================================================
function trackFormSubmit(formName) {
    trackEvent('ফর্ম', 'সাবমিট', formName);
}

// ============================================================
// 5. কার্ট অ্যাকশন ট্র্যাক
// ============================================================
function trackCartAction(action, productName) {
    trackEvent('কার্ট', action, productName);
}

// ============================================================
// 6. অর্ডার ট্র্যাক
// ============================================================
function trackOrder(orderId, totalAmount) {
    gtag('event', 'purchase', {
        transaction_id: orderId,
        value: totalAmount,
        currency: 'BDT'
    });
    console.log('📊 অর্ডার ট্র্যাক:', orderId, '→', totalAmount, 'BDT');
}

// ============================================================
// 7. ইউজার আইডি ট্র্যাক (যদি লগইন করা থাকে)
// ============================================================
function setUserId(userId) {
    gtag('set', 'user_id', userId);
    console.log('👤 ইউজার আইডি সেট:', userId);
}

// ============================================================
// 8. কনসেন্ট্রেটেড (GDPR) - ইউজার কনসেন্ট
// ============================================================
function setConsent(analyticsConsent, adConsent) {
    gtag('consent', 'update', {
        'analytics_storage': analyticsConsent ? 'granted' : 'denied',
        'ad_storage': adConsent ? 'granted' : 'denied'
    });
}

// ============================================================
// 9. পেজ লোড হলে অটো ট্র্যাক
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // পেজ ভিউ ট্র্যাক
    trackPageView();
    
    // সমস্ত লিংক ক্লিক ট্র্যাক
    document.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            var linkText = this.textContent.trim() || this.getAttribute('href');
            trackClick(this.id || 'link', linkText);
        });
    });
    
    // সমস্ত বাটন ক্লিক ট্র্যাক
    document.querySelectorAll('button, .btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var btnText = this.textContent.trim() || this.id || 'button';
            trackClick(this.id || 'button', btnText);
        });
    });
    
    // ফর্ম সাবমিট ট্র্যাক
    document.querySelectorAll('form').forEach(function(form) {
        form.addEventListener('submit', function() {
            trackFormSubmit(this.id || 'form');
        });
    });
});

console.log('📊 Google Analytics সক্রিয়!');
console.log('📊 Measurement ID:', GA_MEASUREMENT_ID);