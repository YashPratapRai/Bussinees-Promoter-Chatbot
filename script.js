document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const promptInput = document.getElementById('prompt');
  const submitBtn = document.getElementById('submit-btn');
  const micBtn = document.getElementById('mic-btn');
  const imageBtn = document.getElementById('image-btn');
  const imageInput = document.getElementById('image-input');
  const chatArea = document.getElementById('chat-area');
  const newChatBtn = document.getElementById('new-chat');
  const themeToggleBtn = document.getElementById('theme-toggle'); // New theme toggle button
  
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBk2qSVfcrtC834e-WH6G6wJSaIauEWmH4";
  
  let user = {
      message: null,
      file: {
          mime_type: null,
          data: null
      }
  };

  // Check for saved theme preference or use preferred color scheme
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  let currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // Apply the saved theme
  document.body.className = currentTheme;
  updateThemeIcon();
  
  // Theme toggle button event listener
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Speech Recognition Setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  // Speech Synthesis Setup
  const synth = window.speechSynthesis;
  
  // Event Listeners
  promptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && promptInput.value.trim()) {
          handleUserMessage(promptInput.value.trim());
      }
  });
  
  submitBtn.addEventListener('click', () => {
      if (promptInput.value.trim()) {
          handleUserMessage(promptInput.value.trim());
      }
  });
  
  micBtn.addEventListener('click', toggleSpeechRecognition);
  
  imageBtn.addEventListener('click', () => imageInput.click());
  
  imageInput.addEventListener('change', handleImageUpload);
  
  newChatBtn.addEventListener('click', startNewChat);
  
  // Add click event for suggestion buttons
  document.addEventListener('click', (e) => {
      if (e.target.classList.contains('suggestion-btn')) {
          handleUserMessage(e.target.textContent);
      }
  });
  
  // Theme toggle function
  function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.className = currentTheme;
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
  }
  
  // Update theme toggle icon based on current theme
  function updateThemeIcon() {
    const icon = themeToggleBtn.querySelector('i');
    if (currentTheme === 'dark') {
      icon.className = 'fas fa-sun';
      themeToggleBtn.title = 'Switch to Light Mode';
    } else {
      icon.className = 'fas fa-moon';
      themeToggleBtn.title = 'Switch to Dark Mode';
    }
  }

  // [Rest of your existing functions remain the same...]
  // Functions like toggleSpeechRecognition, handleImageUpload, handleUserMessage, etc.
  // ... (all your other existing functions remain unchanged)

  // Initialize with focus on input
  promptInput.focus();
});