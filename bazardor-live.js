/**
 * ============================================
 * লাইভ বাজারদর - JavaScript
 * ফাইল: js/bazardor-live.js
 * ============================================
 */

(function() {
  'use strict';

  // ===== DOM Elements =====
  const cropGrid = document.getElementById('cropGrid');
  const searchInput = document.getElementById('searchInput');
  const noResult = document.getElementById('noResult');
  const searchTerm = document.getElementById('searchTerm');
  const adminSection = document.getElementById('adminSection');
  const cropSelect = document.getElementById('cropSelect');
  const priceInput = document.getElementById('priceInput');
  const changeSelect = document.getElementById('changeSelect');
  const updateBtn = document.getElementById('updateBtn');

  // ===== Default Data (যদি Firebase না থাকে) =====
  const defaultData = {
    'ধান': { price: 35, change: '+২%', updatedAt: new Date().toLocaleString('bn-BD') },
    'টমেটো': { price: 80, change: '+৫%', updatedAt: new Date().toLocaleString('bn-BD') },
    'পেঁয়াজ': { price: 55, change: '-৩%', updatedAt: new Date().toLocaleString('bn-BD') },
    'আলু': { price: 28, change: '-৪%', updatedAt: new Date().toLocaleString('bn-BD') },
    'কাঁচামরিচ': { price: 120, change: '+৮%', updatedAt: new Date().toLocaleString('bn-BD') },
    'গম': { price: 38, change: 'স্থিতিশীল', updatedAt: new Date().toLocaleString('bn-BD') }
  };

  // ===== Firebase Check =====
  let database = null;
  let isAdmin = false;

  // ===== অ্যাডমিন চেক =====
  function checkAdmin() {
    // অ্যাডমিন চেক করা (সাধারণত Firebase Auth দিয়ে)
    // এখন ডামি চেক (কোন ইউজার অ্যাডমিন কিনা)
    const user = firebase.auth().currentUser;
    if (user && user.email === 'admin@krishisahayata.com') {
      isAdmin = true;
      adminSection.style.display = 'block';
    } else {
      isAdmin = false;
      adminSection.style.display = 'none';
    }
  }

  // ============================================
  // ১. ডাটা লোড
  // ============================================

  function loadData() {
    // Firebase চেক
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
      database = firebase.database();
      console.log('✅ Firebase Realtime Database সংযুক্ত');

      // রিয়েল-টাইম লিসেনার
      database.ref('market-prices').on('value', function(snapshot) {
        const data = snapshot.val();
        if (data) {
          renderMarket(data);
        } else {
          // Firebase-এ ডাটা না থাকলে ডিফল্ট সেট
          setDefaultData();
        }
      });

    } else {
      console.log('⚠️ Firebase পাওয়া যায়নি, ডিফল্ট ডাটা ব্যবহার করা হচ্ছে');
      renderMarket(defaultData);
    }
  }

  // ===== ডিফল্ট ডাটা সেট =====
  function setDefaultData() {
    if (database) {
      database.ref('market-prices').set(defaultData);
    }
    renderMarket(defaultData);
  }

  // ============================================
  // ২. রেন্ডার
  // ============================================

  function renderMarket(data) {
    if (!data || Object.keys(data).length === 0) {
      cropGrid.innerHTML = `
        <div style="text-align:center; padding:40px; color:var(--gray);">
          <i class="fas fa-database" style="font-size:3rem; display:block; margin-bottom:10px;"></i>
          কোনো বাজারদর পাওয়া যায়নি
        </div>
      `;
      return;
    }

    let html = '';
    const cropNames = Object.keys(data);

    cropNames.forEach(function(crop) {
      const item = data[crop];
      const changeClass = item.change.includes('+') ? 'up' :
                          item.change.includes('-') ? 'down' : 'stable';
      const changeIcon = changeClass === 'up' ? '▲' :
                         changeClass === 'down' ? '▼' : '―';

      html += `
        <div class="crop-item" data-name="${crop}">
          <div class="crop-header">
            <div>
              <div class="crop-name">
                <i class="fas fa-seedling"></i> ${crop}
              </div>
            </div>
            <div>
              <span class="crop-price"><i class="fas fa-taka-sign"></i> ${item.price}</span>
              <span class="crop-change ${changeClass}">${changeIcon} ${item.change}</span>
            </div>
          </div>
          <div class="crop-time">
            <i class="fas fa-clock"></i> সর্বশেষ আপডেট: ${item.updatedAt || 'এখন'}
          </div>
        </div>
      `;
    });

    cropGrid.innerHTML = html;

    // সার্চ ফিল্টার
    filterCrops();
  }

  // ============================================
  // ৩. সার্চ
  // ============================================

  function filterCrops() {
    const query = searchInput.value.toLowerCase().trim();

    const items = cropGrid.querySelectorAll('.crop-item');
    let found = false;

    items.forEach(function(item) {
      const name = item.getAttribute('data-name').toLowerCase();
      if (query === '' || name.includes(query)) {
        item.style.display = 'block';
        found = true;
      } else {
        item.style.display = 'none';
      }
    });

    if (!found && items.length > 0) {
      noResult.style.display = 'block';
      searchTerm.textContent = query;
    } else {
      noResult.style.display = 'none';
    }
  }

  searchInput.addEventListener('keyup', filterCrops);

  // ============================================
  // ৪. অ্যাডমিন আপডেট
  // ============================================

  updateBtn.addEventListener('click', function() {
    if (!database) {
      showToast('❌ Firebase সংযোগ নেই!', 'error');
      return;
    }

    const crop = cropSelect.value;
    const price = parseInt(priceInput.value);
    const changeType = changeSelect.value;

    if (!price || price <= 0) {
      showToast('❌ সঠিক দাম দিন!', 'error');
      return;
    }

    let change = '';
    if (changeType === '+%') {
      change = '+' + Math.floor(Math.random() * 10 + 1) + '%';
    } else if (changeType === '-%') {
      change = '-' + Math.floor(Math.random() * 10 + 1) + '%';
    } else {
      change = 'স্থিতিশীল';
    }

    const updatedAt = new Date().toLocaleString('bn-BD');

    // Firebase আপডেট
    database.ref('market-prices/' + crop).update({
      price: price,
      change: change,
      updatedAt: updatedAt
    })
    .then(function() {
      showToast('✅ ' + crop + ' এর বাজারদর আপডেট করা হয়েছে!', 'success');
      priceInput.value = '';
    })
    .catch(function(error) {
      console.error('❌ আপডেট করতে সমস্যা:', error);
      showToast('❌ আপডেট করতে সমস্যা!', 'error');
    });
  });

  // ============================================
  // ৫. ইনিশিয়ালাইজ
  // ============================================

  // Firebase Auth স্টেট চেক
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged(function(user) {
      checkAdmin();
    });
  }

  // ডাটা লোড
  setTimeout(function() {
    loadData();
  }, 1000);

  console.log('📊 লাইভ বাজারদর সিস্টেম রেডি!');

})();