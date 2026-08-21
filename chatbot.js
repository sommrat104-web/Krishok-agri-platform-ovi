/**
 * ============================================
 * কৃষি চ্যাটবট - JavaScript
 * ফাইল: js/chatbot.js
 * ============================================
 */

(function() {
  'use strict';

  // ===== DOM Elements =====
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const typingIndicator = document.getElementById('typingIndicator');
  const quickBtns = document.querySelectorAll('.quick-btn');

  // ============================================
  // ১. নলেজ বেস (Knowledge Base)
  // ============================================
  const knowledgeBase = [
    // ===== ধান =====
    {
      keywords: ['ধান', 'ধানের চাষ', 'ধান চাষ', 'কিভাবে ধান চাষ করবো'],
      response: '🌾 ধান চাষের পদ্ধতি:\n\n১. জমি তৈরি: ৪-৫ বার চাষ দিয়ে জমি তৈরি করুন\n২. বীজ বপন: আমন (জুন-জুলাই), বোরো (নভেম্বর-ডিসেম্বর)\n৩. সার প্রয়োগ: ইউরিয়া, টিএসপি, এমওপি\n৪. সেচ: ৬-৮ বার সেচ দিন\n৫. রোগ ব্যবস্থাপনা: ব্লাস্ট, লিফ স্পটের জন্য ছত্রাকনাশক ব্যবহার করুন'
    },
    {
      keywords: ['ধান রোগ', 'ধানের রোগ', 'ব্লাস্ট', 'লিফ স্পট'],
      response: '🌾 ধানের প্রধান রোগসমূহ:\n\n🔸 ব্লাস্ট: পাতায় বাদামী দাগ → ট্রাইসাইক্লাজল স্প্রে করুন\n🔸 লিফ স্পট: পাতায় হলুদ দাগ → কার্বেন্ডাজিম স্প্রে করুন\n🔸 শীথ ব্লাইট: গোড়ায় পচন → থায়োমেথাজল প্রয়োগ করুন'
    },

    // ===== টমেটো =====
    {
      keywords: ['টমেটো', 'টমেটো চাষ', 'কিভাবে টমেটো চাষ করবো'],
      response: '🍅 টমেটো চাষের পদ্ধতি:\n\n১. মাচা তৈরি করে চারা রোপণ করুন\n২. ড্রিপ ইরিগেশন ব্যবহার করুন\n৩. জৈব সার ও ডিএপি প্রয়োগ করুন\n৪. লেট ব্লাইট রোগের জন্য ম্যানকোজেব স্প্রে করুন\n৫. ৭০-৮০ দিনে ফসল সংগ্রহ করুন'
    },
    {
      keywords: ['টমেটো রোগ', 'লেট ব্লাইট', 'টমেটোর রোগ'],
      response: '🍅 টমেটোর রোগ ও সমাধান:\n\n🔸 লেট ব্লাইট: পাতায় বাদামী দাগ → ম্যানকোজেব স্প্রে করুন\n🔸 উইল্ট: গাছ শুকিয়ে যায় → কপার অক্সিক্লোরাইড ব্যবহার করুন'
    },

    // ===== সার =====
    {
      keywords: ['সার', 'সার প্রয়োগ', 'কী সার দিতে হবে'],
      response: '🧪 সার প্রয়োগের নিয়ম:\n\n🔹 জমির মাটি পরীক্ষা করে সার দিন\n🔹 ইউরিয়া: নাইট্রোজেনের জন্য\n🔹 টিএসপি: ফসফরাসের জন্য\n🔹 এমওপি: পটাশের জন্য\n🔹 জৈব সার: কম্পোস্ট বা ভার্মি কম্পোস্ট ব্যবহার করুন'
    },

    // ===== আবহাওয়া =====
    {
      keywords: ['আবহাওয়া', 'চাষে আবহাওয়া', 'বৃষ্টি', 'তাপমাত্রা'],
      response: '🌤️ আবহাওয়া ও চাষাবাদ:\n\n🔸 বৃষ্টির আগে বীজ বপন করবেন না\n🔸 অতিরিক্ত বৃষ্টিতে সেচ কম দিন\n🔸 শীতকালে শাকসবজি ভালো হয়\n🔸 গ্রীষ্মকালে সেচ বেশি দিতে হয়\n🔸 তাপমাত্রা ২৫-৩৫°C ফসলের জন্য ভালো'
    },

    // ===== কীটনাশক =====
    {
      keywords: ['কীটনাশক', 'পোকা', 'কীট', 'পোকামাকড়'],
      response: '🧴 কীটনাশক ব্যবহারের নিয়ম:\n\n🔸 সঠিক মাত্রায় ব্যবহার করুন\n🔸 সুরক্ষা চশমা ও মাস্ক ব্যবহার করুন\n🔸 জৈব কীটনাশক (নিম তেল) ব্যবহার করুন\n🔸 ফসল তোলার আগে ব্যবহার করবেন না'
    },

    // ===== আলু =====
    {
      keywords: ['আলু', 'আলু চাষ', 'কিভাবে আলু চাষ করবো'],
      response: '🥔 আলু চাষের পদ্ধতি:\n\n১. স্বাস্থ্যকর বীজ আলু ব্যবহার করুন\n২. মাটি উঁচু করে চাষ করুন\n৩. জৈব সার + ডিএপি + এমওপি প্রয়োগ করুন\n৪. লেট ব্লাইট রোগের জন্য ম্যানকোজেব স্প্রে করুন\n৫. ৮০-৯০ দিনে ফসল সংগ্রহ করুন'
    },

    // ===== গম =====
    {
      keywords: ['গম', 'গম চাষ', 'কিভাবে গম চাষ করবো'],
      response: '🌾 গম চাষের পদ্ধতি:\n\n১. ঠিক সময়ে বীজ বপন করুন (শীতকাল)\n২. ৩-৪ বার সেচ দিন\n৩. ইউরিয়া ১২০ কেজি/হেক্টর প্রয়োগ করুন\n৪. রাস্ট রোগের জন্য প্রপিকোনাজল স্প্রে করুন\n৫. ১১০-১২০ দিনে ফসল সংগ্রহ করুন'
    },

    // ===== পেঁয়াজ =====
    {
      keywords: ['পেঁয়াজ', 'পেঁয়াজ চাষ', 'কিভাবে পেঁয়াজ চাষ করবো'],
      response: '🧅 পেঁয়াজ চাষের পদ্ধতি:\n\n১. জমি শুকনা রাখুন\n২. ৪-৫ বার চাষ দিয়ে জমি তৈরি করুন\n৩. এমওপি ১৫০ কেজি/হেক্টর প্রয়োগ করুন\n৪. ডাউনি মিলডিউ রোগের জন্য ম্যালাথিয়ন ব্যবহার করুন\n৫. ১৫০-১৭০ দিনে ফসল সংগ্রহ করুন'
    },

    // ===== মৌসুম =====
    {
      keywords: ['মৌসুম', 'কখন চাষ করবো', 'চাষের সময়'],
      response: '📅 ফসলের মৌসুম:\n\n🌾 আমন ধান: জুন-জুলাই (বীজ বপন)\n🌾 বোরো ধান: নভেম্বর-ডিসেম্বর (বীজ বপন)\n🍅 টমেটো: শীতকাল\n🥔 আলু: শীতকাল\n🧅 পেঁয়াজ: শুষ্ক মৌসুম'
    },

    // ===== ডিফল্ট =====
    {
      keywords: [],
      response: '🙏 দুঃখিত, আপনার প্রশ্নের উত্তর আমার জানা নেই।\nদয়া করে ভিন্নভাবে প্রশ্ন করুন অথবা কৃষি অফিসারের সাথে যোগাযোগ করুন।'
    }
  ];

  // ============================================
  // ২. চ্যাট ফাংশন
  // ============================================

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = 'message ' + sender;

    const time = new Date().toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit'
    });

    div.innerHTML = `
      <div class="msg-text">${text.replace(/\n/g, '<br>')}</div>
      <div class="time">${time}</div>
    `;

    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTyping(show) {
    typingIndicator.style.display = show ? 'flex' : 'none';
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();

    // খুঁজে দেখা
    for (let i = 0; i < knowledgeBase.length; i++) {
      const item = knowledgeBase[i];
      if (item.keywords.length === 0) continue;

      for (let j = 0; j < item.keywords.length; j++) {
        if (lowerMsg.includes(item.keywords[j])) {
          return item.response;
        }
      }
    }

    // ডিফল্ট
    return knowledgeBase[knowledgeBase.length - 1].response;
  }

  function sendMessage(message) {
    if (!message || message.trim() === '') return;

    // ইউজার মেসেজ
    addMessage(message, 'user');

    // ইনপুট ক্লিয়ার
    chatInput.value = '';

    // টাইপিং ইন্ডিকেটর
    showTyping(true);

    // বট রেসপন্স (ডেলেই সহ)
    setTimeout(function() {
      const response = getBotResponse(message);
      showTyping(false);
      addMessage(response, 'bot');
    }, 500 + Math.random() * 1000);
  }

  // ============================================
  // ৩. ইভেন্ট লিসেনার
  // ============================================

  sendBtn.addEventListener('click', function() {
    sendMessage(chatInput.value);
  });

  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(chatInput.value);
    }
  });

  quickBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const msg = this.getAttribute('data-msg');
      sendMessage(msg);
    });
  });

  // ============================================
  // ৪. ইনিশিয়াল
  // ============================================

  console.log('💬 কৃষি চ্যাটবট লোড হয়েছে!');
  console.log('📚 নলেজ বেস:', knowledgeBase.length - 1, 'টি টপিক');

})();