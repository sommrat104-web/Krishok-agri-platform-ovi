/**
 * ============================================
 * অ্যাডমিন ব্যাকআপ - JavaScript
 * ফাইল: js/admin-backup.js
 * ============================================
 */

(function() {
    'use strict';

    var backupList = document.getElementById('backupList');
    var backupNowBtn = document.getElementById('backupNow');
    var restoreBtn = document.getElementById('restoreBtn');
    var restoreFile = document.getElementById('restoreFile');
    var autoBackupInterval = document.getElementById('autoBackupInterval');
    var saveAutoBackup = document.getElementById('saveAutoBackup');

    var database = null;

    // ============================================================
    // 1. Firebase চেক
    // ============================================================
    function initFirebase() {
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            database = firebase.database();
            console.log('✅ Firebase সংযুক্ত');
            loadBackupList();
            loadAutoBackupSetting();
        } else {
            console.warn('⚠️ Firebase পাওয়া যায়নি');
            showDemoBackups();
        }
    }

    // ============================================================
    // 2. ব্যাকআপ তালিকা লোড
    // ============================================================
    function loadBackupList() {
        if (!database) {
            showDemoBackups();
            return;
        }

        database.ref('backups').orderByChild('timestamp').limitToLast(20).on('value', function(snapshot) {
            var data = snapshot.val();
            if (data) {
                renderBackupList(data);
            } else {
                showEmptyState();
            }
        });
    }

    function renderBackupList(data) {
        var keys = Object.keys(data).reverse();
        if (keys.length === 0) {
            showEmptyState();
            return;
        }

        var html = '<div class="backup-list">';
        keys.forEach(function(key) {
            var backup = data[key];
            html += `
                <div class="backup-item" data-id="${key}">
                    <div class="info">
                        <div class="name">📦 ব্যাকআপ #${backup.id || key.substring(0, 8)}</div>
                        <div class="date"><i class="fas fa-clock"></i> ${backup.date || 'এখন'}</div>
                        <div style="font-size:0.8rem; color:var(--gray);">${backup.size || '0 KB'}</div>
                    </div>
                    <div class="actions">
                        <button class="btn-download" onclick="downloadBackup('${key}')"><i class="fas fa-download"></i></button>
                        <button class="btn-delete" onclick="deleteBackup('${key}')"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        backupList.innerHTML = html;
    }

    function showEmptyState() {
        backupList.innerHTML = `
            <div class="no-backup">
                <i class="fas fa-database"></i>
                <h3>কোনো ব্যাকআপ নেই</h3>
                <p>"এখন ব্যাকআপ নিন" বাটনে ক্লিক করে প্রথম ব্যাকআপ তৈরি করুন।</p>
            </div>
        `;
    }

    function showDemoBackups() {
        backupList.innerHTML = `
            <div class="backup-list">
                <div class="backup-item">
                    <div class="info">
                        <div class="name">📦 ব্যাকআপ #demo-1</div>
                        <div class="date"><i class="fas fa-clock"></i> আজ ১০:৩০ AM</div>
                        <div style="font-size:0.8rem; color:var(--gray);">২.৪ KB</div>
                    </div>
                    <div class="actions">
                        <button class="btn-download"><i class="fas fa-download"></i></button>
                        <button class="btn-delete"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <div class="backup-item">
                    <div class="info">
                        <div class="name">📦 ব্যাকআপ #demo-2</div>
                        <div class="date"><i class="fas fa-clock"></i> গতকাল ০৮:১৫ PM</div>
                        <div style="font-size:0.8rem; color:var(--gray);">১.৮ KB</div>
                    </div>
                    <div class="actions">
                        <button class="btn-download"><i class="fas fa-download"></i></button>
                        <button class="btn-delete"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // 3. ব্যাকআপ নেওয়া
    // ============================================================
    backupNowBtn.addEventListener('click', function() {
        if (!database) {
            showToast('⚠️ Firebase সংযোগ নেই!', 'error');
            return;
        }

        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ব্যাকআপ নেওয়া হচ্ছে...';

        // সমস্ত ডাটা সংগ্রহ
        database.ref().once('value')
            .then(function(snapshot) {
                var data = snapshot.val();
                var backupData = {
                    id: 'backup_' + Date.now(),
                    data: data,
                    date: new Date().toLocaleString('bn-BD'),
                    timestamp: Date.now(),
                    size: (JSON.stringify(data).length / 1024).toFixed(2) + ' KB'
                };

                return database.ref('backups/' + backupData.id).set(backupData);
            })
            .then(function() {
                showToast('✅ ব্যাকআপ সফল!', 'success');
                backupNowBtn.disabled = false;
                backupNowBtn.innerHTML = '<i class="fas fa-download"></i> এখন ব্যাকআপ নিন';
                loadBackupList();
            })
            .catch(function(error) {
                console.error('❌ ব্যাকআপ নিতে সমস্যা:', error);
                showToast('❌ ব্যাকআপ নিতে সমস্যা!', 'error');
                backupNowBtn.disabled = false;
                backupNowBtn.innerHTML = '<i class="fas fa-download"></i> এখন ব্যাকআপ নিন';
            });
    });

    // ============================================================
    // 4. ব্যাকআপ ডাউনলোড
    // ============================================================
    window.downloadBackup = function(key) {
        if (!database) {
            showToast('⚠️ Firebase সংযোগ নেই!', 'error');
            return;
        }

        database.ref('backups/' + key).once('value')
            .then(function(snapshot) {
                var data = snapshot.val();
                if (!data) {
                    showToast('❌ ব্যাকআপ খুঁজে পাওয়া যায়নি!', 'error');
                    return;
                }

                var json = JSON.stringify(data, null, 2);
                var blob = new Blob([json], { type: 'application/json' });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'backup_' + key + '.json';
                a.click();
                URL.revokeObjectURL(url);
                showToast('✅ ব্যাকআপ ডাউনলোড হচ্ছে...', 'success');
            })
            .catch(function(error) {
                console.error('❌ ডাউনলোড করতে সমস্যা:', error);
                showToast('❌ ডাউনলোড করতে সমস্যা!', 'error');
            });
    };

    // ============================================================
    // 5. ব্যাকআপ ডিলিট
    // ============================================================
    window.deleteBackup = function(key) {
        if (!confirm('এই ব্যাকআপ ডিলিট করতে চান?')) return;

        if (!database) {
            showToast('⚠️ Firebase সংযোগ নেই!', 'error');
            return;
        }

        database.ref('backups/' + key).remove()
            .then(function() {
                showToast('🗑️ ব্যাকআপ ডিলিট করা হয়েছে!', 'success');
                loadBackupList();
            })
            .catch(function(error) {
                console.error('❌ ডিলিট করতে সমস্যা:', error);
                showToast('❌ ডিলিট করতে সমস্যা!', 'error');
            });
    };

    // ============================================================
    // 6. রিস্টোর
    // ============================================================
    restoreBtn.addEventListener('click', function() {
        var file = restoreFile.files[0];
        if (!file) {
            showToast('❌ দয়া করে একটি JSON ফাইল সিলেক্ট করুন!', 'error');
            return;
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            try {
                var data = JSON.parse(e.target.result);
                if (!data.data) {
                    showToast('❌ ভুল ফাইল ফরম্যাট!', 'error');
                    return;
                }

                if (!confirm('এটি সমস্ত ডাটা ওভাররাইট করবে। চালিয়ে যেতে চান?')) return;

                if (database) {
                    database.ref().set(data.data)
                        .then(function() {
                            showToast('✅ ডাটাবেস রিস্টোর করা হয়েছে!', 'success');
                            restoreFile.value = '';
                        })
                        .catch(function(error) {
                            console.error('❌ রিস্টোর করতে সমস্যা:', error);
                            showToast('❌ রিস্টোর করতে সমস্যা!', 'error');
                        });
                } else {
                    showToast('⚠️ Firebase সংযোগ নেই!', 'error');
                }
            } catch (error) {
                showToast('❌ ভুল JSON ফাইল!', 'error');
            }
        };
        reader.readAsText(file);
    });

    // ============================================================
    // 7. অটো ব্যাকআপ সেটিংস
    // ============================================================
    function loadAutoBackupSetting() {
        var saved = localStorage.getItem('autoBackupInterval');
        if (saved) {
            autoBackupInterval.value = saved;
        }
    }

    saveAutoBackup.addEventListener('click', function() {
        var interval = autoBackupInterval.value;
        localStorage.setItem('autoBackupInterval', interval);
        
        if (interval !== 'disabled') {
            scheduleAutoBackup(interval);
        } else {
            clearAutoBackup();
        }
        showToast('✅ অটো ব্যাকআপ সেটিংস সেভ করা হয়েছে!', 'success');
    });

    function scheduleAutoBackup(interval) {
        var timeMap = {
            'daily': 24 * 60 * 60 * 1000,
            'weekly': 7 * 24 * 60 * 60 * 1000,
            'monthly': 30 * 24 * 60 * 60 * 1000
        };

        clearAutoBackup();

        if (timeMap[interval]) {
            window._backupTimer = setInterval(function() {
                backupNowBtn.click();
                console.log('🔄 অটো ব্যাকআপ নেওয়া হয়েছে:', new Date().toLocaleString());
            }, timeMap[interval]);
        }
    }

    function clearAutoBackup() {
        if (window._backupTimer) {
            clearInterval(window._backupTimer);
            window._backupTimer = null;
        }
    }

    // ============================================================
    // 8. ইনিশিয়াল
    // ============================================================
    setTimeout(initFirebase, 1000);
    console.log('💾 ব্যাকআপ সিস্টেম লোড হয়েছে!');

})();