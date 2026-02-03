

    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    btn.addEventListener('click', () => {
      const isExpanded = menu.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', !isExpanded);
    });

    const btnD = document.getElementById('dark-btn');
    const html = document.documentElement;

    btnD.addEventListener('click', () => {
      html.classList.toggle('dark');
    });

 const btnPhoto = document.getElementById('photo-menu');
    const menuPhoto = document.getElementById('photo-menu-mobil');
    
    btnPhoto.addEventListener('click', () => {
      const isExpanded = menuPhoto.classList.toggle('hidden');
      btnPhoto.setAttribute('aria-expanded', !isExpanded);
    });
