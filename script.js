


// 1. Définition de l'état global
let voyages = [
    {
        id: Date.now(), // ID unique b l-waqt
        titre: "Ghouroub f Agadir",
        destination: "Agadir, Maroc",
        date: "2026-02-01",
        note: 5,
        image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750", // Tswira mn andek
        categorie: "Plage"
    },
    {
        id: Date.now() + 1,
        titre: "Randonnée f Ifrane",
        destination: "Ifrane, Maroc",
        date: "2026-01-15",
        note: 4,
        image: "https://images.unsplash.com/photo-1548625361-125ee292299c",
        categorie: "Montagne"
    }
];
const cart = document.getElementById('cart');

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
