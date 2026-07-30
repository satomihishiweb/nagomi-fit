/* ==========================================================
   Nagomi Fit | main.js
   ヘッダー / モバイルメニュー / FAQ / スクロール表示
   ========================================================== */

/* ---------- ヘッダー：40px以上スクロールしたら .scrolled を付ける ---------- */
const header = document.getElementById('site-header');

if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- モバイルメニュー：ハンバーガーで開閉 ---------- */
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });

  // メニュー内のリンクを押したら閉じる
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    });
  });
}

/* ---------- FAQ：クリックで開閉するアコーディオン ---------- */
document.querySelectorAll('.faq-q').forEach((q) => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const answer = item.querySelector('.faq-a');
    const open = item.classList.toggle('open');
    answer.style.maxHeight = open ? answer.scrollHeight + 'px' : null;
  });
});

/* ---------- スクロールで要素をフワッと表示 ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));