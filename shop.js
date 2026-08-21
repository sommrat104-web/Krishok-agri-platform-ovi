/**
 * ============================================
 * ই-কমার্স - JavaScript
 * ফাইল: js/shop.js
 * ============================================
 */

(function() {
    'use strict';

    // ============================================================
    // 1. পণ্য ডাটাবেস
    // ============================================================
    var products = [
        // ===== শাকসবজি =====
        { id: 1, name: 'টমেটো', category: 'শাকসবজি', emoji: '🍅', price: 80, unit: 'কেজি', district: 'ঢাকা', farmer: 'জন কৃষক', description: 'তাজা ও রসালো টমেটো।', image: '🍅' },
        { id: 2, name: 'আলু', category: 'শাকসবজি', emoji: '🥔', price: 35, unit: 'কেজি', district: 'রংপুর', farmer: 'আব্দুল্লাহ', description: 'উচ্চ মানের আলু।', image: '🥔' },
        { id: 3, name: 'বেগুন', category: 'শাকসবজি', emoji: '🍆', price: 50, unit: 'কেজি', district: 'কুমিল্লা', farmer: 'ফাতেমা', description: 'তাজা বেগুন।', image: '🍆' },
        { id: 4, name: 'শসা', category: 'শাকসবজি', emoji: '🥒', price: 40, unit: 'কেজি', district: 'যশোর', farmer: 'রফিক', description: 'ক্রিস্পি শসা।', image: '🥒' },
        { id: 5, name: 'করলা', category: 'শাকসবজি', emoji: '🥒', price: 60, unit: 'কেজি', district: 'নাটোর', farmer: 'সুমাইয়া', description: 'তাজা করলা।', image: '🥒' },
        
        // ===== ফল =====
        { id: 6, name: 'আম', category: 'ফল', emoji: '🥭', price: 150, unit: 'কেজি', district: 'রাজশাহী', farmer: 'কামাল', description: 'রসালো আম।', image: '🥭' },
        { id: 7, name: 'কাঁঠাল', category: 'ফল', emoji: '🍈', price: 100, unit: 'কেজি', district: 'ঢাকা', farmer: 'নাসরিন', description: 'পাকা কাঁঠাল।', image: '🍈' },
        { id: 8, name: 'লিচু', category: 'ফল', emoji: '🍇', price: 200, unit: 'কেজি', district: 'ঢাকা', farmer: 'আব্দুল্লাহ', description: 'মিষ্টি লিচু।', image: '🍇' },
        { id: 9, name: 'ডালিম', category: 'ফল', emoji: '🍎', price: 180, unit: 'কেজি', district: 'ঢাকা', farmer: 'ফাতেমা', description: 'তাজা ডালিম।', image: '🍎' },
        { id: 10, name: 'পেঁপে', category: 'ফল', emoji: '🥭', price: 50, unit: 'কেজি', district: 'ঢাকা', farmer: 'রফিক', description: 'পাকা পেঁপে।', image: '🥭' },
        
        // ===== ডাল =====
        { id: 11, name: 'মুগডাল', category: 'ডাল', emoji: '🌱', price: 120, unit: 'কেজি', district: 'ঢাকা', farmer: 'সুমাইয়া', description: 'উচ্চ মানের মুগডাল।', image: '🌱' },
        { id: 12, name: 'মসুরডাল', category: 'ডাল', emoji: '🌱', price: 130, unit: 'কেজি', district: 'রাজশাহী', farmer: 'কামাল', description: 'তাজা মসুরডাল।', image: '🌱' },
        
        // ===== মসলা =====
        { id: 13, name: 'পেঁয়াজ', category: 'মসলা', emoji: '🧅', price: 65, unit: 'কেজি', district: 'রাজশাহী', farmer: 'নাসরিন', description: 'তাজা পেঁয়াজ।', image: '🧅' },
        { id: 14, name: 'কাঁচামরিচ', category: 'মসলা', emoji: '🌶️', price: 120, unit: 'কেজি', district: 'চট্টগ্রাম', farmer: 'আব্দুল্লাহ', description: 'ঝাল কাঁচামরিচ।', image: '🌶️' },
        { id: 15, name: 'রসুন', category: 'মসলা', emoji: '🧄', price: 150, unit: 'কেজি', district: 'কুষ্টিয়া', farmer: 'ফাতেমা', description: 'উচ্চ মানের রসুন।', image: '🧄' },
        
        // ===== ধান =====
        { id: 16, name: 'ধান (ব্রি-৪৯)', category: 'ধান', emoji: '🌾', price: 35, unit: 'কেজি', district: 'বগুড়া', farmer: 'রফিক', description: 'উচ্চ ফলনশীল ধান।', image: '🌾' },
        { id: 17, name: 'ধান (ব্রি-৫১)', category: 'ধান', emoji: '🌾', price: 38, unit: 'কেজি', district: 'রংপুর', farmer: 'সুমাইয়া', description: 'রোগ প্রতিরোধী ধান।', image: '🌾' }
    ];

    // ============================================================
    // 2. জেলা লিস্ট
    // ============================================================
    var districts = [
        'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল',
        'সিলেট', 'রংপুর', 'ময়মনসিংহ', 'বগুড়া', 'কুমিল্লা',
        'যশোর', 'নাটোর', 'কুষ্টিয়া', 'দিনাজপুর', 'পাবনা'
    ];

    // ============================================================
    // 3. DOM এলিমেন্ট
    // ============================================================
    var productGrid = document.getElementById('productGrid');
    var filterCategory = document.getElementById('filterCategory');
    var filterDistrict = document.getElementById('filterDistrict');
    var filterSearch = document.getElementById('filterSearch');
    var cartCount = document.getElementById('cartCount');
    var noProducts = document.getElementById('noProducts');

    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // ============================================================
    // 4. জেলা ফিল্টার লোড
    // ============================================================
    function loadDistricts() {
        districts.forEach(function(d) {
            var opt = document.createElement('option');
            opt.value = d;
            opt.textContent = d;
            filterDistrict.appendChild(opt);
        });
    }
    loadDistricts();

    // ============================================================
    // 5. পণ্য রেন্ডার
    // ============================================================
    function renderProducts(productsToRender) {
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '';
            noProducts.style.display = 'block';
            return;
        }
        noProducts.style.display = 'none';

        var html = '';
        productsToRender.forEach(function(p) {
            var inCart = cart.some(function(c) { return c.id === p.id; });
            html += `
                <div class="product-card">
                    <div class="product-image">${p.image}</div>
                    <div class="product-body">
                        <div class="product-name">${p.name}</div>
                        <div class="product-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${p.district}</span>
                            <span><i class="fas fa-tag"></i> ${p.category}</span>
                            <span><i class="fas fa-user"></i> ${p.farmer}</span>
                        </div>
                        <div class="product-price"><i class="fas fa-taka-sign"></i> ${p.price} /${p.unit}</div>
                        <div class="product-desc">${p.description}</div>
                        <div class="product-actions">
                            <button class="btn-add ${inCart ? 'added' : ''}" data-id="${p.id}">
                                ${inCart ? '<i class="fas fa-check"></i> যোগ করা হয়েছে' : '<i class="fas fa-cart-plus"></i> কার্টে যোগ করুন'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        productGrid.innerHTML = html;

        // ইভেন্ট লিসেনার
        document.querySelectorAll('.btn-add').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = parseInt(this.getAttribute('data-id'));
                toggleCart(id);
            });
        });

        updateCartCount();
    }

    // ============================================================
    // 6. ফিল্টার ফাংশন
    // ============================================================
    function filterProducts() {
        var category = filterCategory.value;
        var district = filterDistrict.value;
        var search = filterSearch.value.toLowerCase().trim();

        var filtered = products;

        if (category !== 'all') {
            filtered = filtered.filter(function(p) { return p.category === category; });
        }
        if (district !== 'all') {
            filtered = filtered.filter(function(p) { return p.district === district; });
        }
        if (search !== '') {
            filtered = filtered.filter(function(p) {
                return p.name.toLowerCase().includes(search) ||
                       p.description.toLowerCase().includes(search) ||
                       p.farmer.toLowerCase().includes(search);
            });
        }

        renderProducts(filtered);
    }

    // ============================================================
    // 7. কার্ট ফাংশন
    // ============================================================
    function toggleCart(id) {
        var index = cart.findIndex(function(c) { return c.id === id; });
        if (index > -1) {
            cart.splice(index, 1);
            showToast('🗑️ পণ্য কার্ট থেকে সরানো হয়েছে', 'error');
        } else {
            var product = products.find(function(p) { return p.id === id; });
            if (product) {
                cart.push({ id: product.id, name: product.name, price: product.price, unit: product.unit, image: product.image });
                showToast('✅ ' + product.name + ' কার্টে যোগ করা হয়েছে!', 'success');
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        filterProducts(); // রিফ্রেশ
    }

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // ============================================================
    // 8. ইভেন্ট লিসেনার
    // ============================================================
    filterCategory.addEventListener('change', filterProducts);
    filterDistrict.addEventListener('change', filterProducts);
    filterSearch.addEventListener('keyup', filterProducts);

    // ============================================================
    // 9. ইনিশিয়াল
    // ============================================================
    renderProducts(products);
    updateCartCount();
    console.log('🛒 ই-কমার্স পেজ লোড হয়েছে!');
    console.log('📦 মোট পণ্য:', products.length);

})();

// কার্টে যোগ করলে
function addToCart(product) {
    // ... কার্ট লজিক
    trackCartAction('যোগ করা হয়েছে', product.name);
}