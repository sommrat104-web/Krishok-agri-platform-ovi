/**
 * ============================================
 * অর্ডার পেজ - JavaScript
 * ফাইল: js/order.js
 * ============================================
 */

(function() {
    'use strict';

    // ===== DOM এলিমেন্ট =====
    var summaryItems = document.getElementById('summaryItems');
    var orderForm = document.getElementById('orderForm');
    var fullName = document.getElementById('fullName');
    var phone = document.getElementById('phone');
    var address = document.getElementById('address');
    var deliveryTime = document.getElementById('deliveryTime');
    var instructions = document.getElementById('instructions');
    var placeOrderBtn = document.getElementById('placeOrderBtn');
    var confirmationModal = document.getElementById('confirmationModal');
    var modalContinueBtn = document.getElementById('modalContinueBtn');

    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var currentUser = null;

    // ============================================================
    // 1. অর্ডার সারাংশ রেন্ডার
    // ============================================================
    function renderSummary() {
        if (cart.length === 0) {
            summaryItems.innerHTML = `
                <div class="empty-cart-msg">
                    <i class="fas fa-shopping-cart"></i>
                    <p>কার্ট খালি</p>
                    <a href="shop.html" class="btn btn-primary btn-sm" style="margin-top:8px;">পণ্য যোগ করুন</a>
                </div>
            `;
            placeOrderBtn.disabled = true;
            return;
        }

        placeOrderBtn.disabled = false;

        var html = '';
        var total = 0;

        cart.forEach(function(item) {
            total += item.price;
            html += `
                <div class="summary-item">
                    <span class="name">${item.name} (${item.unit})</span>
                    <span class="price"><i class="fas fa-taka-sign"></i> ${item.price}</span>
                </div>
            `;
        });

        html += `
            <div class="summary-total">
                <span>মোট</span>
                <span><i class="fas fa-taka-sign"></i> ${total}</span>
            </div>
        `;

        summaryItems.innerHTML = html;
    }

    // ============================================================
    // 2. ফর্ম সাবমিট
    // ============================================================
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // ভালিডেশন
        var name = fullName.value.trim();
        var phoneVal = phone.value.trim();
        var addressVal = address.value.trim();

        if (!name) {
            showToast('❌ দয়া করে আপনার নাম দিন!', 'error');
            return;
        }
        if (!phoneVal || phoneVal.length < 11) {
            showToast('❌ সঠিক মোবাইল নম্বর দিন!', 'error');
            return;
        }
        if (!addressVal) {
            showToast('❌ দয়া করে আপনার ঠিকানা দিন!', 'error');
            return;
        }

        if (cart.length === 0) {
            showToast('❌ কার্ট খালি! পণ্য যোগ করুন।', 'error');
            return;
        }

        // অর্ডার ডাটা তৈরি
        var orderData = {
            name: name,
            phone: phoneVal,
            address: addressVal,
            deliveryTime: deliveryTime.value,
            instructions: instructions.value.trim() || 'কোনো নির্দেশনা নেই',
            items: cart.map(function(item) {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    unit: item.unit,
                    image: item.image || '🌾'
                };
            }),
            total: cart.reduce(function(sum, item) { return sum + item.price; }, 0),
            status: 'pending',
            orderDate: new Date().toLocaleString('bn-BD'),
            timestamp: Date.now(),
            userId: currentUser ? currentUser.uid : 'guest'
        };

        // Firebase-এ সেভ
        if (window.database) {
            window.database.ref('orders').push(orderData)
                .then(function() {
                    showToast('✅ অর্ডার সম্পন্ন হয়েছে!', 'success');
                    // কার্ট ক্লিয়ার
                    localStorage.removeItem('cart');
                    cart = [];
                    renderSummary();
                    // কনফার্মেশন মডাল দেখাও
                    confirmationModal.classList.add('show');
                    // ফর্ম রিসেট
                    orderForm.reset();
                })
                .catch(function(error) {
                    console.error('অর্ডার সেভ করতে সমস্যা:', error);
                    showToast('❌ অর্ডার সম্পন্ন করতে সমস্যা!', 'error');
                });
        } else {
            // ডেমো মোড
            console.log('📋 অর্ডার ডাটা:', orderData);
            showToast('✅ ডেমো: অর্ডার সম্পন্ন হয়েছে!', 'success');
            localStorage.removeItem('cart');
            cart = [];
            renderSummary();
            confirmationModal.classList.add('show');
            orderForm.reset();
        }
    });

    // ============================================================
    // 3. মডাল বন্ধ
    // ============================================================
    function closeModal() {
        confirmationModal.classList.remove('show');
        window.location.href = 'shop.html';
    }

    modalContinueBtn.addEventListener('click', closeModal);

    confirmationModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // ============================================================
    // 4. ইউজার চেক
    // ============================================================
    function checkUser() {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    currentUser = user;
                    console.log('👤 ইউজার:', user.displayName || user.email);
                } else {
                    currentUser = null;
                    console.log('👤 ইউজার লগইন নেই');
                }
            });
        }
    }

    // ============================================================
    // 5. ইনিশিয়াল
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        renderSummary();
        checkUser();
        console.log('📋 অর্ডার পেজ লোড হয়েছে!');
        console.log('🛒 কার্টে পণ্য:', cart.length);
    });

})();


// অর্ডার সম্পন্ন হলে
function placeOrder(orderId, total) {
    // ... অর্ডার লজিক
    trackOrder(orderId, total);
}