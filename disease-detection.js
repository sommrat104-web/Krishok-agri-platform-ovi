/**
 * ============================================
 * ফসলের রোগ শনাক্তকরণ - AI
 * ফাইল: js/disease-detection.js
 * ============================================
 */

(function() {
  'use strict';

  // ===== DOM Elements =====
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const startBtn = document.getElementById('startCamera');
  const captureBtn = document.getElementById('capturePhoto');
  const stopBtn = document.getElementById('stopCamera');
  const loading = document.getElementById('loading');
  const resultBox = document.getElementById('resultBox');
  const diseaseTitle = document.getElementById('diseaseTitle');
  const diseaseDesc = document.getElementById('diseaseDesc');
  const diseaseRemedy = document.getElementById('diseaseRemedy');
  const diseaseMedicine = document.getElementById('diseaseMedicine');

  let stream = null;
  let isCameraOn = false;

// ============================================
// ১. ডামি ডাটাবেস (AI মডেলের পরিবর্তে)
// ============================================
// বাস্তবে এখানে TensorFlow.js বা API কল হবে
const diseaseDB = {
  'পাট(Jute)': {
    diseases: [
      {
        name: 'গুরুত্বপূর্ণ পরামর্শ',
        description: 'ওষুধ ব্যবহারের আগে প্যাকেটের নির্দেশনা অনুসরণ করুন * সকাল বা বিকালে স্প্রে করা ভালো। * স্প্রে করার সময় মাস্ক ও গ্লাভস ব্যবহার করুন۔',
      },
      {
        name: 'গোড়া পচা রোগ (Stem Rot / Root Rot)',
        description: 'গাছের গোড়া কালচে হয়ে পচে যায়। গাছ দুর্বল হয়ে পড়ে এবং পরে শুকিয়ে মারা যায়।',
        remedy: '* জমিতে পানি জমতে দেবেন না। * রোগমুক্ত বীজ ব্যবহার করুন। * আক্রান্ত গাছ তুলে নষ্ট করুন।',
        medicine: '* Carbendazim 50 WP – প্রতি লিটার পানিতে ১ গ্রাম। * Thiophanate methyl ব্যবহার করা যায়।',
      },
      {
        name: 'নরম পচা রোগ (Soft Rot)',
        description: 'কাণ্ড নরম হয়ে যায় ও দুর্গন্ধ সৃষ্টি হয়। আক্রান্ত অংশ দ্রুত পচে পড়ে যায়।',
        remedy: '* জমির নিষ্কাশন ব্যবস্থা ভালো রাখুন। * অতিরিক্ত সেচ বন্ধ করুন। * রোগাক্রান্ত গাছ অপসারণ করুন।',
        medicine: '* Copper oxychloride – প্রতি লিটার পানিতে ২ গ্রাম। * Streptocycline ব্যবহার করা যেতে পারে',
      },
      {
        name: 'কালো দাগ রোগ (Anthracnose / Black Spot)',
        description: 'পাতা ও কাণ্ডে কালচে বা বাদামি দাগ দেখা যায়। পরে দাগ বড় হয়ে শুকিয়ে যায়।',
        remedy: '* ফসলের অবশিষ্টাংশ পুড়িয়ে ফেলুন * ফসল পর্যায়ক্রমে চাষ করুন। * পরিষ্কার বীজ ব্যবহার করুন',
        medicine: '* Mancozeb 80 WP – প্রতি লিটার পানিতে ২ গ্রাম * Carbendazim স্প্রে করা যায়',
      },
      {
        name: 'পাউডারি মিলডিউ (Powdery Mildew)',
        description: 'পাতার উপর সাদা গুঁড়ার মতো আবরণ পড়ে। পাতা হলুদ হয়ে শুকিয়ে যায়।',
        remedy: '* গাছের ঘনত্ব কম রাখুন। * বাতাস চলাচলের ব্যবস্থা রাখুন। * আক্রান্ত পাতা অপসারণ করুন।',
        medicine: '* Wettable Sulphur – প্রতি লিটার পানিতে ২ গ্রাম। * Hexaconazole ব্যবহার করা যায়।',
      },
      {
        name: 'পাতাঝরা রোগ (Leaf Blight)',
        description: 'পাতার কিনারা থেকে বাদামি হয়ে শুকাতে থাকে। পরে পুরো পাতা ঝরে পড়ে।',
        remedy: '* সুষম সার প্রয়োগ করুন। * জমিতে আগাছা পরিষ্কার রাখুন। * আক্রান্ত অংশ অপসারণ করুন।',
        medicine: '* Mancozeb – প্রতি লিটার পানিতে ২ গ্রাম। * Copper oxychloride ব্যবহার করা যায়।',
      }
    ]
  },
  'ধান(Rice)': {
    diseases: [
      {
        name: 'গুরুত্বপূর্ণ পরামর্শ',
        description: 'ওষুধ ব্যবহারের আগে প্যাকেটের নির্দেশনা অবশ্যই পড়ুন। * প্রতি লিটার পানির পরিমাণ সঠিকভাবে মেপে ব্যবহার করুন। * স্প্রে করার সময় মাস্ক, গ্লাভস ও সুরক্ষা পোশাক ব্যবহার করা ভালো।',
      },
      {
        name: 'ব্লাস্ট রোগ (Rice Blast)',
        description: 'ছত্রাকজনিত রোগ! পাতায় চোখের মতো ডিম্বাকার দাগ হয়। পরে দাগ বড় হয়ে পাতা শুকিয়ে যায়। শীষেও আক্রমণ করতে পারে।',
        remedy: '* ট্রাইসাইক্লাজল স্প্রে করুন * পরিমিত ইউরিয়া ব্যবহার করুন * আক্রান্ত পাতা বা গাছ অপসারন করুন * রোগ সহনশীল জাত চাষ করুন',
        medicine: '* ট্রাইসাইক্লাজল (Tricyclazole) ৭৫% WP প্রতি লিটার পানিতে ০.৬ গ্রাম * আইসোপ্রথিওলেন (Isoprothiolane)',
      },
      {
        name: 'বাদামী দাগ রোগ (Brown Spot)',
        description: 'পাতায় ছোট গোল বাদামী দাগ দেখা যায়। দাগের চারপাশে হলুদ বর্ডার থাকতে পারে।',
        remedy: '* সুষম সার ব্যবহার করুন। * জমিতে পানি ধরে রাখুন। * পরিষ্কার বীজ ব্যবহার করুন।',
        medicine: '* Mancozeb 80 WP- প্রতি লিটার পানিতে ২ গ্রাম। * Carbendazim 50 WP-প্রতি লিটার পানিতে ১ গ্রাম।',
      },
      {
        name: 'ব্যাকটেরিয়াল লিফ ব্লাইট (Bacterial Leaf Blight)',
        description: 'পাতার আগা থেকে হলুদ হয়ে শুকাতে থাকে। পরে পুরো পাতা ঝলসে যায়।',
        remedy: '* রোগমুক্ত বীজ ব্যবহার করুন। * জমিতে অতিরিক্ত পানি জমতে দেবেন না। * পরিমিত নাইট্রোজেন সার দিন।',
        medicine: '* Streptocycline – প্রতি ১০ লিটার পানিতে ১ গ্রাম। * Copper oxychloride ব্যবহার করা যায়।',
      },
      {
        name: 'টুংরো রোগ (Rice Tungro Virus)',
        description: 'গাছ খাটো হয়ে যায়, পাতা হলুদ বা কমলা রঙ ধারণ করে এবং শীষ কম ধরে।',
        remedy: '* সবুজ পাতা ফড়িং (leafhopper) দমন করুন। * আক্রান্ত গাছ তুলে ফেলুন। * একই সময়ে রোপণ ও কাটাই করুন।',
        medicine: 'ভাইরাসের সরাসরি ওষুধ নেই। বাহক পোকার জন্য: * Imidacloprid 17.8 SL – প্রতি লিটার পানিতে ০.৩ মি.লি। * Thiamethoxam 25 WG ব্যবহার করা যায়।',
      },
      {
        name: 'লিফ স্পট',
        description: 'পাতায় হলুদ দাগ হয়, ফলন কমায়।',
        remedy: 'কার্বেন্ডাজিম স্প্রে করুন।',
        medicine: 'কার্বেন্ডাজিম ৫০% WP',
      },
      {
        name: 'শীথ ব্লাইট (Sheath Blight)',
        description: 'গাছের গোড়ায় পচন ধরে, গাছ মারা যায়। পাতার খোলে ডিম্বাকার ধূসর দাগ হয়। পরে দাগ একত্রীত হয়ে বড় আকার ধারণ করে।',
        remedy: '* থায়োমেথাজল প্রয়োগ করুন। * গাছ খুব ঘন করে রোপণ করবেন না। * অতিরিক্ত নাইট্রোজেন সার এড়িয়ে চলুন। * আগাছা পরিষ্কার রাখুন।',
        medicine: '* থায়োমেথাজল ৭০% WP * Validamycin 3L- প্রতি লিটার পানিতে ২ মি.লি.। * Hexaconazole',
      }
    ]
  },
      'টমেটো(Tomato)': {
      diseases: [
        {
          name: 'গুরুত্বপূর্ণ পরামর্শ',
          description: '* স্প্রে করার আগে ওষুধের মাত্রা ঠিকভাবে মেপে নিন. * সকাল বা বিকালে স্প্রে করা ভালো। * ফল সংগ্রহের ৫–৭ দিন আগে অধিকাংশ ছত্রাকনাশক স্প্রে বন্ধ রাখা উত্তম।',
        },
        {
          name: 'আগাম ঝলসানো রোগ (Early Blight)',
          description: 'পাতায় গোলাকার বাদামি দাগ হয় এবং দাগে বলয়ের মতো বৃত্ত দেখা যায়। পরে পাতা শুকিয়ে ঝরে পড়ে।',
          remedy: 'রোগমুক্ত চারা ব্যবহার করুন। * ফসল পর্যায়ক্রমে চাষ করুন। * আক্রান্ত পাতা অপসারণ করুন।',
          medicine: '* Mancozeb 80 WP – প্রতি লিটার পানিতে ২ গ্রাম * Chlorothalonil স্প্রে করা যায়।',
        },
        {
          name: 'ঢলে পড়া রোগ (Bacterial Wilt)',
          description: 'গাছ হঠাৎ ঢলে পড়ে, কিন্তু পাতা প্রথমে সবুজ থাকে। পরে পুরো গাছ শুকিয়ে যায়।',
          remedy: '* রোগমুক্ত জমি ব্যবহার করুন। * পানি নিষ্কাশনের ব্যবস্থা করুন। * আক্রান্ত গাছ তুলে ধ্বংস করুন।',
          medicine: '* Streptocycline – প্রতি ১০ লিটার পানিতে ১ গ্রাম। * Copper oxychloride ব্যবহার করা যায়।',
        },
        {
          name: 'পাতাকুঞ্চন ভাইরাস (Leaf Curl Virus)',
          description: 'পাতা কুঁকড়ে যায়, গাছ খাটো হয় এবং ফলন কমে যায়। সাদা মাছি এ রোগ ছড়ায়',
          remedy: 'সাদা মাছি দমন করুন। * আক্রান্ত গাছ তুলে ফেলুন। * হলুদ আঠালো ফাঁদ ব্যবহার করুন।',
          medicine: '* ভাইরাসের সরাসরি ওষুধ নেই। বাহক পোকার জন্য * Imidacloprid 17.8 SL – প্রতি লিটার পানিতে ০.৩ মি.লি। * Thiamethoxam 25 WG ব্যবহার করা যায়',
        },
        {
          name: 'ফল পচা রোগ (Fruit Rot)',
          description: 'কালো বা বাদামি দাগ হয় এবং ফল নরম হয়ে পচে যায়।',
          remedy: 'ফল মাটিতে লাগতে দেবেন না। * য়মিত আক্রান্ত ফল সংগ্রহ করে নষ্ট করুন। * গাছের নিচে মালচ ব্যবহার করুন।S',
          medicine: '* Carbendazim 50 WP – প্রতি লিটার পানিতে ১ গ্রাম। * Mancozeb স্প্রে করা যায়।',
        },
        {
          name: 'নাবী ঝলসানো রোগ(Late blight)',
          description: 'পাতা ও ফলে বাদামী দাগ হয়। পাতায় পানিভেজা দাগ হয়, পরে কালো হয়ে যায়। ফলেও বাদামি শক্ত দাগ দেখা যায়।',
          remedy: '* ম্যানকোজেব স্প্রে করুন। * জমিতে পানি জমতে দেবেন না। * গাছের দূরত্ব ঠিক রাখুন। * আক্রান্ত গাছ তুলে ফেলুন।',
          medicine: 'ম্যানকোজেব ৬৩% WP,Metalaxyl + Mancozeb – প্রতি লিটার পানিতে ২ গ্রাম * Cymoxanil ব্যবহার করা যায়।'
        },
        {
          name: 'উইল্ট',
          description: 'গাছ শুকিয়ে যায়, ফলন কমে।',
          remedy: 'কপার অক্সিক্লোরাইড ব্যবহার করুন।',
          medicine: 'কপার অক্সিক্লোরাইড ৫০% WP'
        },
      ]
    },
        'আলু': {
      diseases: [
        {
          name: 'গুরুত্বপূর্ণ পরামর্শ',
          description: '* একই ওষুধ বারবার ব্যবহার না করে পর্যায়ক্রমে পরিবর্তন করলে ভালো ফল পাওয়া যায়। * বীজ আলু রোপণের আগে শোধন করলে অনেক রোগের আক্রমণ কমে।',
        },
        {
          name: 'আগাম ধসা রোগ (Early Blight)',
          description: 'পাতায় গোলাকার বাদামি দাগ হয় এবং দাগে বলয়ের মতো বৃত্ত দেখা যায়। পরে পাতা শুকিয়ে ঝরে পড়ে।',
          remedy: 'রোগমুক্ত বীজ আলু ব্যবহার করুন। * ফসল পর্যায়ক্রমে চাষ করুন। * আক্রান্ত পাতা অপসারণ করুন।',
          medicine: 'Mancozeb 80 WP – প্রতি লিটার পানিতে ২ গ্রাম। * Chlorothalonil স্প্রে করা যায়।',
        },
        {
          name: 'কালো পা রোগ (Black Leg)',
          description: 'গাছের গোড়া কালো হয়ে যায় এবং গাছ ঢলে পড়ে। কন্দ নরম ও পচা অবস্থায় দেখা যায়।',
          remedy: 'রোগমুক্ত বীজ আলু ব্যবহার করুন। * পানি নিষ্কাশনের ব্যবস্থা করুন। * আক্রান্ত গাছ তুলে ফেলুন',
          medicine: '* Streptocycline – প্রতি ১০ লিটার পানিতে ১ গ্রাম। * Copper oxychloride ব্যবহার করা যায়',
        },
        {
          name: 'স্ক্যাব রোগ (Common Scab)',
          description: 'আলুর কন্দের গায়ে খসখসে ও উঁচু দাগ দেখা যায়। কন্দের বাজারমূল্য কমে যায়।',
          remedy: 'জমির মাটির pH কম রাখুন (অম্লীয় মাটি ভালো। * পর্যাপ্ত সেচ দিন। * রোগমুক্ত বীজ ব্যবহার করুন।',
          medicine: '* সাধারণত নির্দিষ্ট কার্যকর ওষুধ কম। বীজ শোধনের জন্য। * Carbendazim দিয়ে বীজ আলু শোধন করা যায়।',
        },
        {
          name: 'ভাইরাসজনিত মোজাইক রোগ (Mosaic Virus)',
          description: 'পাতায় হালকা ও গাঢ় সবুজ ছোপ দেখা যায়। গাছ দুর্বল হয় এবং ফলন কমে যায়।',
          remedy: '* রোগমুক্ত বীজ আলু ব্যবহার করুন। * জাব পোকা দমন করুন। * আক্রান্ত গাছ তুলে ফেলুন',
          medicine: '<> ভাইরাসের সরাসরি ওষুধ নেই। বাহক পোকার জন্য <> * Imidacloprid 17.8 SL – প্রতি লিটার পানিতে ০.৩ মি.লি। * Thiamethoxam 25 WG ব্যবহার করা যায়।',
        },
        {
          name: 'নাবী ধসা রোগ (Late Blight)',
          description: 'পাতায় বাদামী দাগ, কন্দ পচে যায়। পাতায় পানিভেজা দাগ হয়, পরে কালো হয়ে যায়। কাণ্ড ও কন্দেও পচন ধরে। এটি আলুর সবচেয়ে ক্ষতিকর রোগগুলোর একটি।',
          remedy: 'ম্যানকোজেব স্প্রে করুন। * জমিতে পানি জমতে দেবেন না। * গাছের দূরত্ব ঠিক রাখুন। * আক্রান্ত গাছ তুলে ধ্বংস করুন।',
          medicine: 'ম্যানকোজেব ৬৩% WP। * Metalaxyl + Mancozeb – প্রতি লিটার পানিতে ২ গ্রাম। * Cymoxanil + Mancozeb ব্যবহার করা যায়।'
        }
      ]
    },
    'গম (Wheat)': {
      diseases: [
        {name: 'গুরুত্বপূর্ণ পরামর্শ',
          description: '* গমের মরিচা রোগ দেখা দিলে দ্রুত ছত্রাকনাশক স্প্রে করুন। * বীজ বপনের আগে বীজ শোধন করলে স্মাট ও ব্ল্যাক পয়েন্ট রোগ অনেক কমে। * অতিরিক্ত নাইট্রোজেন সার ব্যবহার করলে মরিচা ও পাউডারি মিলডিউ বাড়তে পারে',
        },
        {
          name: 'পাতার মরিচা রোগ (Leaf Rust)',
          description: 'পাতায় ছোট ছোট কমলা বা বাদামি ফোস্কার মতো দাগ দেখা যায়। পরে পাতা শুকিয়ে যায় এবং ফলন কমে।',
          remedy: '* প্রপিকোনাজল স্প্রে করুন। * রোগ সহনশীল জাত চাষ করুন। * পরিমিত নাইট্রোজেন সার ব্যবহার করুন। * আক্রান্ত গাছের অবশিষ্টাংশ নষ্ট করুন।',
          medicine: 'প্রপিকোনাজল (Propiconazole) ২৫% EC-প্রতি লিটার পানিতে ১ মি.লি। * Tebuconazole স্প্রে করা যায়।'
        },
        {
          name: 'কান্ডের মরিচা রোগ (Stem Rust)',
          description: 'কাণ্ড ও পাতায় লম্বাটে গাঢ় বাদামি দাগ হয়। আক্রান্ত গাছ দুর্বল হয়ে পড়ে।',
          remedy: '* রোগমুক্ত বীজ ব্যবহার করুন। * ফসল পর্যায়ক্রমে চাষ করুন। * আক্রান্ত ক্ষেত পরিষ্কার করুন।',
          medicine: 'Propiconazole বা Tebuconazole স্প্রে।'
        },
        {
          name: 'পাউডারি মিলডিউ (Powdery Mildew)',
          description: 'পাতার উপর সাদা গুঁড়ার মতো আবরণ পড়ে। পরে পাতা হলুদ হয়ে শুকিয়ে যায়.',
          remedy: '*গাছের ঘনত্ব কম রাখুন। * বাতাস চলাচলের ব্যবস্থা রাখুন। * অতিরিক্ত নাইট্রোজেন সার এড়িয়ে চলুন।',
          medicine: '* Wettable Sulphur – প্রতি লিটার পানিতে ২ গ্রাম। * Hexaconazole ব্যবহার করা যায়।'
        },
        {
          name: 'ব্ল্যাক পয়েন্ট রোগ (Black Point)',
          description: 'গমের দানার অগ্রভাগ কালো হয়ে যায়। দানার গুণগত মান কমে যায়।',
          remedy: '* পরিষ্কার ও শুকনা বীজ ব্যবহার করুন. * ফসল পরিপক্ব হলে দ্রুত কাটাই করুন। * সংরক্ষণের আগে দানা ভালোভাবে শুকান।',
          medicine: 'Carbendazim দিয়ে বীজ শোধন করা যায়।'
        },
        {
          name: 'লুজ স্মাট রোগ (Loose Smut)',
          description: 'শীষের দানা কালো গুঁড়ায় পরিণত হয়। পরে বাতাসে উড়ে যায়।',
          remedy: '* রোগমুক্ত বীজ ব্যবহার করুন। * বীজ শোধন করে বপন করুন। * আক্রান্ত শীষ নষ্ট করুন।',
          medicine: '* Carboxin 75 WP – প্রতি কেজি বীজে ২ গ্রাম। * ebuconazole বীজ শোধনে ব্যবহার করা যায়'
        }
      ]
    },

      'ভুট্টা(Maize/Corn)': {
      diseases: [
        {
          name: 'গুরুত্বপূর্ণ পরামর্শ',
          description: '* ভুট্টার ডাউনি মিলডিউ প্রতিরোধে বীজ শোধন খুব গুরুত্বপূর্ণ। * কাণ্ড পচা রোগ কমাতে পানি নিষ্কাশন ভালো রাখতে হবে। * অতিরিক্ত নাইট্রোজেন সার দিলে স্মাট ও অন্যান্য রোগের আক্রমণ বাড়তে পারে।',
        },
        {
          name: 'পাতাঝলসানো রোগ (Turcicum Leaf Blight)',
          description: 'পাতায় লম্বাটে ধূসর বা বাদামি দাগ হয়। পরে দাগ বড় হয়ে পুরো পাতা শুকিয়ে যায়।',
          remedy: '* রোগ সহনশীল জাত চাষ করুন। * ফসল পর্যায়ক্রমে চাষ করুন। * আক্রান্ত পাতা অপসারণ করুন।',
          medicine: '* Mancozeb 80 WP – প্রতি লিটার পানিতে ২ গ্রাম। * Propiconazole স্প্রে করা যায়।',
        },
        {
          name: 'ডাউনি মিলডিউ (Downy Mildew)',
          description: 'পাতায় সাদা তুলার মতো আবরণ দেখা যায়। গাছ খাটো হয়ে যায় এবং শীষ ছোট হয়।',
          remedy: '* রোগমুক্ত বীজ ব্যবহার করুন। * ভালো নিষ্কাশন ব্যবস্থা রাখুন। * আক্রান্ত গাছ তুলে ফেলুন।',
          medicine: '* Metalaxyl 35 WS দিয়ে বীজ শোধন। * Metalaxyl + Mancozeb স্প্রে করা যায়।'
        },
        {
          name: 'মরিচা রোগ (Rust)',
          description: 'পাতায় ছোট কমলা বা বাদামি ফোস্কার মতো দাগ হয়। পরে পাতা শুকিয়ে যায়।',
          remedy: '* রোগ সহনশীল জাত ব্যবহার করুন। * পরিমিত সার প্রয়োগ করুন। * আক্রান্ত অবশিষ্টাংশ ধ্বংস করুন।',
          medicine: '* Tebuconazole – প্রতি লিটার পানিতে ১ মি.লি। * Propiconazole ব্যবহার করা যায়।',
        },
        {
          name: 'কাণ্ড পচা রোগ (Stalk Rot)',
          description: 'গাছের কাণ্ড নরম হয়ে পচে যায় এবং সহজে ভেঙে পড়ে।',
          remedy: '* জমিতে পানি জমতে দেবেন না। * সুষম সার ব্যবহার করুন। * আক্রান্ত গাছ তুলে নষ্ট করুন।',
          medicine: '* Carbendazim 50 WP – প্রতি লিটার পানিতে ১ গ্রাম। * Thiophanate methyl ব্যবহার করা যায়।'
        },
        {
          name: 'স্মাট রোগ (Common Smut)',
          description: 'পাতা, কাণ্ড ও শীষে ফোলা গল বা টিউমারের মতো অংশ তৈরি হয়। পরে তা কালো গুঁড়ায় পরিণত হয়।',
          remedy: '* রোগ সহনশীল জাত ব্যবহার করুন। * আক্রান্ত গল কেটে ধ্বংস করুন। * অতিরিক্ত নাইট্রোজেন সার এড়িয়ে চলুন।',
          medicine: '* Carboxin দিয়ে বীজ শোধন। * Tebuconazole ব্যবহার করা যায়।'
        },
      ]
    },
};

  // ============================================
  // ২. ক্যামেরা ফাংশন
  // ============================================

  // ক্যামেরা চালু
  function startCamera() {
    if (isCameraOn) return;

    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false
    })
    .then(function(mediaStream) {
      stream = mediaStream;
      video.srcObject = stream;
      isCameraOn = true;

      startBtn.style.display = 'none';
      captureBtn.style.display = 'inline-flex';
      stopBtn.style.display = 'inline-flex';

      showToast('📷 ক্যামেরা চালু হয়েছে!', 'success');
    })
    .catch(function(error) {
      console.error('❌ ক্যামেরা চালু করতে সমস্যা:', error);
      showToast('❌ ক্যামেরা চালু করা যায়নি!', 'error');
    });
  }

  // ছবি তোলা
  function capturePhoto() {
    if (!isCameraOn) {
      showToast('❌ দয়া করে ক্যামেরা চালু করুন!', 'error');
      return;
    }

    // ক্যানভাসে ছবি আঁকা
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // ছবি ডাটা
    const imageData = canvas.toDataURL('image/png');

    // ফলাফল দেখানো
    showLoading(true);
    resultBox.classList.remove('show');

    // AI শনাক্তকরণ (ডামি)
    setTimeout(function() {
      detectDisease(imageData);
    }, 2000);
  }

  // ক্যামেরা বন্ধ
  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(function(track) {
        track.stop();
      });
      stream = null;
    }
    video.srcObject = null;
    isCameraOn = false;

    startBtn.style.display = 'inline-flex';
    captureBtn.style.display = 'none';
    stopBtn.style.display = 'none';

    showToast('📷 ক্যামেরা বন্ধ করা হয়েছে', 'info');
  }

  // ============================================
  // ৩. রোগ শনাক্তকরণ (ডামি AI)
  // ============================================

  function detectDisease(imageData) {
    // বাস্তবে এখানে TensorFlow.js বা API কল হবে
    // এখন ডামি ডাটা দেখানো হচ্ছে

    const crops = ['ধান', 'টমেটো', 'আলু', 'গম'];
    const randomCrop = crops[Math.floor(Math.random() * crops.length)];
    const cropData = diseaseDB[randomCrop];

    if (!cropData) {
      showResult('অজানা রোগ', 'এই ফসলের রোগ আমাদের ডাটাবেসে নেই', 'কৃষি অফিসারের সাথে যোগাযোগ করুন', '——');
      return;
    }

    const randomDisease = cropData.diseases[Math.floor(Math.random() * cropData.diseases.length)];

    showResult(
      randomDisease.name,
      randomDisease.description,
      randomDisease.remedy,
      randomDisease.medicine
    );
  }

  // ============================================
  // ৪. UI আপডেট
  // ============================================

  function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
  }

  function showResult(name, desc, remedy, medicine) {
    showLoading(false);

    diseaseTitle.textContent = name;
    diseaseDesc.textContent = desc;
    diseaseRemedy.textContent = remedy;
    diseaseMedicine.textContent = medicine;

    resultBox.classList.add('show');
    showToast('✅ রোগ শনাক্ত করা হয়েছে!', 'success');
  }

  // ============================================
  // ৫. ইভেন্ট লিসেনার
  // ============================================

  startBtn.addEventListener('click', startCamera);
  captureBtn.addEventListener('click', capturePhoto);
  stopBtn.addEventListener('click', stopCamera);

  // ============================================
  // ৬. পেজ লোড হলে
  // ============================================

  console.log('✅ রোগ শনাক্তকরণ পেজ লোড হয়েছে!');
  console.log('📷 ক্যামেরা চালু করতে "ক্যামেরা চালু" বাটনে ক্লিক করুন।');

})();