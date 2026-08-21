/**
 * ============================================
 * মাল্টি-ল্যাঙ্গুয়েজ - JavaScript
 * ফাইল: js/language.js
 * ============================================
 */

(function() {
    'use strict';

    // ============================================================
    // 1. ভাষার ডাটাবেস
    // ============================================================
    var translations = {
        'bn': {
            // ===== সাধারণ =====
            'app_name': 'কৃষি সহায়তা',
            'tagline': 'আবহাওয়া · বাজারদর · আধুনিক চাষাবাদ',
            'welcome': 'কৃষকের বন্ধু, উন্নতির ঠিকানা',
            
            // ===== নেভিগেশন =====
            'nav_home': 'হোম',
            'nav_crops': 'ফসল',
            'nav_bazaar': 'বাজারদর',
            'nav_equipment': 'যন্ত্রপাতি',
            'nav_rental': 'ভাড়া',
            'nav_shop': 'বাজার',
            'nav_order': 'অর্ডার',
            'nav_calendar': 'ক্যালেন্ডার',
            'nav_disease': 'রোগ শনাক্ত',
            'nav_chatbot': 'চ্যাটবট',
            'nav_forum': 'ফোরাম',
            'nav_about': 'সম্পর্কে',
            'nav_contact': 'যোগাযোগ',
            'nav_chat': 'চ্যাট',
            'nav_profile': 'প্রোফাইল',
            'nav_login': 'লগইন',
            'nav_admin': 'অ্যাডমিন',
            'nav_backup': 'ব্যাকআপ',
            'nav_reports': 'রিপোর্ট',

            // ===== about.html-এর জন্য কী =====
            'about_hero_title': 'কৃষকের বন্ধু, উন্নতির ঠিকানা',
            'about_hero_desc': 'কৃষি সহায়তা একটি ডিজিটাল প্ল্যাটফর্ম...',
            'about_mission_title': 'আমাদের লক্ষ্য ও উদ্দেশ্য',
            'about_mission_1_title': 'কৃষক সহায়তা',
            'about_mission_1_desc': 'কৃষকদের সঠিক তথ্য ও আধুনিক প্রযুক্তি...',
            'about_mission_2_title': 'জ্ঞানভিত্তিক কৃষি',
            'about_mission_2_desc': 'আধুনিক চাষাবাদ পদ্ধতি, ফসল পরিচর্যা...',
            'about_mission_3_title': 'কৃষক কমিউনিটি',
            'about_mission_3_desc': 'কৃষকদের মধ্যে সংযোগ তৈরি করে...',
            'about_stats_title': 'আমাদের অর্জন',
            'about_team_title': 'আমাদের টিম',
            'about_team_role_ceo': 'প্রতিষ্ঠাতা ও সিইও',
            'about_team_bio_ceo': 'কৃষি প্রযুক্তি বিশেষজ্ঞ, ১০+ বছর অভিজ্ঞতা',
            'about_team_role_researcher': 'কৃষি গবেষক',
            'about_team_bio_researcher': 'কৃষি বিজ্ঞানী, ফসল উন্নয়ন প্রকল্পে কাজ করছেন',
            'about_team_role_cto': 'প্রধান প্রযুক্তি কর্মকর্তা',
            'about_team_bio_cto': 'সফটওয়্যার ডেভেলপার, কৃষি ডিজিটালাইজেশন বিশেষজ্ঞ',
            'about_team_role_community': 'কমিউনিটি ম্যানেজার',
            'about_team_bio_community': 'কৃষকদের সাথে যোগাযোগ ও প্রশিক্ষণ পরিচালনা করেন',
            'about_team_role_soil': 'মৃত্তিকা বিশেষজ্ঞ',
            'about_team_bio_soil': 'মৃত্তিকা পরীক্ষা ও সার ব্যবস্থাপনা পরামর্শ দেন',
            'about_team_role_marketing': 'মার্কেটিং ও যোগাযোগ',
            'about_team_bio_marketing': 'কৃষকদের কাছে প্ল্যাটফর্মের সেবা পৌঁছে দেন',
            
            // ===== হোম =====
            'home_hero': 'কৃষকের বন্ধু, উন্নতির ঠিকানা',
            'home_subtitle': 'ফসলের তথ্য, যন্ত্রপাতি ভাড়া, বাজারদর, লাইভ চ্যাট—একই প্ল্যাটফর্মে।',
            'home_stats_crops': 'ফসলের তথ্য',
            'home_stats_equipment': 'যন্ত্রপাতি',
            'home_stats_districts': 'জেলা কভারেজ',
            'home_stats_farmers': 'সন্তুষ্ট কৃষক',
            'home_features': 'আমাদের সেবাসমূহ',
            'home_quick_links': 'দ্রুত প্রবেশ',
            
            // ===== ফসল =====
            'crops_title': 'ফসলের তথ্য',
            'crops_subtitle': 'জেলা অনুযায়ী বিভিন্ন ফসলের বিস্তারিত তথ্য, চাষাবাদ পদ্ধতি ও সময়কাল সম্পর্কে জানুন।',
            'crops_search': '🔍 ফসলের নাম লিখুন...',
            'crops_district': 'জেলা',
            'crops_all_districts': 'সব জেলা',
            'crops_plowing': 'চাষের সংখ্যা',
            'crops_duration': 'চাষের সময়',
            'crops_price': 'দাম (প্রতি কেজি)',
            'crops_details': 'বিস্তারিত',
            
            // ===== বাজারদর =====
            'market_title': 'বাজারদর',
            'market_subtitle': 'বিভিন্ন ফসলের বর্তমান বাজারদর, পরিবর্তন ও তুলনামূলক তথ্য দেখুন।',
            'market_search': '🔍 ফসল খুঁজুন...',
            'market_live': 'লাইভ',
            'market_price': 'দাম',
            'market_change': 'পরিবর্তন',
            'market_last_update': 'সর্বশেষ আপডেট',
            
            // ===== যন্ত্রপাতি =====
            'equipment_title': 'কৃষি যন্ত্রপাতি',
            'equipment_subtitle': 'বিভিন্ন ধরনের কৃষি যন্ত্রপাতি, তাদের ব্যবহার, ভাড়ার খরচ ও প্রাপ্যতা সম্পর্কে জানুন।',
            'equipment_search': '🔍 যন্ত্রপাতি খুঁজুন...',
            'equipment_rent': 'ভাড়া (ঘণ্টা)',
            'equipment_available': 'উপলব্ধ',
            'equipment_rented': 'ভাড়ায় গেছে',
            'equipment_unavailable': 'অউপলব্ধ',
            
            // ===== ফুটার =====
            'footer_quick_links': 'দ্রুত লিংক',
            'footer_support': 'সহায়তা',
            'footer_contact': 'যোগাযোগ',
            'footer_phone': '১৬৩৩৩',
            'footer_email': 'info@krishisahayata.com',
            'footer_address': 'ঢাকা, বাংলাদেশ',
            'footer_rights': 'সব অধিকার সংরক্ষিত',
            'footer_tech': 'প্রযুক্তি সহায়তায় কৃষির উন্নয়ন',
            
            // ===== ভাষা =====
            'language_select': 'ভাষা নির্বাচন করুন',
            'language_bn': 'বাংলা',
            'language_en': 'ইংরেজি'
        },
        
        'en': {
            // ===== সাধারণ =====
            'app_name': 'Krisok Sahayata',
            'tagline': 'Weather · Market · Modern Farming',
            'welcome': "Farmer's Friend, Destination of Progress",
            
            // ===== নেভিগেশন =====
            'nav_home': 'Home',
            'nav_crops': 'Crops',
            'nav_bazaar': 'Market',
            'nav_equipment': 'Equipment',
            'nav_rental': 'Rental',
            'nav_shop': 'Shop',
            'nav_order': 'Order',
            'nav_calendar': 'Calendar',
            'nav_disease': 'Disease Detection',
            'nav_chatbot': 'Chatbot',
            'nav_forum': 'Forum',
            'nav_about': 'About',
            'nav_contact': 'Contact',
            'nav_chat': 'Chat',
            'nav_profile': 'Profile',
            'nav_login': 'Login',
            'nav_admin': 'Admin',
            'nav_backup': 'Backup',
            'nav_reports': 'Reports',

            // =====  (about.html) =====
            'about_hero_title': "Farmer's Friend, Destination of Progress",
            'about_hero_desc': 'Krisok Sahayata is a digital platform that provides farmers with modern technology, accurate information and support.',
            'about_mission_title': 'Our Mission & Vision',
            'about_mission_1_title': 'Farmer Support',
            'about_mission_1_desc': 'Improving the quality of life of farmers by providing them with accurate information and modern technology.',
            'about_mission_2_title': 'Knowledge Based Agriculture',
            'about_mission_2_desc': 'Providing knowledge on modern farming methods, crop care, equipment usage.',
            'about_mission_3_title': 'Farmer Community',
            'about_mission_3_desc': 'Building connections among farmers for knowledge sharing and mutual support.',
            'about_stats_title': 'Our Achievements',
            'about_team_title': 'Our Team',
            'about_team_role_ceo': 'Founder & CEO',
            'about_team_bio_ceo': 'Agriculture technology expert with 10+ years of experience',
            'about_team_role_researcher': 'Agriculture Researcher',
            'about_team_bio_researcher': 'Agricultural scientist working on crop development projects',
            'about_team_role_cto': 'Chief Technology Officer',
            'about_team_bio_cto': 'Software developer specializing in agricultural digitalization',
            'about_team_role_community': 'Community Manager',
            'about_team_bio_community': 'Manages communication and training with farmers',
            'about_team_role_soil': 'Soil Expert',
            'about_team_bio_soil': 'Provides soil testing and fertilizer management advice',
            'about_team_role_marketing': 'Marketing & Communication',
            'about_team_bio_marketing': 'Delivers platform services to farmers',

            
            // ===== হোম =====
            'home_hero': "Farmer's Friend, Destination of Progress",
            'home_subtitle': 'Crop information, equipment rental, market prices, live chat—all in one platform.',
            'home_stats_crops': 'Crop Info',
            'home_stats_equipment': 'Equipment',
            'home_stats_districts': 'District Coverage',
            'home_stats_farmers': 'Happy Farmers',
            'home_features': 'Our Services',
            'home_quick_links': 'Quick Links',
            
            // ===== ফসল =====
            'crops_title': 'Crop Information',
            'crops_subtitle': 'Learn about different crops, cultivation methods, seasons and market prices.',
            'crops_search': '🔍 Search crops...',
            'crops_district': 'District',
            'crops_all_districts': 'All Districts',
            'crops_plowing': 'Plowing',
            'crops_duration': 'Duration',
            'crops_price': 'Price (per kg)',
            'crops_details': 'Details',
            
            // ===== বাজারদর =====
            'market_title': 'Market Prices',
            'market_subtitle': 'Current market prices, changes and comparative information of different crops.',
            'market_search': '🔍 Search crops...',
            'market_live': 'Live',
            'market_price': 'Price',
            'market_change': 'Change',
            'market_last_update': 'Last Update',
            
            // ===== যন্ত্রপাতি =====
            'equipment_title': 'Agricultural Equipment',
            'equipment_subtitle': 'Learn about different agricultural equipment, their uses, rental costs and availability.',
            'equipment_search': '🔍 Search equipment...',
            'equipment_rent': 'Rent (hour)',
            'equipment_available': 'Available',
            'equipment_rented': 'Rented',
            'equipment_unavailable': 'Unavailable',
            
            // ===== ফুটার =====
            'footer_quick_links': 'Quick Links',
            'footer_support': 'Support',
            'footer_contact': 'Contact',
            'footer_phone': '16333',
            'footer_email': 'info@krishisahayata.com',
            'footer_address': 'Dhaka, Bangladesh',
            'footer_rights': 'All Rights Reserved',
            'footer_tech': 'Technology for Agricultural Development',
            
            // ===== ভাষা =====
            'language_select': 'Select Language',
            'language_bn': 'Bangla',
            'language_en': 'English'
        }
    };

    // ============================================================
    // 2. বর্তমান ভাষা লোড
    // ============================================================
    var currentLang = localStorage.getItem('appLanguage') || 'bn';

    // ============================================================
    // 3. টেক্সট ট্রান্সলেট
    // ============================================================
    function translateText(key) {
        var langData = translations[currentLang] || translations['bn'];
        return langData[key] || key;
    }

    // ============================================================
    // 4. পেজ ট্রান্সলেট
    // ============================================================
    function translatePage() {
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            var key = el.getAttribute('data-i18n');
            var text = translateText(key);
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        });

        // টাইটেল আপডেট
        document.title = translateText('app_name');
    }

    // ============================================================
    // 5. ভাষা পরিবর্তন
    // ============================================================
    function changeLanguage(lang) {
        if (lang === currentLang) return;
        currentLang = lang;
        localStorage.setItem('appLanguage', lang);
        translatePage();
        showToast(lang === 'bn' ? '✅ ভাষা পরিবর্তন করা হয়েছে!' : '✅ Language changed!', 'success');
        
        // ভাষা বাটন আপডেট
        updateLanguageButtons();
    }

    function updateLanguageButtons() {
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            var lang = btn.getAttribute('data-lang');
            if (lang === currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // ============================================================
    // 6. HTML-এ ভাষা সিলেক্টর যোগ করা
    // ============================================================
    function addLanguageSelector() {
        var headerActions = document.querySelector('.header-actions');
        if (!headerActions) return;

        var langHtml = `
            <div class="language-selector" style="display:flex; gap:4px; align-items:center;">
                <button class="lang-btn ${currentLang === 'bn' ? 'active' : ''}" data-lang="bn" style="
                    padding:4px 12px;
                    border:2px solid rgba(255,255,255,0.2);
                    border-radius:30px;
                    background:${currentLang === 'bn' ? 'rgba(255,255,255,0.2)' : 'transparent'};
                    color:white;
                    font-weight:600;
                    cursor:pointer;
                    font-size:0.8rem;
                    transition:0.3s;
                ">বাং</button>
                <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" style="
                    padding:4px 12px;
                    border:2px solid rgba(255,255,255,0.2);
                    border-radius:30px;
                    background:${currentLang === 'en' ? 'rgba(255,255,255,0.2)' : 'transparent'};
                    color:white;
                    font-weight:600;
                    cursor:pointer;
                    font-size:0.8rem;
                    transition:0.3s;
                ">ENG</button>
            </div>
        `;

        headerActions.insertAdjacentHTML('afterbegin', langHtml);

        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var lang = this.getAttribute('data-lang');
                changeLanguage(lang);
            });
        });
    }

    // ============================================================
    // 7. টোস্ট ফাংশন
    // ============================================================
    function showToast(msg, type) {
        var toast = document.getElementById('toast');
        if (!toast) {
            console.log('📢', msg);
            return;
        }
        type = type || 'success';
        toast.textContent = msg;
        toast.className = 'toast show ' + type;
        setTimeout(function() { toast.classList.remove('show'); }, 3000);
    }

    // ============================================================
    // 8. ইনিশিয়াল
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        addLanguageSelector();
        translatePage();
        console.log('🌐 মাল্টি-ল্যাঙ্গুয়েজ সিস্টেম রেডি!');
        console.log('📌 বর্তমান ভাষা:', currentLang);
    });

    // গ্লোবাল ফাংশন
    window.changeLanguage = changeLanguage;
    window.translateText = translateText;
    window.translatePage = translatePage;

})();

