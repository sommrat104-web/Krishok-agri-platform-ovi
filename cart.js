/**
 * ============================================
 * কার্ট পেজ - JavaScript
 * ফাইল: js/cart.js
 * ============================================
 */

(function() {
    'use strict';

    var cartItems = document.getElementById('cartItems');
    var cartTotal = document.getElementById('cartTotal');
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart"></i><h3>কার্ট খালি</h3><p>কোনো পণ্য যোগ করা হয়নি</p></div>';
            cartTotal.innerHTML = '';
            return;
        }

        var html = '';
        var total = 0;
        cart.forEach(function(item, index) {
            total += item.price;
            html += `
                <div class="cart-item">
                    <div class="item-image">${item.image || '🌾'}</div>
                    <div class="item-info">
                        <div class="name">${item.name}</div>
                        <div class="price"><i class="fas fa-taka-sign"></i> ${item.price} /${item.unit}</div>
                    </div>
                    <button class="btn-remove" data-index="${index}"><i class="fas fa-trash"></i> রিমুভ</button>
                </div>
            `;
        });
        cartItems.innerHTML = html;

        cartTotal.innerHTML = `
            <div class="cart-total">
                <div>
                    <strong>মোট:</strong>
                    <span class="total-amount"><i class="fas fa-taka-sign"></i> ${total}</span>
                </div>
                <div>
                    <button class="btn-order" id="orderBtn"><i class="fas fa-check"></i> অর্ডার করুন</button>
                </div>
            </div>
        `;

        document.querySelectorAll('.btn-remove').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                showToast('🗑️ পণ্য রিমুভ করা হয়েছে', 'error');
            });
        });

        var orderBtn = document.getElementById('orderBtn');
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                if (cart.length === 0) {
                    showToast('❌ কার্ট খালি!', 'error');
                    return;
                }
                showToast('✅ অর্ডার সম্পন্ন হয়েছে! ধন্যবাদ!', 'success');
                localStorage.removeItem('cart');
                cart = [];
                renderCart();
            });
        }
    }

    renderCart();
    console.log('🛒 কার্ট পেজ লোড হয়েছে!');
})();