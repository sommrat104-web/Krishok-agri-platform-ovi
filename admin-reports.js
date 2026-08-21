/**
 * ============================================
 * রিপোর্ট জেনারেট - JavaScript
 * ফাইল: js/admin-reports.js
 * ============================================
 */

(function() {
    'use strict';

    var database = null;

    // ============================================================
    // 1. Firebase চেক
    // ============================================================
    function initFirebase() {
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            database = firebase.database();
            console.log('✅ Firebase সংযুক্ত');
            loadAllPreviews();
        } else {
            console.warn('⚠️ Firebase পাওয়া যায়নি');
            loadDemoPreviews();
        }
    }

    // ============================================================
    // 2. সব প্রিভিউ লোড
    // ============================================================
    function loadAllPreviews() {
        loadCropsPreview();
        loadOrdersPreview();
        loadUsersPreview();
        loadMarketPreview();
    }

    // ============================================================
    // 3. ফসল প্রিভিউ
    // ============================================================
    function loadCropsPreview() {
        var container = document.getElementById('previewCrops');
        var crops = [
            { name: 'ধান', category: 'শস্য', price: 32 },
            { name: 'টমেটো', category: 'শাকসবজি', price: 80 },
            { name: 'গম', category: 'শস্য', price: 38 },
            { name: 'আলু', category: 'শাকসবজি', price: 28 }
        ];
        container.innerHTML = generateTable(crops, ['নাম', 'বিভাগ', 'দাম (টাকা)']);
    }

    // ============================================================
    // 4. অর্ডার প্রিভিউ
    // ============================================================
    function loadOrdersPreview() {
        var container = document.getElementById('previewOrders');
        var orders = [
            { id: '#ORD-001', name: 'জন কৃষক', total: 120, status: 'pending' },
            { id: '#ORD-002', name: 'মোসা. ফাতেমা', total: 250, status: 'completed' },
            { id: '#ORD-003', name: 'মোঃ রফিক', total: 85, status: 'cancelled' }
        ];
        container.innerHTML = generateTable(orders, ['অর্ডার আইডি', 'নাম', 'মোট', 'স্ট্যাটাস']);
    }

    // ============================================================
    // 5. ইউজার প্রিভিউ
    // ============================================================
    function loadUsersPreview() {
        var container = document.getElementById('previewUsers');
        var users = [
            { name: 'জন কৃষক', email: 'john@email.com', role: 'ইউজার' },
            { name: 'মোঃ আব্দুল্লাহ', email: 'abdullah@email.com', role: 'অ্যাডমিন' },
            { name: 'মোসা. ফাতেমা', email: 'fatema@email.com', role: 'ইউজার' }
        ];
        container.innerHTML = generateTable(users, ['নাম', 'ইমেইল', 'রোল']);
    }

    // ============================================================
    // 6. বাজারদর প্রিভিউ
    // ============================================================
    function loadMarketPreview() {
        var container = document.getElementById('previewMarket');
        var market = [
            { crop: 'ধান', price: 32, change: '+২%' },
            { crop: 'টমেটো', price: 80, change: '+৫%' },
            { crop: 'পেঁয়াজ', price: 55, change: '-৩%' }
        ];
        container.innerHTML = generateTable(market, ['ফসল', 'দাম', 'পরিবর্তন']);
    }

    // ============================================================
    // 7. টেবিল জেনারেট
    // ============================================================
    function generateTable(data, headers) {
        if (!data || data.length === 0) {
            return '<p style="color:var(--gray);">কোনো তথ্য নেই</p>';
        }

        var html = '<table>';
        html += '<thead><tr>';
        headers.forEach(function(h) {
            html += '<th>' + h + '</th>';
        });
        html += '</tr></thead><tbody>';

        data.forEach(function(row) {
            html += '<tr>';
            var values = Object.values(row);
            values.forEach(function(v) {
                html += '<td>' + v + '</td>';
            });
            html += '</tr>';
        });

        html += '</tbody></table>';
        return html;
    }

    // ============================================================
    // 8. ডেমো প্রিভিউ
    // ============================================================
    function loadDemoPreviews() {
        document.getElementById('previewCrops').innerHTML = '<p style="color:var(--gray);">ডেমো: ফসলের তথ্য</p>';
        document.getElementById('previewOrders').innerHTML = '<p style="color:var(--gray);">ডেমো: অর্ডারের তথ্য</p>';
        document.getElementById('previewUsers').innerHTML = '<p style="color:var(--gray);">ডেমো: ইউজারের তথ্য</p>';
        document.getElementById('previewMarket').innerHTML = '<p style="color:var(--gray);">ডেমো: বাজারদরের তথ্য</p>';
    }

    // ============================================================
    // 9. রিপোর্ট জেনারেট (গ্লোবাল)
    // ============================================================
    window.generateReport = function(type, format) {
        var element = document.getElementById('preview' + type.charAt(0).toUpperCase() + type.slice(1));
        if (!element) {
            showToast('❌ রিপোর্ট পাওয়া যায়নি!', 'error');
            return;
        }

        var title = {
            'crops': 'ফসল রিপোর্ট',
            'orders': 'অর্ডার রিপোর্ট',
            'users': 'ইউজার রিপোর্ট',
            'market': 'বাজারদর রিপোর্ট'
        }[type] || 'রিপোর্ট';

        if (format === 'print') {
            printReport(element, title);
        } else if (format === 'pdf') {
            downloadPDF(element, title);
        } else if (format === 'csv') {
            downloadCSV(element, title);
        }
    };

    // ============================================================
    // 10. প্রিন্ট
    // ============================================================
    function printReport(element, title) {
        var win = window.open('', '_blank');
        win.document.write('<html><head><title>' + title + '</title>');
        win.document.write('<style>');
        win.document.write('body { font-family: "Inter", sans-serif; padding: 40px; }');
        win.document.write('h1 { color: #1a5e2a; border-bottom: 3px solid #f5b042; padding-bottom: 12px; }');
        win.document.write('table { width: 100%; border-collapse: collapse; margin-top: 20px; }');
        win.document.write('th { background: #1a5e2a; color: white; padding: 10px; text-align: left; }');
        win.document.write('td { padding: 8px 10px; border-bottom: 1px solid #ddd; }');
        win.document.write('</style>');
        win.document.write('</head><body>');
        win.document.write('<h1>🌾 ' + title + '</h1>');
        win.document.write('<p>তারিখ: ' + new Date().toLocaleString('bn-BD') + '</p>');
        win.document.write(element.innerHTML);
        win.document.write('</body></html>');
        win.document.close();
        win.print();
    }

    // ============================================================
    // 11. PDF ডাউনলোড
    // ============================================================
    function downloadPDF(element, title) {
        if (typeof html2pdf === 'undefined') {
            showToast('❌ html2pdf লাইব্রেরি লোড হয়নি!', 'error');
            return;
        }

        var content = document.createElement('div');
        content.style.padding = '30px';
        content.style.fontFamily = 'Inter, sans-serif';
        content.innerHTML = `
            <h1 style="color:#1a5e2a; border-bottom:3px solid #f5b042; padding-bottom:12px;">🌾 ${title}</h1>
            <p style="color:#555; margin:12px 0;">তারিখ: ${new Date().toLocaleString('bn-BD')}</p>
            ${element.innerHTML}
        `;

        var opt = {
            margin: [10, 10, 10, 10],
            filename: title + '.pdf',
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        showToast('📄 PDF তৈরি হচ্ছে...', 'success');
        html2pdf().set(opt).from(content).save()
            .then(function() {
                showToast('✅ PDF ডাউনলোড হয়েছে!', 'success');
            })
            .catch(function(error) {
                console.error('❌ PDF তৈরি করতে সমস্যা:', error);
                showToast('❌ PDF তৈরি করতে সমস্যা!', 'error');
            });
    }

    // ============================================================
    // 12. CSV ডাউনলোড
    // ============================================================
    function downloadCSV(element, title) {
        var tables = element.querySelectorAll('table');
        if (tables.length === 0) {
            showToast('❌ CSV ডাটা পাওয়া যায়নি!', 'error');
            return;
        }

        var csv = '';
        tables.forEach(function(table) {
            var rows = table.querySelectorAll('tr');
            rows.forEach(function(row) {
                var cols = row.querySelectorAll('th, td');
                var rowData = [];
                cols.forEach(function(col) {
                    rowData.push('"' + col.textContent.trim() + '"');
                });
                csv += rowData.join(',') + '\n';
            });
        });

        var blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = title + '.csv';
        link.click();
        URL.revokeObjectURL(link.href);

        showToast('✅ CSV ডাউনলোড হয়েছে!', 'success');
    }

    // ============================================================
    // 13. ইনিশিয়াল
    // ============================================================
    setTimeout(initFirebase, 1000);
    console.log('📄 রিপোর্ট জেনারেট পেজ লোড হয়েছে!');

})();