/**
 * ============================================
 * কৃষি ক্যালেন্ডার - JavaScript
 * ফাইল: js/calendar.js
 * ============================================
 */

(function() {
    'use strict';

    // ============================================================
    // 1. ক্যালেন্ডার ডাটাবেস
    // ============================================================
    var calendarData = {
        'ধান': {
            'জানুয়ারি': [{ step: '🌱', title: 'বীজ বপন', desc: 'বোরো ধানের বীজ বপন শুরু করুন।' }],
            'ফেব্রুয়ারি': [{ step: '💧', title: 'সেচ', desc: 'জমিতে পর্যাপ্ত পানি রাখুন।' }],
            'মার্চ': [{ step: '🧪', title: 'সার প্রয়োগ', desc: 'ইউরিয়া ও টিএসপি সার প্রয়োগ করুন।' }],
            'এপ্রিল': [{ step: '🌾', title: 'ফসল তোলা', desc: 'বোরো ধান কাটা শুরু করুন।' }],
            'মে': [{ step: '🌾', title: 'ফসল তোলা', desc: 'আমন ধানের বীজ বপন শুরু করুন।' }],
            'জুন': [{ step: '🌱', title: 'বীজ বপন', desc: 'আমন ধানের বীজ বপন করুন।' }],
            'জুলাই': [{ step: '🧪', title: 'সার প্রয়োগ', desc: 'জমিতে সার প্রয়োগ করুন।' }],
            'আগস্ট': [{ step: '💧', title: 'সেচ', desc: 'আমনের সময় সেচ দিন।' }],
            'সেপ্টেম্বর': [{ step: '🌾', title: 'ফসল তোলা', desc: 'আমন ধান কাটা শুরু করুন।' }]
        },
        'গম': {
            'অক্টোবর': [{ step: '🌱', title: 'বীজ বপন', desc: 'গমের বীজ বপন শুরু করুন।' }],
            'নভেম্বর': [{ step: '💧', title: 'সেচ', desc: 'প্রথম সেচ দিন।' }],
            'ডিসেম্বর': [{ step: '🧪', title: 'সার প্রয়োগ', desc: 'ইউরিয়া সার প্রয়োগ করুন।' }],
            'জানুয়ারি': [{ step: '💧', title: 'সেচ', desc: 'দ্বিতীয় সেচ দিন।' }],
            'ফেব্রুয়ারি': [{ step: '💧', title: 'সেচ', desc: 'তৃতীয় সেচ দিন।' }],
            'মার্চ': [{ step: '🌾', title: 'ফসল তোলা', desc: 'গম কাটা শুরু করুন।' }]
        },
        'টমেটো': {
            'অক্টোবর': [{ step: '🌱', title: 'বীজ বপন', desc: 'টমেটোর বীজ বপন করুন।' }],
            'নভেম্বর': [{ step: '🌱', title: 'চারা রোপণ', desc: 'মাচায় চারা রোপণ করুন।' }],
            'ডিসেম্বর': [{ step: '🧪', title: 'সার প্রয়োগ', desc: 'ডিএপি ও জৈব সার দিন।' }],
            'জানুয়ারি': [{ step: '💧', title: 'সেচ', desc: 'ড্রিপ ইরিগেশন দিয়ে সেচ দিন।' }],
            'ফেব্রুয়ারি': [{ step: '🍅', title: 'ফসল তোলা', desc: 'টমেটো সংগ্রহ শুরু করুন।' }],
            'মার্চ': [{ step: '🍅', title: 'ফসল তোলা', desc: 'টমেটো সংগ্রহ শেষ করুন।' }]
        },
        'আলু': {
            'নভেম্বর': [{ step: '🌱', title: 'বীজ বপন', desc: 'আলুর বীজ বপন করুন।' }],
            'ডিসেম্বর': [{ step: '💧', title: 'সেচ', desc: 'প্রথম সেচ দিন।' }],
            'জানুয়ারি': [{ step: '🧪', title: 'সার প্রয়োগ', desc: 'জৈব সার প্রয়োগ করুন।' }],
            'ফেব্রুয়ারি': [{ step: '💧', title: 'সেচ', desc: 'দ্বিতীয় সেচ দিন।' }],
            'মার্চ': [{ step: '🥔', title: 'ফসল তোলা', desc: 'আলু সংগ্রহ শুরু করুন।' }]
        },
        'পেঁয়াজ': {
            'অক্টোবর': [{ step: '🌱', title: 'বীজ বপন', desc: 'পেঁয়াজের বীজ বপন করুন।' }],
            'নভেম্বর': [{ step: '🧪', title: 'সার প্রয়োগ', desc: 'এমওপি সার প্রয়োগ করুন।' }],
            'ডিসেম্বর': [{ step: '💧', title: 'সেচ', desc: 'প্রথম সেচ দিন।' }],
            'জানুয়ারি': [{ step: '💧', title: 'সেচ', desc: 'দ্বিতীয় সেচ দিন।' }],
            'ফেব্রুয়ারি': [{ step: '🧅', title: 'ফসল তোলা', desc: 'পেঁয়াজ সংগ্রহ শুরু করুন।' }],
            'মার্চ': [{ step: '🧅', title: 'ফসল তোলা', desc: 'পেঁয়াজ সংগ্রহ শেষ করুন।' }]
        },
        'কাঁচামরিচ': {
            'ফেব্রুয়ারি': [{ step: '🌱', title: 'বীজ বপন', desc: 'মরিচের বীজ বপন করুন।' }],
            'মার্চ': [{ step: '🌱', title: 'চারা রোপণ', desc: 'মাচায় চারা রোপণ করুন।' }],
            'এপ্রিল': [{ step: '🧪', title: 'সার প্রয়োগ', desc: 'ভার্মি কম্পোস্ট প্রয়োগ করুন।' }],
            'মে': [{ step: '💧', title: 'সেচ', desc: 'প্রতিদিন সেচ দিন।' }],
            'জুন': [{ step: '🌶️', title: 'ফসল তোলা', desc: 'মরিচ সংগ্রহ শুরু করুন।' }]
        },
        'ভুট্টা': {
            'মার্চ': [{ step: '🌱', title: 'বীজ বপন', desc: 'ভুট্টার বীজ বপন করুন।' }],
            'এপ্রিল': [{ step: '🧪', title: 'সার প্রয়োগ', desc: 'ইউরিয়া সার প্রয়োগ করুন।' }],
            'মে': [{ step: '💧', title: 'সেচ', desc: 'প্রথম সেচ দিন।' }],
            'জুন': [{ step: '💧', title: 'সেচ', desc: 'দ্বিতীয় সেচ দিন।' }],
            'জুলাই': [{ step: '🌽', title: 'ফসল তোলা', desc: 'ভুট্টা সংগ্রহ শুরু করুন।' }]
        },
        'বাঁধাকপি': {
            'অক্টোবর': [{ step: '🌱', title: 'বীজ বপন', desc: 'বাঁধাকপির বীজ বপন করুন।' }],
            'নভেম্বর': [{ step: '🌱', title: 'চারা রোপণ', desc: 'জমিতে চারা রোপণ করুন।' }],
            'ডিসেম্বর': [{ step: '🧪', title: 'সার প্রয়োগ', desc: 'জৈব সার প্রয়োগ করুন।' }],
            'জানুয়ারি': [{ step: '💧', title: 'সেচ', desc: 'প্রথম সেচ দিন।' }],
            'ফেব্রুয়ারি': [{ step: '🥬', title: 'ফসল তোলা', desc: 'বাঁধাকপি সংগ্রহ শুরু করুন।' }]
        }
    };

    // ============================================================
    // 2. DOM এলিমেন্ট
    // ============================================================
    var cropSelect = document.getElementById('cropSelect');
    var monthSelect = document.getElementById('monthSelect');
    var searchBtn = document.getElementById('searchBtn');
    var calendarGrid = document.getElementById('calendarGrid');
    var noData = document.getElementById('noData');

    // ============================================================
    // 3. মাসের নাম (বাংলা)
    // ============================================================
    var months = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];

    // ============================================================
    // 4. ক্যালেন্ডার রেন্ডার
    // ============================================================
    function renderCalendar(crop, month) {
        if (!crop || !month) {
            calendarGrid.innerHTML = '';
            noData.style.display = 'block';
            return;
        }

        var cropData = calendarData[crop];
        if (!cropData) {
            calendarGrid.innerHTML = '';
            noData.style.display = 'block';
            return;
        }

        // ওই মাসের ডাটা
        var monthData = cropData[month];
        if (!monthData || monthData.length === 0) {
            calendarGrid.innerHTML = '';
            noData.style.display = 'block';
            return;
        }

        noData.style.display = 'none';

        var html = '';
        // শুধু ওই মাসের জন্য একটিমাত্র কার্ড
        html += `
            <div class="calendar-card">
                <div class="card-header">
                    <div class="month">${month}</div>
                    <div class="crop-name"><i class="fas fa-seedling"></i> ${crop}</div>
                </div>
                <div class="card-body">
                    ${monthData.map(function(item) {
                        return `
                            <div class="step">
                                <div class="icon">${item.step}</div>
                                <div class="info">
                                    <div class="title">${item.title}</div>
                                    <div class="desc">${item.desc}</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        // সম্পর্কিত মাসগুলোও দেখানো (ঐ ফসলের জন্য)
        var allMonths = Object.keys(cropData);
        var otherMonths = allMonths.filter(function(m) { return m !== month; });

        if (otherMonths.length > 0) {
            html += otherMonths.map(function(m) {
                var data = cropData[m];
                return `
                    <div class="calendar-card">
                        <div class="card-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary));">
                            <div class="month">${m}</div>
                            <div class="crop-name"><i class="fas fa-seedling"></i> ${crop}</div>
                        </div>
                        <div class="card-body">
                            ${data.map(function(item) {
                                return `
                                    <div class="step">
                                        <div class="icon">${item.step}</div>
                                        <div class="info">
                                            <div class="title">${item.title}</div>
                                            <div class="desc">${item.desc}</div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }).join('');
        }

        calendarGrid.innerHTML = html;
    }

    // ============================================================
    // 5. সার্চ ফাংশন
    // ============================================================
    function searchCalendar() {
        var crop = cropSelect.value;
        var month = monthSelect.value;

        if (!crop) {
            showToast('❌ দয়া করে একটি ফসল নির্বাচন করুন!', 'error');
            return;
        }
        if (!month) {
            showToast('❌ দয়া করে একটি মাস নির্বাচন করুন!', 'error');
            return;
        }

        renderCalendar(crop, month);
    }

    // ============================================================
    // 6. ইভেন্ট লিসেনার
    // ============================================================
    searchBtn.addEventListener('click', searchCalendar);

    // Enter key support
    cropSelect.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') searchCalendar();
    });
    monthSelect.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') searchCalendar();
    });

    // ============================================================
    // 7. ইনিশিয়াল
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        // ডিফল্ট কিছু দেখানোর জন্য
        var defaultCrop = 'ধান';
        var defaultMonth = 'জানুয়ারি';
        cropSelect.value = defaultCrop;
        monthSelect.value = defaultMonth;
        renderCalendar(defaultCrop, defaultMonth);
        console.log('📅 কৃষি ক্যালেন্ডার পেজ লোড হয়েছে!');
        console.log('🌾 মোট ফসল:', Object.keys(calendarData).length);
    });

})();