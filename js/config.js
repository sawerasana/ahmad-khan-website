'use strict';

// ============================================================
// Ahmad Khan – WhatsApp Growth Expert
// Central Configuration File
// All editable values for the entire website.
// ============================================================

const SITE_CONFIG = {

  // -------- OWNER INFO --------
  ownerName: 'Ahmad Khan',
  ownerWhatsApp: '923001234567',          // international format, no '+'
  ownerEmail: 'ahmad@example.com',
  ownerLocation: 'Swabi, Pakistan',
  ownerChannelLink: 'https://whatsapp.com/channel/your-channel', // optional, leave empty if none

  // -------- SITE META & BRANDING --------
  siteTitle: 'Ahmad Khan - WhatsApp Growth Expert',
  heroTagline: 'Apni WhatsApp Duniya ka Badshah – Promotion, Channels, Growth',
  aboutText:
    'Main Ahmad Khan, Swabi se. Pichle 3 saal mein 200+ channels create aur sell kar chuka hoon. ' +
    'Mera mission: har business ko WhatsApp ki taqat se nawazna.',
  metaDescription:
    'Ahmad Khan - Professional WhatsApp Channel Seller, Promotion Expert, and Growth Consultant from Swabi, Pakistan.',
  metaKeywords: 'WhatsApp channels, buy channel, promotion, Swabi, Ahmad Khan',

  // -------- ANNOUNCEMENT BAR --------
  showAnnouncement: true,
  announcementText: 'Limited Time Offer: 20% Off on Channel Sales!',

  // -------- THEME --------
  defaultTheme: 'light',                  // 'light' or 'dark'

  // -------- PRICING PLANS --------
  pricingPlans: [
    {
      name: 'Silver Boost',
      price: 500,
      features: ['2-3 targeted promotions', '5K+ reach']
    },
    {
      name: 'Gold Blast',
      price: 2000,
      features: ['5 promotions across channels', '25K+ reach']
    },
    {
      name: 'Platinum Viral',
      price: 10000,
      features: ['Dedicated campaign', '100K+ reach', 'Personal strategy call']
    }
  ],

  // -------- WHATSAPP PRE-FILLED MESSAGE TEMPLATES --------
  waMessageTemplates: {
    general: 'Assalam-o-Alaikum! I am interested in your WhatsApp services.',
    buyChannel: 'Assalam-o-Alaikum! I want to buy a WhatsApp channel.',
    promotion: 'Assalam-o-Alaikum! I want to promote my channel/product.',
    consultation: 'Assalam-o-Alaikum! I need a consultation session.'
  },

  // -------- CHANNELS MARKETPLACE --------
  channelsDataUrl: 'js/channels.json',    // relative path to the JSON data file

  // -------- SOCIAL LINKS --------
  socialLinks: {
    tiktok: '',
    instagram: '',
    facebook: ''
  },

  // -------- TRUST COUNTERS (static numbers that animate) --------
  trustCounters: {
    channelsSold: 200,
    clients: 1000,
    promotionsDone: 5000
  },

  // -------- TESTIMONIALS --------
  testimonials: [
    {
      name: 'Usman',
      city: 'Peshawar',
      quote: 'Mashallah, channel 2 din mein bik gaya!'
    },
    {
      name: 'Ayesha',
      city: 'Lahore',
      quote: 'Promotion ka result 1 ghante mein dikhne laga.'
    },
    {
      name: 'Bilal',
      city: 'Islamabad',
      quote: 'Ahmad bhai ne meri poori WhatsApp strategy badal di.'
    }
  ],

  // -------- FAQ ITEMS --------
  faqItems: [
    {
      question: 'Channel kesay khareedain?',
      answer: 'Aap humein WhatsApp par contact karein, payment karein, aur hum channel admin transfer kar denge.'
    },
    {
      question: 'Payment methods kya hain?',
      answer: 'JazzCash, Easypaisa, aur Bank Transfer available hain.'
    },
    {
      question: 'Delivery kitni jaldi hoti hai?',
      answer: 'Payment confirm hone ke 1 ghante ke andar channel transfer ho jata hai.'
    },
    {
      question: 'Kya promotion organic hota hai?',
      answer: 'Jee haan, hum real channels aur real members use karte hain.'
    },
    {
      question: 'Kya yeh legal hai?',
      answer: 'Yeh WhatsApp ki terms of service ke mutabik nahi hai, lekin hum as independent service provider kaam karte hain.'
    }
  ]
};

// Make it globally accessible
window.SITE_CONFIG = SITE_CONFIG;
