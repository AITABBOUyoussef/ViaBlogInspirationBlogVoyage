



let voyages = [
    {
        id: Date.now(), 
        titre: "axrtfghjjga",
        destination: "Agadir, Maroc",
        date: "2026-02-01",
        note: 5,
        image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750", // Tswira mn andek
        categorie: "Plage"
    },
    {
        id: Date.now() + 1,
        titre: "R Ifrane",
        destination: "Ifrane, Maroc",
        date: "2026-01-15",
        note: 4,
        image: "https://images.unsplash.com/photo-1548625361-125ee292299c",
        categorie: "Montagne"
    }
];
let editId = null; //ila kan null ka3ni ajot ola ila kan fih ra9m kay3ni modi


const cart = document.getElementById('cart');

function render() {
    cart.innerHTML = "";
    voyages.forEach((e) => {
        
        const cardHTML = ` 
        <article class="flex flex-col h-min shadow-2xl m-4 rounded-lg border border-black border-solid relative">
            <button class="menu-btn focus:outline-none absolute top-1 right-1 z-10" aria-label="Open Menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="2.5" r=".75"/><circle cx="8" cy="8" r=".75"/><circle cx="8" cy="13.5" r=".75"/></g></svg>
            </button>

            <div class="menu-mobil hidden lg:w-[20%] w-[30%] bg-white text-black dark:bg-gray-900 dark:text-white shadow-lg absolute top-5 right-0 flex flex-col items-center gap-1 py-4 z-50">
                <button data-id="${e.id} class="edit-btn hover:bg-green-500/60 rounded-lg h-10 w-full text-center">Modifier</button>
                <button data-id="${e.id} " class=" delete-btn hover:bg-green-500/60 rounded-lg h-10 w-full text-center">Supprimer</button>
            </div>

            <div class="bg-center bg-cover mx-4 mt-4 h-[30vh] lg:h-[40vh] rounded-md relative" style="background-image: url('${e.image}')">
                <a href="detail.html" class="absolute inset-0 z-0"></a>
                <button class="absolute top-2 right-3 bg-white/50 hover:bg-red-400 duration-300 h-[50px] w-[50px] rounded-full flex justify-center items-center z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8" /></svg>
                </button>
            </div>
            
            <div class="flex justify-between mx-4 mt-4">
                <h3 class="ml-2 text-lg font-bold">${e.titre}</h3>
                <div class="flex items-center gap-1">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="17.93" r="4.82" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" d="M24 43.83c.43 0 1.26-.11 1.26-1.74h0c0-5.14 7.27-10.78 10.57-17.15a13.76 13.76 0 1 0-23.66 0c3.3 6.37 10.57 12 10.57 17.15c0 1.63.83 1.74 1.26 1.74" stroke-width="2"/></svg>
          
                    <span class="font-extralight text-sm">${e.destination}</span>
                    <span class="font-extralight text-sm"> | ${e.categorie}</span>
                    <span class="font-bold text-sm ml-2">⭐ ${e.note}</span>
                </div>
            </div>
            <div class="flex justify-between">
            <p class="ml-6 font-light mb-2">by Youssef Ait Abbou</p>
            <p class="mr-6 font-light mb-2">${e.date}</p>
             </div>
        </article>`;
        
        cart.innerHTML += cardHTML;
    });
}
render();
// boton kabab
cart.addEventListener('click', (e) => {
    
    // 2. Chid l-bouton li t-cliqua (wakha t-cliqua wast l-SVG)
    const btn = e.target.closest('.menu-btn');
    
    if (btn) {
        // 3. 9leb 3la l-menu li "jâr" had l-bouton (next sibling)
        const menu = btn.nextElementSibling;
        
        // 4. Toggle l-class 'hidden' (Ila kant t-7iyed, ila maktch t-zad)
        menu.classList.toggle('hidden');
        
        //  Sed ga3 l-menus l-khrin bach tbqa ghir we7da m7loula ---
        document.querySelectorAll('.menu-mobil').forEach(m => {
            if (m !== menu) m.classList.add('hidden');
        });
    }
});


//btn delete
cart.addEventListener('click' , (e)=>{
    if(e.target.classList.contains('delete-btn')){
        const idDelete = e.target.getAttribute('data-id');
        voyages = voyages.filter(v => v.id != idDelete);
        render();
    }
});

// mod form
cart.addEventListener('click' , (e) => {
    const editbtn = e.target.closest('.edit-btn');
    if(editbtn){
        const id = editbtn.getAttribute('data-id');
        const voyagesEdit = voyages.find(v=> v.id == id) ;
        if(voyagesEdit){
            document.getElementById('Titre').value = voyagesEdit.titre;
            document.getElementById('des').value = voyagesEdit.destination;
            document.getElementById('cat').value = voyagesEdit.categorie;
            document.getElementById('img').value = voyagesEdit.image;
            document.getElementById('date').value = voyagesEdit.date;
            document.getElementById('note').value = voyagesEdit.note;

            editId = id ;
            document.querySelector('#voyage-modal h2').textContent = "Edite Voyage";
            openModal();


        }
    }
});


// add form
const addForm = document.getElementById('add-voyage');
addForm.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const newVoyage = {
        id: Date.now(),
        titre:document.getElementById('Titre').value,
        destination:document.getElementById('des').value,
        note:document.getElementById('note').value,
        categorie:document.getElementById('cat').value,
        image:document.getElementById('img').value,
        date:document.getElementById('date').value,
    };
    voyages.push(newVoyage);
    render();
    addForm.reset();
    
    
});


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
