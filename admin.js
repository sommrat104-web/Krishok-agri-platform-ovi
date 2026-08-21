/**
 * ============================================
 * অ্যাডমিন প্যানেল - JavaScript
 * ফাইল: js/admin.js
 * ============================================
 */

(function() {
    'use strict';

    var adminContent = document.getElementById('adminContent');
    var navItems = document.querySelectorAll('.admin-sidebar .nav-list li');
    var currentUser = null;
    var database = null;

    // ============================================================
    // 1. Firebase চেক
    // ============================================================
    function initFirebase() {
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            database = firebase.database();
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    currentUser = user;
                    console.log('👤 অ্যাডমিন:', user.email);
                } else {
                    window.location.href = 'login.html';
                }
            });
            loadDashboard();
        } else {
            console.warn('⚠️ Firebase পাওয়া যায়নি');
            loadDashboard();
        }
    }

    // ============================================================
    // 2. ড্যাশবোর্ড
    // ============================================================
    function loadDashboard() {
        var html = `
            <div class="page-title"><i class="fas fa-chart-pie"></i> ড্যাশবোর্ড</div>
            <div class="stats-grid">
                <div class="stat-card"><div class="number" id="totalUsers">০</div><div class="label">মোট ইউজার</div></div>
                <div class="stat-card"><div class="number" id="totalOrders">০</div><div class="label">মোট অর্ডার</div></div>
                <div class="stat-card"><div class="number" id="totalCrops">১৭</div><div class="label">মোট ফসল</div></div>
                <div class="stat-card"><div class="number" id="totalEquipment">১২</div><div class="label">যন্ত্রপাতি</div></div>
            </div>
            <div style="background:var(--bg); padding:16px; border-radius:var(--radius);">
                <h4 style="color:var(--primary);"><i class="fas fa-clock"></i> সাম্প্রতিক কার্যক্রম</h4>
                <ul style="list-style:none; padding:0; margin-top:10px;">
                    <li style="padding:6px 0; border-bottom:1px solid #eef5ee;">✅ নতুন ইউজার রেজিস্টার করেছেন: জন কৃষক</li>
                    <li style="padding:6px 0; border-bottom:1px solid #eef5ee;">📦 নতুন অর্ডার এসেছে: #ORD-001</li>
                    <li style="padding:6px 0;">📊 বাজারদর আপডেট করা হয়েছে: ধান, টমেটো</li>
                </ul>
            </div>
        `;
        adminContent.innerHTML = html;

        // স্ট্যাটস লোড
        loadStats();
    }

    // ============================================================
    // 3. স্ট্যাটস লোড
    // ============================================================
    function loadStats() {
        if (!database) {
            document.getElementById('totalUsers').textContent = '৫০+';
            document.getElementById('totalOrders').textContent = '২৫';
            return;
        }

        // ইউজার কাউন্ট
        database.ref('users').once('value', function(snapshot) {
            var data = snapshot.val();
            var count = data ? Object.keys(data).length : 0;
            document.getElementById('totalUsers').textContent = count;
        });

        // অর্ডার কাউন্ট
        database.ref('orders').once('value', function(snapshot) {
            var data = snapshot.val();
            var count = data ? Object.keys(data).length : 0;
            document.getElementById('totalOrders').textContent = count;
        });
    }

    // ============================================================
    // 4. ইউজার লিস্ট
    // ============================================================
    function loadUsers() {
        var html = `
            <div class="page-title"><i class="fas fa-users"></i> ইউজার ব্যবস্থাপনা</div>
            <div class="table-wrap" style="overflow-x:auto;">
                <table class="admin-table">
                    <thead><tr><th>#</th><th>নাম</th><th>ইমেইল</th><th>রোল</th><th>স্ট্যাটাস</th><th>অ্যাকশন</th></tr></thead>
                    <tbody id="usersTableBody">
                        <tr><td colspan="6" style="text-align:center; color:var(--gray);">লোড হচ্ছে...</td></tr>
                    </tbody>
                </table>
            </div>
        `;
        adminContent.innerHTML = html;

        if (database) {
            database.ref('users').once('value', function(snapshot) {
                var data = snapshot.val();
                var tbody = document.getElementById('usersTableBody');
                if (!data) {
                    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--gray);">কোনো ইউজার নেই</td></tr>';
                    return;
                }

                var keys = Object.keys(data);
                var htmlRows = '';
                keys.forEach(function(key, index) {
                    var user = data[key];
                    htmlRows += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${user.fullName || user.name || 'নাম নেই'}</td>
                            <td>${user.email || 'ইমেইল নেই'}</td>
                            <td><span class="badge badge-info">ইউজার</span></td>
                            <td><span class="badge badge-success">সক্রিয়</span></td>
                            <td>
                                <div class="actions">
                                    <button class="edit-btn" onclick="editUser('${key}')"><i class="fas fa-edit"></i></button>
                                    <button class="delete-btn" onclick="deleteUser('${key}')"><i class="fas fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    `;
                });
                tbody.innerHTML = htmlRows;
            });
        }
    }

    // ============================================================
    // 5. অর্ডার লিস্ট
    // ============================================================
    function loadOrders() {
        var html = `
            <div class="page-title"><i class="fas fa-shopping-cart"></i> অর্ডার ব্যবস্থাপনা</div>
            <div class="table-wrap" style="overflow-x:auto;">
                <table class="admin-table">
                    <thead><tr><th>#</th><th>অর্ডার আইডি</th><th>নাম</th><th>মোট</th><th>স্ট্যাটাস</th><th>তারিখ</th><th>অ্যাকশন</th></tr></thead>
                    <tbody id="ordersTableBody">
                        <tr><td colspan="7" style="text-align:center; color:var(--gray);">লোড হচ্ছে...</td></tr>
                    </tbody>
                </table>
            </div>
        `;
        adminContent.innerHTML = html;

        if (database) {
            database.ref('orders').orderByChild('timestamp').limitToLast(20).once('value', function(snapshot) {
                var data = snapshot.val();
                var tbody = document.getElementById('ordersTableBody');
                if (!data) {
                    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--gray);">কোনো অর্ডার নেই</td></tr>';
                    return;
                }

                var keys = Object.keys(data).reverse();
                var htmlRows = '';
                keys.forEach(function(key, index) {
                    var order = data[key];
                    var statusBadge = order.status === 'pending' ? 'badge-warning' :
                                      order.status === 'completed' ? 'badge-success' : 'badge-danger';
                    htmlRows += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>#${key.substring(0, 8)}</td>
                            <td>${order.name || 'নাম নেই'}</td>
                            <td><i class="fas fa-taka-sign"></i> ${order.total || 0}</td>
                            <td><span class="badge ${statusBadge}">${order.status || 'pending'}</span></td>
                            <td>${order.orderDate || 'এখন'}</td>
                            <td>
                                <div class="actions">
                                    <button class="edit-btn" onclick="viewOrder('${key}')"><i class="fas fa-eye"></i></button>
                                    <button class="edit-btn" onclick="updateOrderStatus('${key}')"><i class="fas fa-sync"></i></button>
                                </div>
                            </td>
                        </tr>
                    `;
                });
                tbody.innerHTML = htmlRows;
            });
        }
    }

    // ============================================================
    // 6. ফসল, বাজারদর, যন্ত্রপাতি, সেটিংস
    // ============================================================
    function loadCrops() {
        adminContent.innerHTML = `
            <div class="page-title"><i class="fas fa-seedling"></i> ফসল ব্যবস্থাপনা</div>
            <p style="color:var(--text-light);">ফসলের তালিকা দেখতে <a href="crops.html">crops.html</a>-এ যান।</p>
            <div style="margin-top:12px;">
                <a href="crops.html" class="btn btn-primary"><i class="fas fa-arrow-right"></i> ফসল পেজে যান</a>
            </div>
        `;
    }

    function loadMarket() {
        adminContent.innerHTML = `
            <div class="page-title"><i class="fas fa-tags"></i> বাজারদর ব্যবস্থাপনা</div>
            <p style="color:var(--text-light);">বাজারদর দেখতে <a href="bazardor.html">bazardor.html</a>-এ যান।</p>
            <div style="margin-top:12px;">
                <a href="bazardor.html" class="btn btn-primary"><i class="fas fa-arrow-right"></i> বাজারদর পেজে যান</a>
            </div>
        `;
    }

    function loadEquipment() {
        adminContent.innerHTML = `
            <div class="page-title"><i class="fas fa-tractor"></i> যন্ত্রপাতি ব্যবস্থাপনা</div>
            <p style="color:var(--text-light);">যন্ত্রপাতির তালিকা দেখতে <a href="equipment.html">equipment.html</a>-এ যান।</p>
            <div style="margin-top:12px;">
                <a href="equipment.html" class="btn btn-primary"><i class="fas fa-arrow-right"></i> যন্ত্রপাতি পেজে যান</a>
            </div>
        `;
    }

    function loadSettings() {
        adminContent.innerHTML = `
            <div class="page-title"><i class="fas fa-cog"></i> সেটিংস</div>
            <div style="background:var(--bg); padding:20px; border-radius:var(--radius);">
                <p style="color:var(--text-light);">সেটিংস পেজ শীঘ্রই আসছে...</p>
            </div>
        `;
    }

    // ============================================================
    // 7. গ্লোবাল ফাংশন (অ্যাডমিন অ্যাকশন)
    // ============================================================
    window.editUser = function(key) {
        showToast('✏️ ইউজার এডিট করা হচ্ছে...', 'success');
    };

    window.deleteUser = function(key) {
        if (confirm('এই ইউজার ডিলিট করতে চান?')) {
            if (database) {
                database.ref('users/' + key).remove()
                    .then(function() {
                        showToast('🗑️ ইউজার ডিলিট করা হয়েছে!', 'success');
                        loadUsers();
                    })
                    .catch(function(error) {
                        showToast('❌ ডিলিট করতে সমস্যা!', 'error');
                    });
            }
        }
    };

    window.viewOrder = function(key) {
        showToast('📦 অর্ডার ডিটেইলস দেখানো হচ্ছে...', 'success');
    };

    window.updateOrderStatus = function(key) {
        var status = prompt('স্ট্যাটাস পরিবর্তন করুন (pending/completed/cancelled):');
        if (status && ['pending', 'completed', 'cancelled'].includes(status)) {
            if (database) {
                database.ref('orders/' + key + '/status').set(status)
                    .then(function() {
                        showToast('✅ স্ট্যাটাস আপডেট করা হয়েছে!', 'success');
                        loadOrders();
                    })
                    .catch(function(error) {
                        showToast('❌ আপডেট করতে সমস্যা!', 'error');
                    });
            }
        }
    };

    // ============================================================
    // 8. নেভিগেশন
    // ============================================================
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            navItems.forEach(function(nav) { nav.classList.remove('active'); });
            this.classList.add('active');

            var page = this.getAttribute('data-page');
            switch(page) {
                case 'dashboard': loadDashboard(); break;
                case 'users': loadUsers(); break;
                case 'orders': loadOrders(); break;
                case 'crops': loadCrops(); break;
                case 'market': loadMarket(); break;
                case 'equipment': loadEquipment(); break;
                case 'settings': loadSettings(); break;
                default: loadDashboard();
            }
        });
    });

    // ============================================================
    // 9. ইনিশিয়াল
    // ============================================================
    setTimeout(initFirebase, 1000);
    console.log('🛠️ অ্যাডমিন প্যানেল লোড হয়েছে!');

})();