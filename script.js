let voyages = [
    {
        id: Date.now(),
        titre: "axrtfghjjga",
        destination: "Agadir, Maroc",
        date: "2026-02-01",
        note: 5,
        image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750", // Tswira mn andek
        categorie: "Plage",
    },
    {
        id: Date.now() + 1,
        titre: "R Ifrane",
        destination: "Ifrane, Maroc",
        date: "2026-01-15",
        note: 4,
        image: "https://images.unsplash.com/photo-1548625361-125ee292299c",
        categorie: "Montagne",
    },
];
let editId = null;

const cart = document.getElementById("cart");
const addForm = document.getElementById("add-voyage");
const modalElement = document.getElementById("modal"); // F l-HTML dyalk smiytou 'modal'

// 2. MODAL CONTROLS
function openModal() {
    if (modalElement) {
        modalElement.classList.remove("hidden");
        modalElement.classList.add("flex");
    }
}

function closeModal() {
    if (modalElement) {
        modalElement.classList.add("hidden");
        modalElement.classList.remove("flex");
    }
    editId = null;
    addForm.reset();
    document.querySelector("#modal h3").textContent = "Add Destination";
}

// 3. RENDER FUNCTION
function render() {
    if (!cart) return;
    cart.innerHTML = "";

    voyages.forEach((e) => {
        const cardHTML = `
        <article class="flex flex-col shadow-2xl m-4 rounded-lg border border-black border-solid relative bg-white dark:bg-gray-800 ">
        <div class="bg-center bg-cover mx-4 mt-4 h-[30vh] lg:h-[40vh] rounded-md relative" style="background-image: url('${e.image}')">
                <button class="absolute top-2 right-3 bg-white/50 hover:bg-red-400 duration-300 h-[50px] w-[50px] rounded-full flex justify-center items-center z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8" /></svg>
                </button>
            </div>
            
            <div class="flex justify-between mx-4 mt-4">
                <h3 class="ml-2 text-lg font-bold">${e.titre}</h3>
                <div class="flex items-center gap-1">
                    <span class="font-extralight text-sm">${e.destination}</span>
                    <span class="font-extralight text-sm"> | ${e.categorie}</span>
                    <span class="font-bold text-sm ml-2">⭐ ${e.note}</span>
                </div>
            </div>
            
            <div class="flex justify-between px-2 pb-2">
                <p class="font-light text-sm">by Youssef Ait Abbou</p>
                
                <p class="font-light text-sm">${e.date}</p>
                 <div class="  bg-white w-[20%] text-black dark:bg-gray-900 dark:text-white shadow-lg  flex   gap-1  border rounded">
                <button data-id="${e.id}" class="edit-btn hover:bg-blue-500/60 rounded-lg h-10 w-full text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="ml-1" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#0031ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"/></g></svg>
                </button>
                <button data-id="${e.id}" class="delete-btn hover:bg-red-500/60 rounded-lg h-10 w-full text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="ml-1" width="24" height="24" viewBox="0 0 24 24"><path fill="#f00" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
                </button>
            </div>
            </div>
        </article>`;
        cart.innerHTML += cardHTML;
    });
}
render();

// 4. CREATE & UPDATE LOGIC
addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
        titre: document.getElementById("Titre").value, // Capital T b7al l-HTML
        destination: document.getElementById("des").value,
        note: document.getElementById("note").value,
        categorie: document.getElementById("cat").value,
        image: document.getElementById("img").value,
        date: document.getElementById("date").value,
    };

    if (editId) {
        const index = voyages.findIndex((v) => v.id == editId);
        if (index !== -1) {
            voyages[index] = { ...voyages[index], ...data };
        }
        editId = null;
    } else {
        voyages.push({ id: Date.now(), ...data });
    }

    render();
    closeModal();
});

// 5. EVENT DELEGATION
cart.addEventListener("click", (e) => {
    // Delete
    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.getAttribute("data-id");
        voyages = voyages.filter((v) => v.id != id);
        render();
    }

    // Edit (Pre-fill)
    const editBtn = e.target.closest(".edit-btn");
    if (editBtn) {
        const id = editBtn.getAttribute("data-id");
        const v = voyages.find((v) => v.id == id);
        if (v) {
            document.getElementById("Titre").value = v.titre;
            document.getElementById("des").value = v.destination;
            document.getElementById("cat").value = v.categorie;
            document.getElementById("img").value = v.image;
            document.getElementById("date").value = v.date;
            document.getElementById("note").value = v.note;
            editId = id;
            document.querySelector("#modal h3").textContent = "Edit Destination";
            openModal();
        }
    }
});

// 6. HEADER & DARK MODE
document.getElementById("menu-btn")?.addEventListener("click", () => {
    document.getElementById("mobile-menu").classList.toggle("hidden");
});

document.getElementById("dark-btn")?.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
});
