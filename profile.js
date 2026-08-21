/**
 * ============================================
 * প্রোফাইল পেজ - JavaScript (সম্পূর্ণ ডাটা)
 * ফাইল: js/profile.js
 * ============================================
 */

(function() {
    'use strict';

    // ============================================================
    // 1. সম্পূর্ণ লোকেশন ডাটাবেস (বিভাগ → জেলা)
    // ============================================================
    var locationData = {
        'ঢাকা': {
            districts: [
                'ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'টাঙ্গাইল', 'কিশোরগঞ্জ',
                'মানিকগঞ্জ', 'মুন্সীগঞ্জ', 'নরসিংদী', 'ফরিদপুর', 'গোপালগঞ্জ',
                'মাদারীপুর', 'রাজবাড়ী', 'শরীয়তপুর'
            ]
        },
        'চট্টগ্রাম': {
            districts: [
                'চট্টগ্রাম', 'কক্সবাজার', 'বান্দরবান', 'ব্রাহ্মণবাড়িয়া', 'কুমিল্লা',
                'খাগড়াছড়ি', 'ফেনী', 'লক্ষ্মীপুর', 'নোয়াখালী', 'রাঙামাটি', 'চাঁদপুর'
            ]
        },
        'রাজশাহী': {
            districts: [
                'রাজশাহী', 'বগুড়া', 'চাঁপাইনবাবগঞ্জ', 'জয়পুরহাট', 'নওগাঁ',
                'নাটোর', 'পাবনা', 'সিরাজগঞ্জ'
            ]
        },
        'খুলনা': {
            districts: [
                'খুলনা', 'বাগেরহাট', 'চুয়াডাঙ্গা', 'যশোর', 'ঝিনাইদহ',
                'কুষ্টিয়া', 'মাগুরা', 'মেহেরপুর', 'নড়াইল', 'সাতক্ষীরা'
            ]
        },
        'বরিশাল': {
            districts: [
                'বরিশাল', 'বরগুনা', 'ভোলা', 'ঝালকাঠি', 'পটুয়াখালী', 'পিরোজপুর'
            ]
        },
        'সিলেট': {
            districts: [
                'সিলেট', 'হবিগঞ্জ', 'মৌলভীবাজার', 'সুনামগঞ্জ'
            ]
        },
        'রংপুর': {
            districts: [
                'রংপুর', 'দিনাজপুর', 'গাইবান্ধা', 'কুড়িগ্রাম', 'লালমনিরহাট',
                'নীলফামারী', 'পঞ্চগড়', 'ঠাকুরগাঁও'
            ]
        },
        'ময়মনসিংহ': {
            districts: [
                'ময়মনসিংহ', 'জামালপুর', 'নেত্রকোণা', 'শেরপুর'
            ]
        }
    };

    // ============================================================
    // 2. জেলা → উপজেলা ডাটাবেস
    // ============================================================
var upazilaData = {
    // ===== ঢাকা বিভাগ =====
    'ঢাকা': ['ধানমন্ডি', 'তেজগাঁও', 'মিরপুর', 'মোহাম্মদপুর', 'গুলশান', 'বনানী', 'উত্তরা', 'পল্লবী', 'সাভার'],
    'গাজীপুর': ['গাজীপুর সদর', 'কালিয়াকৈর', 'শ্রীপুর', 'কাপাসিয়া', 'কালীগঞ্জ'],
    'নারায়ণগঞ্জ': ['নারায়ণগঞ্জ সদর', 'বন্দর', 'আড়াইহাজার', 'রূপগঞ্জ', 'সোনারগাঁও'],
    'টাঙ্গাইল': ['টাঙ্গাইল সদর', 'বাসাইল', 'ভূঞাপুর', 'দেলদুয়ার', 'ধনবাড়ী', 'ঘাটাইল', 'গোপালপুর', 'কালিহাতী', 'মধুপুর', 'মির্জাপুর', 'নাগরপুর', 'সখীপুর'],
    'কিশোরগঞ্জ': ['কিশোরগঞ্জ সদর', 'হোসেনপুর', 'পাকুন্দিয়া', 'কটিয়াদী', 'করিমগঞ্জ', 'তাড়াইল', 'নিকলী', 'বাজিতপুর', 'ইটনা', 'মিঠামইন', 'অষ্টগ্রাম', 'ভৈরব', 'কুলিয়ারচর'],
    'মানিকগঞ্জ': ['মানিকগঞ্জ সদর', 'সিঙ্গাইর', 'সাটুরিয়া', 'ঘিওর', 'হরিরামপুর', 'দৌলতপুর', 'শিবালয়'],
    'মুন্সীগঞ্জ': ['মুন্সীগঞ্জ সদর', 'শ্রীনগর', 'সিরাজদিখান', 'লৌহজং', 'টংগিবাড়ী', 'গজারিয়া'],
    'নরসিংদী': ['নরসিংদী সদর', 'পলাশ', 'শিবপুর', 'মনোহরদী', 'বেলাব', 'রায়পুরা'],
    'ফরিদপুর': ['ফরিদপুর সদর', 'বোয়ালমারী', 'ভাঙ্গা', 'মধুখালী', 'আলফাডাঙ্গা', 'সদরপুর', 'নগরকান্দা', 'চরভদ্রাসন', 'সালথা'],
    'গোপালগঞ্জ': ['গোপালগঞ্জ সদর', 'টুঙ্গিপাড়া', 'কোটালীপাড়া', 'কাশিয়ানী', 'মুকসুদপুর'],
    'মাদারীপুর': ['মাদারীপুর সদর', 'কালকিনি', 'রাজৈর', 'শিবচর', 'ডাসার'],
    'রাজবাড়ী': ['রাজবাড়ী সদর', 'গোয়ালন্দ', 'পাংশা', 'বালিয়াকান্দি', 'কালুখালী'],
    'শরীয়তপুর': ['শরীয়তপুর সদর', 'জাজিরা', 'নড়িয়া', 'ভেদরগঞ্জ', 'ডামুড্যা', 'গোসাইরহাট'],
    
    // ===== চট্টগ্রাম বিভাগ =====
    'চট্টগ্রাম': ['আনোয়ারা', 'বাঁশখালী', 'বোয়ালখালী', 'চন্দনাইশ', 'ফটিকছড়ি', 'হাটহাজারী', 'কর্ণফুলী', 'লোহাগাড়া', 'মীরসরাই', 'পটিয়া', 'রাঙ্গুনিয়া', 'রাউজান', 'সন্দ্বীপ', 'সাতকানিয়া', 'সীতাকুণ্ড'],
    'কক্সবাজার': ['কক্সবাজার সদর', 'চকরিয়া', 'মহেশখালী', 'কুতুবদিয়া', 'রামু', 'টেকনাফ', 'উখিয়া', 'পেকুয়া', 'ঈদগাঁও'],
    'বান্দরবান': ['বান্দরবান সদর', 'লামা', 'আলীকদম', 'নাইক্ষ্যংছড়ি', 'রুমা', 'রোয়াংছড়ি', 'থানচি'],
    'ব্রাহ্মণবাড়িয়া': ['ব্রাহ্মণবাড়িয়া সদর', 'আখাউড়া', 'আশুগঞ্জ', 'কসবা', 'নবীনগর', 'নাসিরনগর', 'বাঞ্ছারামপুর', 'বিজয়নগর', 'সরাইল'],
    'কুমিল্লা': ['কুমিল্লা আদর্শ সদর', 'কুমিল্লা সদর দক্ষিণ', 'বরুড়া', 'ব্রাহ্মণপাড়া', 'বুড়িচং', 'চান্দিনা', 'চৌদ্দগ্রাম', 'দাউদকান্দি', 'দেবিদ্বার', 'হোমনা', 'লাকসাম', 'লালমাই', 'মেঘনা', 'মনোহরগঞ্জ', 'মুরাদনগর', 'নাঙ্গলকোট', 'তিতাস'],
    'খাগড়াছড়ি': ['খাগড়াছড়ি সদর', 'দীঘিনালা', 'মহালছড়ি', 'পানছড়ি', 'মাটিরাঙ্গা', 'মানিকছড়ি', 'লক্ষ্মীছড়ি', 'রামগড়', 'গুইমারা'],
    'ফেনী': ['ফেনী সদর', 'দাগনভূঞা', 'সোনাগাজী', 'ছাগলনাইয়া', 'পরশুরাম', 'ফুলগাজী'],
    'লক্ষ্মীপুর': ['লক্ষ্মীপুর সদর', 'রায়পুর', 'রামগঞ্জ', 'রামগতি', 'কমলনগর'],
    'নোয়াখালী': ['নোয়াখালী সদর', 'বেগমগঞ্জ', 'সেনবাগ', 'সোনাইমুড়ি', 'চাটখিল', 'কোম্পানীগঞ্জ', 'কবিরহাট', 'সুবর্ণচর', 'হাতিয়া'],
    'রাঙামাটি': ['রাঙামাটি সদর', 'বাঘাইছড়ি', 'কাপ্তাই', 'কাউখালী', 'বরকল', 'বিলাইছড়ি', 'জুরাছড়ি', 'লংগদু', 'নানিয়ারচর', 'রাজস্থলী'],
    'চাঁদপুর': ['চাঁদপুর সদর', 'হাজীগঞ্জ', 'ফরিদগঞ্জ', 'মতলব দক্ষিণ', 'মতলব উত্তর', 'কচুয়া', 'হাইমচর', 'শাহরাস্তি'],
    
    // ===== রাজশাহী বিভাগ =====
    'রাজশাহী': ['পবা', 'গোদাগাড়ী', 'তানোর', 'মোহনপুর', 'বাগমারা', 'দুর্গাপুর', 'পুঠিয়া', 'চারঘাট', 'বাঘা'],
    'বগুড়া': ['বগুড়া সদর', 'আদমদীঘি', 'শেরপুর', 'ধুনট', 'নন্দীগ্রাম', 'শাজাহানপুর', 'দুপচাঁচিয়া', 'গাবতলী', 'কাহালু', 'সারিয়াকান্দি', 'সোনাতলা', 'শিবগঞ্জ'],
    'চাঁপাইনবাবগঞ্জ': ['চাঁপাইনবাবগঞ্জ সদর', 'শিবগঞ্জ', 'নাচোল', 'গোমস্তাপুর', 'ভোলাহাট'],
    'জয়পুরহাট': ['জয়পুরহাট সদর', 'পাঁচবিবি', 'কালাই', 'ক্ষেতলাল', 'আক্কেলপুর'],
    'নওগাঁ': ['নওগাঁ সদর', 'রানীনগর', 'আত্রাই', 'বদলগাছী', 'মহাদেবপুর', 'মান্দা', 'পত্নীতলা', 'ধামইরহাট', 'নিয়ামতপুর', 'পোরশা', 'সাপাহার'],
    'নাটোর': ['নাটোর সদর', 'সিংড়া', 'বড়াইগ্রাম', 'বাগাতিপাড়া', 'লালপুর', 'গুরুদাসপুর', 'নলডাঙ্গা'],
    'পাবনা': ['পাবনা সদর', 'ঈশ্বরদী', 'আটঘরিয়া', 'বেড়া', 'চাটমোহর', 'ফরিদপুর', 'ভাঙ্গুড়া', 'সাঁথিয়া', 'সুজানগর'],
    'সিরাজগঞ্জ': ['সিরাজগঞ্জ সদর', 'কাজিপুর', 'কামারখন্দ', 'বেলকুচি', 'চৌহালি', 'রায়গঞ্জ', 'শাহজাদপুর', 'তাড়াশ', 'উল্লাপাড়া'],
    
    // ===== খুলনা বিভাগ =====
    'খুলনা': ['কয়রা', 'ডুমুরিয়া', 'তেরখাদা', 'দাকোপ', 'দিঘলিয়া', 'পাইকগাছা', 'ফুলতলা', 'বটিয়াঘাটা', 'রূপসা'],
    'বাগেরহাট': ['বাগেরহাট সদর', 'ফকিরহাট', 'মোল্লাহাট', 'কচুয়া', 'চিতলমারী', 'রামপাল', 'মোংলা', 'মোড়েলগঞ্জ', 'শরণখোলা'],
    'চুয়াডাঙ্গা': ['চুয়াডাঙ্গা সদর', 'আলমডাঙ্গা', 'দামুড়হুদা', 'জীবননগর'],
    'যশোর': ['যশোর সদর', 'শার্শা', 'মনিরামপুর', 'কেশবপুর', 'ঝিকরগাছা', 'চৌগাছা', 'অভয়নগর', 'বাঘারপাড়া'],
    'ঝিনাইদহ': ['ঝিনাইদহ সদর', 'শৈলকুপা', 'কালীগঞ্জ', 'কোটচাঁদপুর', 'মহেশপুর', 'হরিণাকুণ্ডু'],
    'কুষ্টিয়া': ['কুষ্টিয়া সদর', 'কুমারখালী', 'খোকসা', 'মিরপুর', 'ভেড়ামারা', 'দৌলতপুর'],
    'মাগুরা': ['মাগুরা সদর', 'মহম্মদপুর', 'শালিখা', 'শ্রীপুর'],
    'মেহেরপুর': ['মেহেরপুর সদর', 'গাংনী', 'মুজিবনগর'],
    'নড়াইল': ['নড়াইল সদর', 'লোহাগড়া', 'কালিয়া'],
    'সাতক্ষীরা': ['সাতক্ষীরা সদর', 'কলারোয়া', 'তালা', 'দেবহাটা', 'আশাশুনি', 'কালিগঞ্জ', 'শ্যামনগর'],
    
    // ===== বরিশাল বিভাগ =====
    'বরিশাল': ['বরিশাল সদর', 'বাকেরগঞ্জ', 'বাবুগঞ্জ', 'আগৈলঝাড়া', 'উজিরপুর', 'হিজলা', 'মেহেন্দিগঞ্জ', 'মুলাদী', 'বানারীপাড়া', 'গৌরনদী'],
    'বরগুনা': ['বরগুনা সদর', 'আমতলী', 'বামনা', 'পাথরঘাটা', 'তালতলী', 'বেতাগী'],
    'ভোলা': ['ভোলা সদর', 'দৌলতখান', 'বোরহানউদ্দিন', 'লালমোহন', 'তজুমদ্দিন', 'চরফ্যাশন', 'মনপুরা'],
    'ঝালকাঠি': ['ঝালকাঠি সদর', 'নলছিটি', 'রাজাপুর', 'কাঁঠালিয়া'],
    'পটুয়াখালী': ['পটুয়াখালী সদর', 'কলাপাড়া', 'মির্জাগঞ্জ', 'দুমকি', 'গলাচিপা', 'দশমিনা', 'বাউফল', 'রাঙ্গাবালী'],
    'পিরোজপুর': ['পিরোজপুর সদর', 'ভাণ্ডারিয়া', 'মঠবাড়িয়া', 'কাউখালী', 'নাজিরপুর', 'নেছারাবাদ', 'ইন্দুরকানী'],
    
    // ===== সিলেট বিভাগ =====
    'সিলেট': ['সিলেট সদর', 'দক্ষিণ সুরমা', 'বিশ্বনাথ', 'বালাগঞ্জ', 'গোলাপগঞ্জ', 'ফেঞ্চুগঞ্জ', 'বিয়ানীবাজার', 'জকিগঞ্জ', 'কানাইঘাট', 'জৈন্তাপুর', 'গোয়াইনঘাট', 'কোম্পানীগঞ্জ', 'ওসমানীনগর'],
    'হবিগঞ্জ': ['হবিগঞ্জ সদর', 'শায়েস্তাগঞ্জ', 'বানিয়াচং', 'আজমিরীগঞ্জ', 'লাখাই', 'চুনারুঘাট', 'মাধবপুর', 'বাহুবল', 'নবীগঞ্জ'],
    'মৌলভীবাজার': ['মৌলভীবাজার সদর', 'রাজনগর', 'শ্রীমঙ্গল', 'কমলগঞ্জ', 'কুলাউড়া', 'জুড়ী', 'বড়লেখা'],
    'সুনামগঞ্জ': ['সুনামগঞ্জ সদর', 'শান্তিগঞ্জ', 'জগন্নাথপুর', 'ছাতক', 'দোয়ারাবাজার', 'বিশ্বম্ভরপুর', 'তাহিরপুর', 'ধর্মপাশা', 'জামালগঞ্জ', 'দিরাই', 'শাল্লা', 'মধ্যনগর'],
    
    // ===== রংপুর বিভাগ =====
    'রংপুর': ['রংপুর সদর', 'গংগাচড়া', 'তারাগঞ্জ', 'বদরগঞ্জ', 'কাউনিয়া', 'পীরগাছা', 'মিঠাপুকুর', 'পীরগঞ্জ'],
    'দিনাজপুর': ['দিনাজপুর সদর', 'বীরগঞ্জ', 'বোচাগঞ্জ', 'কাহারোল', 'খানসামা', 'বিরল', 'বিরামপুর', 'ফুলবাড়ী', 'চিরিরবন্দর', 'পার্বতীপুর', 'নবাবগঞ্জ', 'ঘোড়াঘাট', 'হাকিমপুর'],
    'গাইবান্ধা': ['গাইবান্ধা সদর', 'গোবিন্দগঞ্জ', 'সাদুল্লাপুর', 'পলাশবাড়ী', 'সুন্দরগঞ্জ', 'ফুলছড়ি', 'সাঘাটা'],
    'কুড়িগ্রাম': ['কুড়িগ্রাম সদর', 'নাগেশ্বরী', 'ভুরুঙ্গামারী', 'ফুলবাড়ী', 'রাজারহাট', 'উলিপুর', 'চিলমারী', 'রৌমারী', 'চর রাজিবপুর'],
    'লালমনিরহাট': ['লালমনিরহাট সদর', 'আদিতমারী', 'কালীগঞ্জ', 'হাতীবান্ধা', 'পাটগ্রাম'],
    'নীলফামারী': ['নীলফামারী সদর', 'সৈয়দপুর', 'ডিমলা', 'জলঢাকা', 'ডোমার', 'কিশোরগঞ্জ'],
    'পঞ্চগড়': ['পঞ্চগড় সদর', 'বোদা', 'আটোয়ারী', 'দেবীগঞ্জ', 'তেঁতুলিয়া'],
    'ঠাকুরগাঁও': ['ঠাকুরগাঁও সদর', 'পীরগঞ্জ', 'বালিয়াডাঙ্গী', 'রানীশংকৈল', 'হরিপুর'],
    
    // ===== ময়মনসিংহ বিভাগ =====
    'ময়মনসিংহ': ['ময়মনসিংহ সদর', 'ত্রিশাল', 'ভালুকা', 'ফুলবাড়িয়া', 'মুক্তাগাছা', 'গফরগাঁও', 'গৌরীপুর', 'ঈশ্বরগঞ্জ', 'নান্দাইল', 'তারাকান্দা', 'ফুলপুর', 'হালুয়াঘাট', 'ধোবাউড়া'],
    'জামালপুর': ['জামালপুর সদর', 'মেলান্দহ', 'মাদারগঞ্জ', 'সরিষাবাড়ী', 'ইসলামপুর', 'দেওয়ানগঞ্জ', 'বকশীগঞ্জ'],
    'নেত্রকোণা': ['নেত্রকোণা সদর', 'আটপাড়া', 'বারহাট্টা', 'দুর্গাপুর', 'কলমাকান্দা', 'কেন্দুয়া', 'খালিয়াজুরী', 'মদন', 'মোহনগঞ্জ', 'পূর্বধলা'],
    'শেরপুর': ['শেরপুর সদর', 'নালিতাবাড়ী', 'নকলা', 'শ্রীবরদী', 'ঝিনাইগাতী']
};

    // ============================================================
    // 3. DOM এলিমেন্ট
    // ============================================================
    var userName = document.getElementById('userName');
    var userEmail = document.getElementById('userEmail');
    var displayFullName = document.getElementById('displayFullName');
    var displayEmail = document.getElementById('displayEmail');
    var displayPhone = document.getElementById('displayPhone');
    var displayDivision = document.getElementById('displayDivision');
    var displayDistrict = document.getElementById('displayDistrict');
    var displayUpazila = document.getElementById('displayUpazila');
    var displayAbout = document.getElementById('displayAbout');

    var editBtn = document.getElementById('editProfileBtn');
    var editAboutBtn = document.getElementById('editAboutBtn');
    var editModal = document.getElementById('editModal');
    var closeModal = document.getElementById('closeModal');
    var editForm = document.getElementById('editForm');

    var editFullName = document.getElementById('editFullName');
    var editEmail = document.getElementById('editEmail');
    var editPhone = document.getElementById('editPhone');
    var editDivision = document.getElementById('editDivision');
    var editDistrict = document.getElementById('editDistrict');
    var editUpazila = document.getElementById('editUpazila');
    var editAbout = document.getElementById('editAbout');

    var logoutBtn = document.getElementById('logoutBtn');
    var darkToggleSwitch = document.getElementById('darkToggleSwitch');
    var notifToggleSwitch = document.getElementById('notifToggleSwitch');
    var favCrops = document.getElementById('favCrops');
    var addFavBtn = document.getElementById('addFavBtn');
    var avatarDisplay = document.getElementById('avatarDisplay');
    var changePhotoBtn = document.getElementById('changePhotoBtn');

    var currentUser = null;
    var userData = {};

    // ============================================================
    // 4. ফাংশন: লোকেশন পপুলেট
    // ============================================================

    function populateDistricts() {
        var division = editDivision.value;
        var districtSelect = editDistrict;
        var upazilaSelect = editUpazila;

        districtSelect.innerHTML = '<option value="">-- জেলা নির্বাচন করুন --</option>';
        upazilaSelect.innerHTML = '<option value="">-- প্রথমে জেলা নির্বাচন করুন --</option>';
        upazilaSelect.disabled = true;

        if (!division) {
            districtSelect.disabled = true;
            return;
        }

        districtSelect.disabled = false;
        var districts = locationData[division]?.districts || [];
        districts.forEach(function(d) {
            var opt = document.createElement('option');
            opt.value = d;
            opt.textContent = d;
            districtSelect.appendChild(opt);
        });
    }

    function populateUpazilas() {
        var district = editDistrict.value;
        var upazilaSelect = editUpazila;

        upazilaSelect.innerHTML = '<option value="">-- উপজেলা নির্বাচন করুন --</option>';

        if (!district) {
            upazilaSelect.disabled = true;
            return;
        }

        upazilaSelect.disabled = false;
        var upazilas = upazilaData[district] || [];

        if (upazilas.length === 0) {
            upazilaSelect.innerHTML = '<option value="">-- কোনো উপজেলা নেই --</option>';
            return;
        }
        upazilas.forEach(function(u) {
            var opt = document.createElement('option');
            opt.value = u;
            opt.textContent = u;
            upazilaSelect.appendChild(opt);
        });
    }

    // ইভেন্ট লিসেনার
    editDivision.addEventListener('change', populateDistricts);
    editDistrict.addEventListener('change', populateUpazilas);

    // ============================================================
    // 5. ডিফল্ট ডাটা
    // ============================================================
    var defaultUserData = {
        fullName: 'জন কৃষক',
        email: 'john@krishisahayata.com',
        phone: '০১৭১১-১১১১১১',
        division: 'ঢাকা',
        district: 'ঢাকা',
        upazila: 'সাভার',
        about: 'আমি একজন কৃষক। ধান ও সবজি চাষ করি। আধুনিক প্রযুক্তি ব্যবহার করে চাষাবাদ করতে আগ্রহী।',
        favCrops: ['ধান', 'টমেটো', 'গম', 'আলু', 'পেঁয়াজ'],
        avatar: '👨‍🌾'
    };

    function setDemoData() {
        userData = JSON.parse(JSON.stringify(defaultUserData));
        updateUI(userData);
    }

    // ============================================================
    // 6. UI আপডেট
    // ============================================================
    function updateUI(data) {
        var name = data.fullName || data.name || 'কৃষক';
        var email = data.email || '';

        userName.textContent = name;
        userEmail.textContent = email;
        displayFullName.textContent = name;
        displayEmail.textContent = email;
        displayPhone.textContent = data.phone || '০১৭১১-১১১১১১';
        displayDivision.textContent = data.division || 'ঢাকা';
        displayDistrict.textContent = data.district || 'ঢাকা';
        displayUpazila.textContent = data.upazila || 'সাভার';
        displayAbout.textContent = data.about || 'আমি একজন কৃষক।';

        if (data.avatar) {
            avatarDisplay.textContent = data.avatar;
        }

        if (data.favCrops && data.favCrops.length > 0) {
            favCrops.innerHTML = data.favCrops.map(function(crop) {
                return '<span class="fav-item"><i class="fas fa-star"></i> ' + crop + ' <span class="remove-fav" data-crop="' + crop + '">&times;</span></span>';
            }).join('');

            document.querySelectorAll('.remove-fav').forEach(function(el) {
                el.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var crop = this.getAttribute('data-crop');
                    removeFavCrop(crop);
                });
            });
        }
    }

    // ============================================================
    // 7. Firebase
    // ============================================================
    function loadUserData() {
        if (typeof firebase === 'undefined' || !firebase.auth) {
            setDemoData();
            return;
        }

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                currentUser = user;

                if (firebase.database) {
                    var db = firebase.database();
                    db.ref('users/' + user.uid).once('value', function(snapshot) {
                        var data = snapshot.val();
                        if (data) {
                            userData = data;
                            updateUI(data);
                        } else {
                            var newData = JSON.parse(JSON.stringify(defaultUserData));
                            newData.email = user.email || '';
                            newData.fullName = user.displayName || user.email || 'কৃষক';
                            userData = newData;
                            updateUI(newData);
                            db.ref('users/' + user.uid).set(newData);
                        }
                    });
                } else {
                    setDemoData();
                }
            } else {
                window.location.href = 'login.html';
            }
        });
    }

    function saveToFirebase() {
        if (currentUser && firebase.database) {
            firebase.database().ref('users/' + currentUser.uid).update(userData)
                .catch(function(e) {
                    console.error('সেভ করতে সমস্যা:', e);
                });
        }
    }

    // ============================================================
    // 8. ফেভারিট
    // ============================================================
    function removeFavCrop(crop) {
        if (!userData.favCrops) return;
        userData.favCrops = userData.favCrops.filter(function(c) {
            return c !== crop;
        });
        updateUI(userData);
        saveToFirebase();
        showToast('🗑️ ' + crop + ' ফেভারিট থেকে সরানো হয়েছে', 'success');
    }

    // ============================================================
    // 9. মডাল
    // ============================================================
    function openEditModal() {
        editFullName.value = userData.fullName || userData.name || '';
        editEmail.value = userData.email || '';
        editPhone.value = userData.phone || '';
        editDivision.value = userData.division || 'ঢাকা';

        populateDistricts();
        setTimeout(function() {
            editDistrict.value = userData.district || '';
            populateUpazilas();
            setTimeout(function() {
                editUpazila.value = userData.upazila || '';
            }, 100);
        }, 100);

        editAbout.value = userData.about || '';
        editModal.classList.add('show');
    }

    // ============================================================
    // 10. ইভেন্ট লিসেনার
    // ============================================================
    editBtn.addEventListener('click', openEditModal);
    editAboutBtn.addEventListener('click', openEditModal);

    closeModal.addEventListener('click', function() {
        editModal.classList.remove('show');
    });
    editModal.addEventListener('click', function(e) {
        if (e.target === this) {
            editModal.classList.remove('show');
        }
    });

    editForm.addEventListener('submit', function(e) {
        e.preventDefault();

        userData.fullName = editFullName.value.trim() || userData.fullName;
        userData.email = editEmail.value.trim() || userData.email;
        userData.phone = editPhone.value.trim() || userData.phone;
        userData.division = editDivision.value || 'ঢাকা';
        userData.district = editDistrict.value || 'ঢাকা';
        userData.upazila = editUpazila.value || 'সাভার';
        userData.about = editAbout.value.trim() || userData.about;

        updateUI(userData);
        saveToFirebase();
        editModal.classList.remove('show');
        showToast('✅ প্রোফাইল আপডেট করা হয়েছে!', 'success');
    });

    addFavBtn.addEventListener('click', function() {
        var crop = prompt('ফসলের নাম লিখুন:');
        if (crop && crop.trim()) {
            var newCrop = crop.trim();
            if (!userData.favCrops) userData.favCrops = [];
            if (userData.favCrops.indexOf(newCrop) === -1) {
                userData.favCrops.push(newCrop);
                updateUI(userData);
                saveToFirebase();
                showToast('✅ ' + newCrop + ' ফেভারিটে যোগ করা হয়েছে!', 'success');
            } else {
                showToast('⚠️ ' + newCrop + ' ইতিমধ্যে ফেভারিটে আছে!', 'error');
            }
        }
    });

    darkToggleSwitch.addEventListener('click', function() {
        this.classList.toggle('active');
        var isDark = this.classList.contains('active');
        document.body.classList.toggle('dark', isDark);
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        var darkToggleBtn = document.getElementById('darkToggle');
        if (darkToggleBtn) {
            darkToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i> <span>লাইট</span>' : '<i class="fas fa-moon"></i> <span>ডার্ক</span>';
        }
    });

    notifToggleSwitch.addEventListener('click', function() {
        this.classList.toggle('active');
        var isOn = this.classList.contains('active');
        showToast(isOn ? '🔔 নোটিফিকেশন চালু' : '🔕 নোটিফিকেশন বন্ধ', 'success');
    });

    changePhotoBtn.addEventListener('click', function() {
        var current = userData.avatar || '👨‍🌾';
        var newAvatar = prompt('আপনার প্রোফাইল ইমোজি দিন:', current);
        if (newAvatar && newAvatar.trim()) {
            userData.avatar = newAvatar.trim();
            avatarDisplay.textContent = userData.avatar;
            saveToFirebase();
            showToast('✅ প্রোফাইল ছবি আপডেট করা হয়েছে!', 'success');
        }
    });

    logoutBtn.addEventListener('click', function() {
        if (confirm('আপনি কি লগআউট করতে চান?')) {
            if (typeof firebase !== 'undefined' && firebase.auth) {
                firebase.auth().signOut().then(function() {
                    window.location.href = 'login.html';
                });
            } else {
                window.location.href = 'login.html';
            }
        }
    });

    // ============================================================
    // 11. ইনিশিয়ালাইজ
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        loadUserData();
        console.log('👤 প্রোফাইল পেজ লোড হয়েছে!');
        console.log('📍 মোট জেলা:', Object.keys(upazilaData).length);
        var totalUpazila = 0;
        for (var key in upazilaData) {
            totalUpazila += upazilaData[key].length;
        }
        console.log('📍 মোট উপজেলা:', totalUpazila);
    });

})();