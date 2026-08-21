/**
 * ============================================
 * SEO - JSON-LD Structured Data
 * ফাইল: js/seo.js
 * ============================================
 */

(function() {
    'use strict';

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "কৃষি সহায়তা",
        "url": "https://your-username.github.io/krisok-agri-platform/",
        "description": "কৃষকদের জন্য ডিজিটাল প্ল্যাটফর্ম। ফসলের তথ্য, বাজারদর, যন্ত্রপাতি, ই-কমার্স।",
        "author": {
            "@type": "Organization",
            "name": "কৃষি সহায়তা টিম"
        }
    });
    document.head.appendChild(script);

    console.log('🔍 SEO JSON-LD যোগ করা হয়েছে!');

})();