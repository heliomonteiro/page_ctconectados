// HERO ROTATIVO
const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?q=80&w=1171&auto=format&fit=crop",
    title: "Cross",
    desc: "Alta intensidade pra desafiar seus limites."
  },
  {
    src: "https://hyrox.com/wp-content/uploads/2023/03/HYROX-Event.jpg",
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

// MODAL
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
document.querySelector(".close").onclick = () => {
  modal.style.display = "none";
  modalVideo.src = "";
};
window.onclick = e => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalVideo.src = "";
  }
};

// CARROSSEL COM SETAS
document.querySelectorAll(".carrossel-btn").forEach(btn => {
  btn.onclick = () => {
    const targetId = btn.dataset.target;
    const container = document.getElementById(targetId);
    const scrollAmount = 300;
    container.scrollBy({
      left: btn.classList.contains("right") ? scrollAmount : -scrollAmount,
      behavior: "smooth"
    });
  };
});
