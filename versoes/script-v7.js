// HERO ROTATIVO
const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?q=80&w=1171&auto=format&fit=crop",
    title: "Cross",
    desc: "Alta intensidade pra desafiar seus limites."
  },
  {
    src: "https://hyrox.com/wp-content/uploads/2025/02/The-HYROX-family.webp",
    title: "Hyrox",
    desc: "Corrida e força num desafio híbrido global."
  },
  {
    src: "https://images.unsplash.com/photo-1536922246289-88c42f957773?q=80&w=1204&auto=format&fit=crop",
    title: "Escalada",
    desc: "Técnica, resistência e adrenalina vertical."
  }
];

let current = 0;
function updateHero() {
  const item = heroImages[current];
  document.getElementById("hero-img").src = item.src;
  document.getElementById("hero-title").textContent = item.title;
  document.getElementById("hero-desc").textContent = item.desc;
  current = (current + 1) % heroImages.length;
}
updateHero();
setInterval(updateHero, 5000);

// MODAL DE VÍDEO DAS MODALIDADES
const modal = document.getElementById("modal");
const modalVideo = document.getElementById("modal-video");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
document.querySelectorAll(".btn-modal").forEach(btn => {
  btn.onclick = e => {
    const card = e.target.closest(".card");
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalVideo.src = card.dataset.video;
    modal.style.display = "flex";
  };
});
document.querySelector(".modal .close").onclick = () => {
  modal.style.display = "none";
  modalVideo.src = "";
};
window.onclick = e => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalVideo.src = "";
  }
};

// MODAL EXTRA COMPARATIVO + INCLUSIVO
const modalExtra = document.getElementById("modal-extra");
document.getElementById("btn-compara-extra").onclick = () => {
  modalExtra.style.display = "flex";
};
modalExtra.querySelector(".close").onclick = () => {
  modalExtra.style.display = "none";
};
window.onclick = e => {
  if (e.target === modalExtra) {
    modalExtra.style.display = "none";
  }
};

// ANIMAÇÃO AO ROLAR (Cards e Seções)
const fadeUps = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeUps.forEach(el => observer.observe(el));


// GALERIA DE IMAGENS DINÂMICA
const modalGaleria = document.createElement("div");
modalGaleria.className = "galeria";
modal.querySelector(".modal-content").insertBefore(modalGaleria, modalTitle);

document.querySelectorAll(".btn-modal").forEach(btn => {
  btn.onclick = e => {
    const card = e.target.closest(".card");
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalVideo.src = card.dataset.video;

    modalGaleria.innerHTML = "";
    const gallery = card.dataset.gallery?.split(",");
    if (gallery) {
      gallery.forEach(url => {
        const img = document.createElement("img");
        img.src = url.trim();
        img.alt = card.dataset.title;
        modalGaleria.appendChild(img);
      });
    }

    modal.style.display = "flex";
  };
});

