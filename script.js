/* =========================================================
   SETIBGE-CE — comportamento compartilhado
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Busca do cabeçalho ---------- */
  const searchToggle = document.querySelector('.search-toggle');
  const searchBox = document.getElementById('headerSearch');

  if (searchToggle && searchBox) {
    searchToggle.addEventListener('click', () => {
      const open = searchBox.classList.toggle('open');
      searchToggle.setAttribute('aria-expanded', String(open));
      if (open) searchBox.querySelector('input').focus();
    });
    searchBox.addEventListener('submit', (e) => {
      e.preventDefault();
      const termo = searchBox.querySelector('input').value.trim();
      showToast(
        termo
          ? 'A busca será ligada ao acervo do site na publicação. Termo registrado: ' + termo
          : 'Digite um termo para buscar.',
        termo ? 'success' : 'error'
      );
    });
  }

  /* ---------- Carrossel ---------- */
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const dotsWrap = carousel.querySelector('.carousel-dots');
    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Ir para o destaque ' + (i + 1));
      dot.addEventListener('click', () => go(i, true));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function go(i, manual) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      slides.forEach((s, n) => s.setAttribute('aria-hidden', String(n !== index)));
      dots.forEach((d, n) => d.setAttribute('aria-selected', String(n === index)));
      if (manual) restart();
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(() => go(index + 1), 7000);
    }

    carousel.querySelector('.prev').addEventListener('click', () => go(index - 1, true));
    carousel.querySelector('.next').addEventListener('click', () => go(index + 1, true));
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', restart);
    carousel.addEventListener('focusin', () => clearInterval(timer));

    go(0);
    restart();
  });

  /* ---------- Abas ---------- */
  document.querySelectorAll('[role="tablist"]').forEach((list) => {
    const tabs = Array.from(list.querySelectorAll('[role="tab"]'));

    function select(tab) {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e) => {
        let next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (next) {
          e.preventDefault();
          select(next);
          next.focus();
        }
      });
    });
  });

  /* ---------- Chips de filtro ---------- */
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const chips = Array.from(group.querySelectorAll('.chip'));
    const targets = Array.from(
      document.querySelectorAll('[data-filter-item="' + group.dataset.filterGroup + '"]')
    );

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
        const cat = chip.dataset.cat;
        targets.forEach((item) => {
          item.hidden = cat !== 'todos' && item.dataset.cat !== cat;
        });
      });
    });
  });

  /* ---------- FAQ ---------- */
  document.querySelectorAll('.faq-q').forEach((q) => {
    q.addEventListener('click', () => {
      const open = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', String(!open));
      document.getElementById(q.getAttribute('aria-controls')).hidden = open;
    });
  });

  /* ---------- Revelação no scroll ---------- */
  const revealables = document.querySelectorAll('.reveal');
  if (revealables.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px' }
    );
    revealables.forEach((el) => io.observe(el));
  }

  /* ---------- Tagline palavra a palavra ---------- */
  const tagline = document.querySelector('[data-tagline]');
  if (tagline) {
    const words = tagline.textContent.trim().split(/\s+/);
    tagline.textContent = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'w';
      span.textContent = word;
      span.style.transitionDelay = i * 60 + 'ms';
      tagline.appendChild(span);
      tagline.appendChild(document.createTextNode(' '));
    });

    const wio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
            wio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6, rootMargin: '0px 0px -15%' }
    );
    tagline.querySelectorAll('.w').forEach((w) => wio.observe(w));
  }

  /* ---------- Máscara de telefone ---------- */
  document.querySelectorAll('input[type="tel"]').forEach((input) => {
    input.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
      else if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      else if (v.length > 0) v = '(' + v;
      this.value = v;
    });
  });

  /* ---------- Validação de formulários ---------- */
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(input, message) {
    const holder = input.closest('.field');
    const slot = holder && holder.querySelector('.field-error');
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (slot) slot.textContent = message || '';
  }

  document.querySelectorAll('form[data-validate]').forEach((form) => {
    const inputs = Array.from(form.querySelectorAll('input, textarea'));

    inputs.forEach((input) => {
      input.addEventListener('blur', () => validate(input));
      input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') validate(input);
      });
    });

    function validate(input) {
      const value = input.value.trim();
      if (input.required && !value) {
        setError(input, 'Campo obrigatório.');
        return false;
      }
      if (input.type === 'email' && value && !EMAIL.test(value)) {
        setError(input, 'Informe um e-mail válido.');
        return false;
      }
      if (input.type === 'tel' && value && value.replace(/\D/g, '').length < 10) {
        setError(input, 'Informe o telefone com DDD.');
        return false;
      }
      setError(input, '');
      return true;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const invalid = inputs.map(validate).filter((ok) => !ok).length;

      if (invalid) {
        showToast('Revise os campos destacados para continuar.', 'error');
        const first = inputs.find((i) => i.getAttribute('aria-invalid') === 'true');
        if (first) first.focus();
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const label = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Enviando...';

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = label;
        form.reset();
        inputs.forEach((i) => setError(i, ''));
        showToast(form.dataset.success || 'Mensagem enviada. A secretaria responde em até 2 dias úteis.');
      }, 1200);
    });
  });

  /* ---------- Toast ---------- */
  function showToast(message, type) {
    const old = document.querySelector('.toast');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.className = 'toast toast-' + (type === 'error' ? 'error' : 'success');
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 4500);
  }

  window.showToast = showToast;
})();
