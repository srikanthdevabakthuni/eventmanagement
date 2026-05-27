// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.getElementById('navOverlay');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    if (navOverlay) navOverlay.classList.toggle('active');
  });
}
if (navOverlay) {
  navOverlay.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    navOverlay.classList.remove('active');
  });
}

// Mobile dropdown toggles
document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});

// ===== COUNTDOWN TIMER =====
function initCountdown(targetDateStr, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const target = new Date(targetDateStr).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      container.innerHTML = '<span style="color:var(--primary);font-family:Rajdhani;font-size:1.5rem;letter-spacing:3px;text-transform:uppercase">Event Started!</span>';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');

    container.innerHTML = `
      <div class="count-box"><span class="count-num">${pad(days)}</span><span class="count-label">Days</span></div>
      <span class="count-sep">:</span>
      <div class="count-box"><span class="count-num">${pad(hours)}</span><span class="count-label">Hours</span></div>
      <span class="count-sep">:</span>
      <div class="count-box"><span class="count-num">${pad(minutes)}</span><span class="count-label">Minutes</span></div>
      <span class="count-sep">:</span>
      <div class="count-box"><span class="count-num">${pad(seconds)}</span><span class="count-label">Seconds</span></div>
    `;
  }

  update();
  setInterval(update, 1000);
}

// Initialise countdowns for each event
initCountdown('2025-12-20T18:00:00', 'countdown1');
initCountdown('2025-11-15T17:00:00', 'countdown2');
initCountdown('2026-01-25T19:00:00', 'countdown3');

// ===== SCHEDULE TABS =====
document.querySelectorAll('.schedule-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.schedule-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.schedule-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ===== FILTER BUTTONS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.event-card').forEach(card => {
      const city = card.dataset.city || '';
      if (filter === 'all' || city === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== TICKET QUANTITY =====
document.querySelectorAll('.qty-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.ticket-card');
    const numEl = card.querySelector('.qty-num');
    let val = parseInt(numEl.textContent);
    if (btn.classList.contains('plus')) {
      val = Math.min(val + 1, 10);
    } else {
      val = Math.max(val - 1, 1);
    }
    numEl.textContent = val;
    updateOrderSummary(card, val);
  });
});

function updateOrderSummary(card, qty) {
  const priceText = card.querySelector('.ticket-price')?.dataset.price;
  if (!priceText) return;
  const price = parseFloat(priceText);
  const subtotalEl = document.getElementById('order-subtotal');
  const totalEl    = document.getElementById('order-total');
  if (subtotalEl) subtotalEl.textContent = '₹' + (price * qty).toLocaleString('en-IN');
  if (totalEl)    totalEl.textContent    = '₹' + (price * qty).toLocaleString('en-IN');
}

// ===== BOOKING FORM SUBMIT =====
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = bookingForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Processing...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Booking Confirmed!';
      btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        bookingForm.reset();
      }, 3000);
    }, 1800);
  });
}

// ===== SCROLL REVEAL (simple) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.event-card, .speaker-card, .ticket-card, .schedule-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});