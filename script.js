/* ========== Navbar scroll effect ========== */
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ========== Mobile nav toggle ========== */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    navMenu.classList.contains('open')
      ? (spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)',
         spans[1].style.opacity = '0',
         spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)')
      : (spans[0].style.transform = '',
         spans[1].style.opacity = '',
         spans[2].style.transform = '');
  });
}

/* ========== Mobile dropdown toggle ========== */
document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      link.closest('.dropdown').classList.toggle('open');
    }
  });
});

/* ========== Active nav link ========== */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// /* ========== Countdown Timer ========== */
// function initCountdown(targetDateStr, daysId, hoursId, minsId, secsId) {
//   const target = new Date(targetDateStr).getTime();

//   function update() {
//     const now = Date.now();
//     const diff = target - now;

//     if (diff <= 0) {
//       [daysId, hoursId, minsId, secsId].forEach(id => {
//         const el = document.getElementById(id);
//         if (el) el.textContent = '00';
//       });
//       return;
//     }

//     const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const secs  = Math.floor((diff % (1000 * 60)) / 1000);

//     const pad = n => String(n).padStart(2, '0');

//     const dEl = document.getElementById(daysId);
//     const hEl = document.getElementById(hoursId);
//     const mEl = document.getElementById(minsId);
//     const sEl = document.getElementById(secsId);

//     if (dEl) dEl.textContent = pad(days);
//     if (hEl) hEl.textContent = pad(hours);
//     if (mEl) mEl.textContent = pad(mins);
//     if (sEl) sEl.textContent = pad(secs);
//   }

//   update();
//   setInterval(update, 1000);
// }

/* ========== Event card filter ========== */
function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      eventCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ========== Scroll reveal ========== */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initFilter();
  initReveal();
});