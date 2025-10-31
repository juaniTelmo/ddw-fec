document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // Animación scrolleo
  // -------------------------------
  const animItems = document.querySelectorAll('.animar');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  animItems.forEach(item => observer.observe(item));

  // -------------------------------
  // Modal reutilizable
  // -------------------------------
  const overlay = document.getElementById('overlay');
  const modal = document.querySelector('.modal');
  const mCerrar = document.getElementById('m-cerrar');
  const cerrar = document.getElementById('cerrar');
  const mTitulo = document.getElementById('m-titulo');
  const mImg = document.getElementById('m-img');
  const mTxt = document.getElementById('m-txt');
  const mVer = document.getElementById('m-ver');

  function openModal(data) {
    const { titulo, img, txt, link } = data;
    mTitulo.textContent = titulo || 'Sin título';
    mImg.src = img || '../images/placeholder.jpg';
    mImg.alt = titulo || 'Imagen relacionada';
    mTxt.innerHTML = generateText(titulo, txt);
    mVer.href = link || '#';
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    modal.focus();
  }

  function closeModal() {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  }

  // Abrir modal desde botones (.btn-sec)
  document.querySelectorAll('.btn-sec').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal({
        titulo: btn.dataset.t,
        img: btn.dataset.img,
        txt: btn.dataset.txt,
        link: btn.dataset.link
      });
    });
  });

  // Abrir modal desde la linea de tiempo (.time-item)
  document.querySelectorAll('.time-item').forEach(item => {
    item.addEventListener('click', () => {
      openModal({
        titulo: `${item.dataset.year || ''} — ${item.querySelector('.time-title')?.textContent || ''}`,
        img: item.dataset.img,
        txt: item.dataset.txt
      });
    });
  });

  // Cerrar modal
  [cerrar, mCerrar].forEach(btn => btn.addEventListener('click', closeModal));
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('show')) closeModal(); });

  // -------------------------------
  // Texto extendido simple
  // -------------------------------
  function generateText(titulo, txt) {
    const key = (titulo || '').toLowerCase();
    const base = `<p><em>${escapeHtml(txt || '')}</em></p>`;
    let extra = '';

    if (key.includes('deporte')) {
      extra = `<p>El deporte creció en participación y cobertura mediática. Los clubes siguieron siendo espacios sociales.</p>`;
    } else if (key.includes('política')) {
      extra = `<p>Se tomaron decisiones estatales que impactaron en economía y sociedad, con alto debate público.</p>`;
    } else if (key.includes('moda')) {
      extra = `<p>La moda combinó influencias locales y globales, con auge del diseño independiente.</p>`;
    } else if (key.includes('sociedad')) {
      extra = `<p>Hubo avances en derechos civiles y surgieron nuevas formas de participación ciudadana.</p>`;
    } else if (key.includes('econom')) {
      extra = `<p>La economía atravesó etapas de inflación y ajustes, afectando producción y consumo.</p>`;
    } else {
      extra = `<p>Más información disponible en la sección correspondiente.</p>`;
    }

    return base + extra;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[tag]));
  }
});
