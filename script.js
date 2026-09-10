// =========================================
// SETIBGE — JAVASCRIPT
// =========================================

// ---- Mobile menu ----
const hamburger = document.getElementById('hamburger');
const mainMenu = document.getElementById('mainMenu');

hamburger.addEventListener('click', () => mainMenu.classList.toggle('open'));

// No mobile, o primeiro toque em um item com submenu abre o submenu
document.querySelectorAll('.has-sub > a').forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth <= 900) {
      const li = link.parentElement;
      if (!li.classList.contains('open')) {
        e.preventDefault();
        li.classList.add('open');
      }
    }
  });
});

document.querySelectorAll('.main-menu a:not(.has-sub > a)').forEach(link => {
  link.addEventListener('click', () => mainMenu.classList.remove('open'));
});

// ---- Smooth scroll com compensação do header fixo ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || e.defaultPrevented) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('header').offsetHeight + 10;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Abas de serviços ----
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ---- Chips "Minha Unidade" ----
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    document.querySelectorAll('.unidade-grid .tag, .unidade-grid .tag-text')
      .forEach(t => { t.textContent = chip.textContent; });
  });
});

// ---- Formulário de associação ----
const form = document.getElementById('formAssociacao');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const matricula = document.getElementById('matricula').value.trim();

    if (!nome || !email || !matricula) {
      showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Por favor, insira um e-mail válido.', 'error');
      return;
    }

    const btn = form.querySelector('.btn-form');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      showToast('✅ Solicitação enviada! Entraremos em contato em até 2 dias úteis.', 'success');
      form.reset();
      btn.textContent = 'Quero me associar';
      btn.disabled = false;
    }, 1500);
  });
}

// ---- Toast ----
function showToast(message, type = 'success') {
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 9999; padding: 14px 22px;
    border-radius: 6px; font: 500 .95rem 'Roboto', sans-serif; color: #fff; max-width: 360px;
    box-shadow: 0 8px 28px rgba(0,0,0,.3); transition: opacity .3s;
    background: ${type === 'success' ? '#00A86B' : '#d62828'};
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ---- Máscara de telefone ----
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
  telefoneInput.addEventListener('input', function () {
    let val = this.value.replace(/\D/g, '').slice(0, 11);
    if (val.length > 6) val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    else if (val.length > 2) val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    else if (val.length > 0) val = `(${val}`;
    this.value = val;
  });
}
