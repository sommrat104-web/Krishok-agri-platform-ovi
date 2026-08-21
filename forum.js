/**
 * ============================================
 * কমিউনিটি ফোরাম - JavaScript
 * ফাইল: js/forum.js
 * ============================================
 */

(function() {
  'use strict';

  // ===== DOM Elements =====
  var questionList = document.getElementById('questionList');
  var askBtn = document.getElementById('askBtn');
  var titleInput = document.getElementById('questionTitle');
  var bodyInput = document.getElementById('questionBody');
  var tagsInput = document.getElementById('questionTags');
  var modal = document.getElementById('questionModal');
  var modalBody = document.getElementById('modalBody');
  var closeModal = document.getElementById('closeModal');

  var currentUser = null;
  var database = null;
  var isFirebaseReady = false;

  // ============================================
  // ১. Utilities
  // ============================================

  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function showToast(msg, type) {
    var toast = document.getElementById('toast');
    if (!toast) {
      console.log('📢', msg);
      return;
    }
    type = type || 'success';
    toast.textContent = msg;
    toast.className = 'toast show ' + type;
    setTimeout(function() {
      toast.classList.remove('show');
    }, 3500);
  }

  // ============================================
  // ২. ডেমো ডাটা
  // ============================================

  var demoQuestions = [
    {
      id: '1',
      title: 'ধান চাষের সঠিক সময় কখন?',
      body: 'আমি ধান চাষ করতে চাই। কোন মাসে বীজ বপন করলে ভালো ফলন পাব?',
      author: 'মিঃ অভি',
      time: '২ ঘণ্টা আগে',
      tags: ['ধান', 'চাষ', 'সময়']
    },
    {
      id: '2',
      title: 'টমেটোর লেট ব্লাইট রোগের সমাধান কী?',
      body: 'আমার টমেটো গাছে লেট ব্লাইট রোগ দেখা দিয়েছে। কী করলে ভালো হবে?',
      author: 'মোসাঃ ফাতেমা',
      time: '৫ ঘণ্টা আগে',
      tags: ['টমেটো', 'রোগ', 'লেট ব্লাইট']
    },
    {
      id: '3',
      title: 'গম চাষে কী সার দিতে হবে?',
      body: 'গম চাষ করতে চাই। কোন সার কতটুকু দিলে ভালো ফলন পাব?',
      author: 'জন কৃষক',
      time: '১ দিন আগে',
      tags: ['গম', 'সার', 'চাষ']
    }
  ];

  // ============================================
  // ৩. রেন্ডার ফাংশন
  // ============================================

  function renderQuestions(questions) {
    if (!questionList) return;

    if (!questions || questions.length === 0) {
      questionList.innerHTML = `
        <div class="no-questions">
          <i class="fas fa-comments"></i>
          <h3>কোনো প্রশ্ন নেই</h3>
          <p>প্রথম প্রশ্নটি করুন!</p>
        </div>
      `;
      return;
    }

    var html = '';
    for (var i = 0; i < questions.length; i++) {
      var q = questions[i];
      var tags = q.tags ? q.tags.split(',').map(function(t) { return t.trim(); }) : [];
      var answerCount = q.answers ? Object.keys(q.answers).length : 0;

      html += `
        <div class="question-card" data-id="${q.id || i}">
          <div class="q-header">
            <div class="q-title">${escapeHtml(q.title)}</div>
            <div class="q-meta">
              <span><i class="fas fa-user"></i> ${escapeHtml(q.author || 'অতিথি')}</span>
              <span><i class="fas fa-clock"></i> ${q.time || 'এখন'}</span>
            </div>
          </div>
          <div class="q-body">${escapeHtml(q.body)}</div>
          <div class="q-stats">
            <span><i class="fas fa-comment"></i> ${answerCount} উত্তর</span>
            ${answerCount > 0 ? '<span class="answered"><i class="fas fa-check-circle"></i> উত্তরপ্রাপ্ত</span>' : '<span><i class="fas fa-hourglass-half"></i> উত্তর নেই</span>'}
          </div>
          ${tags.length > 0 ? '<div class="q-tags">' + tags.map(function(t) { return '<span class="tag">' + escapeHtml(t) + '</span>'; }).join('') + '</div>' : ''}
        </div>
      `;
    }

    questionList.innerHTML = html;

    // ক্লিক ইভেন্ট
    var cards = document.querySelectorAll('.question-card');
    for (var j = 0; j < cards.length; j++) {
      (function(card) {
        card.addEventListener('click', function() {
          var id = this.getAttribute('data-id');
          openQuestion(id);
        });
      })(cards[j]);
    }
  }

  function showDemoQuestions() {
    renderQuestions(demoQuestions);
  }

  // ============================================
  // ৪. Firebase থেকে ডাটা লোড
  // ============================================

  function loadFromFirebase() {
    if (!database) {
      showDemoQuestions();
      return;
    }

    database.ref('forum/questions').orderByChild('timestamp').limitToLast(50).on('value', function(snapshot) {
      var data = snapshot.val();
      if (data) {
        var keys = Object.keys(data);
        var questions = [];
        for (var i = 0; i < keys.length; i++) {
          var q = data[keys[i]];
          q.id = keys[i];
          questions.push(q);
        }
        questions.reverse();
        renderQuestions(questions);
      } else {
        renderQuestions([]);
      }
    });
  }

  // ============================================
  // ৫. প্রশ্ন করা
  // ============================================

  function askQuestion() {
    var title = titleInput.value.trim();
    var body = bodyInput.value.trim();
    var tags = tagsInput.value.trim();

    if (!title) {
      showToast('❌ প্রশ্নের শিরোনাম দিন!', 'error');
      return;
    }
    if (!body) {
      showToast('❌ প্রশ্নের বিস্তারিত লিখুন!', 'error');
      return;
    }

    var author = currentUser ? (currentUser.displayName || currentUser.email || 'কৃষক') : 'কৃষক';

    var newQuestion = {
      title: title,
      body: body,
      tags: tags,
      author: author,
      time: new Date().toLocaleString('bn-BD'),
      timestamp: Date.now(),
      answers: {}
    };

    if (database) {
      database.ref('forum/questions').push(newQuestion)
        .then(function() {
          showToast('✅ প্রশ্ন করা হয়েছে!', 'success');
          titleInput.value = '';
          bodyInput.value = '';
          tagsInput.value = '';
        })
        .catch(function(error) {
          console.error('❌ প্রশ্ন করতে সমস্যা:', error);
          showToast('❌ প্রশ্ন করা যায়নি!', 'error');
        });
    } else {
      // ডেমো মোড
      demoQuestions.unshift({
        id: Date.now().toString(),
        title: title,
        body: body,
        author: author,
        time: 'এখন',
        tags: tags ? tags.split(',').map(function(t) { return t.trim(); }) : []
      });
      renderQuestions(demoQuestions);
      showToast('✅ ডেমো: প্রশ্ন করা হয়েছে!', 'success');
      titleInput.value = '';
      bodyInput.value = '';
      tagsInput.value = '';
    }
  }

  // ============================================
  // ৬. মোডাল (প্রশ্নের বিস্তারিত)
  // ============================================

  function openQuestion(id) {
    if (!modal || !modalBody) return;

    var question = null;

    // ডেমো বা Firebase থেকে খোঁজা
    if (!database) {
      for (var i = 0; i < demoQuestions.length; i++) {
        if (demoQuestions[i].id == id) {
          question = demoQuestions[i];
          break;
        }
      }
    }

    if (!question) {
      // Firebase থেকে খোঁজা
      if (database) {
        database.ref('forum/questions/' + id).once('value', function(snapshot) {
          var q = snapshot.val();
          if (q) {
            q.id = id;
            showModalContent(q);
          } else {
            showToast('❌ প্রশ্ন খুঁজে পাওয়া যায়নি', 'error');
          }
        });
        return;
      } else {
        showToast('❌ প্রশ্ন খুঁজে পাওয়া যায়নি', 'error');
        return;
      }
    }

    showModalContent(question);
  }

  function showModalContent(q) {
    var answers = q.answers || {};
    var answerKeys = Object.keys(answers);

    var answersHtml = '';
    for (var i = 0; i < answerKeys.length; i++) {
      var key = answerKeys[i];
      var a = answers[key];
      answersHtml += `
        <div class="answer-item">
          <div class="a-meta"><i class="fas fa-user"></i> ${escapeHtml(a.author || 'অতিথি')} • ${a.time || 'এখন'}</div>
          <div class="a-text">${escapeHtml(a.text)}</div>
        </div>
      `;
    }

    var tags = q.tags ? q.tags.split(',').map(function(t) { return t.trim(); }) : [];

    modalBody.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
        <h3 class="modal-title">${escapeHtml(q.title)}</h3>
        <span style="font-size:0.8rem; color:var(--gray);"><i class="fas fa-user"></i> ${escapeHtml(q.author || 'অতিথি')}</span>
      </div>
      <p style="color:var(--text-light); margin:12px 0;">${escapeHtml(q.body)}</p>
      ${tags.length > 0 ? '<div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px;">' + tags.map(function(t) { return '<span style="background:#e8f5e9; padding:2px 12px; border-radius:20px; font-size:0.7rem; font-weight:600; color:var(--primary);">' + escapeHtml(t) + '</span>'; }).join('') + '</div>' : ''}
      <div style="font-size:0.85rem; color:var(--gray); margin-bottom:12px;">
        <i class="fas fa-clock"></i> ${q.time || 'এখন'} • 
        <i class="fas fa-comment"></i> ${answerKeys.length} উত্তর
      </div>

      <div class="modal-answers">
        <h4 style="color:var(--primary); margin-bottom:8px;">উত্তরসমূহ</h4>
        ${answersHtml || '<p style="color:var(--gray);">এখনো কোনো উত্তর নেই। প্রথম উত্তর দিন!</p>'}
      </div>

      <div class="answer-form">
        <input type="text" id="answerInput" placeholder="💬 আপনার উত্তর লিখুন..." />
        <button id="answerBtn"><i class="fas fa-paper-plane"></i> উত্তর দিন</button>
      </div>
    `;

    modal.classList.add('show');

    // উত্তর দেওয়া
    var answerBtn = document.getElementById('answerBtn');
    var answerInput = document.getElementById('answerInput');

    if (answerBtn) {
      answerBtn.addEventListener('click', function() {
        var text = answerInput.value.trim();
        if (!text) {
          showToast('❌ উত্তর লিখুন!', 'error');
          return;
        }

        var author = currentUser ? (currentUser.displayName || currentUser.email || 'কৃষক') : 'কৃষক';

        var newAnswer = {
          text: text,
          author: author,
          time: new Date().toLocaleString('bn-BD')
        };

        if (database && q.id) {
          database.ref('forum/questions/' + q.id + '/answers').push(newAnswer)
            .then(function() {
              showToast('✅ উত্তর দেওয়া হয়েছে!', 'success');
              answerInput.value = '';
              openQuestion(q.id);
            })
            .catch(function(error) {
              console.error('❌ উত্তর দিতে সমস্যা:', error);
              showToast('❌ উত্তর দেওয়া যায়নি!', 'error');
            });
        } else {
          // ডেমো মোড
          if (!q.answers) q.answers = {};
          var ansId = Date.now().toString();
          q.answers[ansId] = newAnswer;
          showToast('✅ ডেমো: উত্তর দেওয়া হয়েছে!', 'success');
          answerInput.value = '';
          showModalContent(q);
        }
      });
    }
  }

  // ============================================
  // ৭. মোডাল বন্ধ
  // ============================================

  if (closeModal) {
    closeModal.addEventListener('click', function() {
      modal.classList.remove('show');
    });
  }

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        modal.classList.remove('show');
      }
    });
  }

  // ============================================
  // ৮. ইভেন্ট লিসেনার
  // ============================================

  if (askBtn) {
    askBtn.addEventListener('click', askQuestion);
  }

  // Enter key
  if (titleInput) {
    titleInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        bodyInput.focus();
      }
    });
  }

  if (bodyInput) {
    bodyInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        askQuestion();
      }
    });
  }

  // ============================================
  // ৯. Firebase Auth চেক
  // ============================================

  function initFirebase() {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
      database = firebase.database();
      isFirebaseReady = true;
      console.log('✅ Firebase সংযুক্ত');

      if (firebase.auth) {
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

      loadFromFirebase();
    } else {
      console.warn('⚠️ Firebase পাওয়া যায়নি, ডেমো মোড চলছে');
      showDemoQuestions();
    }
  }

  // ============================================
  // ১০. ইনিশিয়াল
  // ============================================

  setTimeout(function() {
    initFirebase();
  }, 1000);

  console.log('👥 কমিউনিটি ফোরাম লোড হয়েছে!');

})();
