// ============================================================
// Google Login
// ============================================================
document.getElementById('googleBtn').addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            showToast('✅ Google লগইন সফল!', 'success');
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1500);
        })
        .catch(function(error) {
            showToast('❌ Google লগইন失败: ' + error.message, 'error');
        });
});

// ============================================================
// Facebook Login
// ============================================================
document.getElementById('facebookBtn').addEventListener('click', function() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            showToast('✅ Facebook লগইন সফল!', 'success');
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1500);
        })
        .catch(function(error) {
            showToast('❌ Facebook লগইন失败: ' + error.message, 'error');
        });
});