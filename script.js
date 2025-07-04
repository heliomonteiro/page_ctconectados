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

// MODAL GALERIA
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalMedia = document.getElementById("modal-media");
const modalThumbs = document.getElementById("modal-thumbs");

function createVideoThumbnail(videoUrl) {
  const wrapper = document.createElement("div");
  wrapper.className = "video-thumb";
  const img = document.createElement("img");
  img.src = "https://img.youtube.com/vi/" + getYouTubeID(videoUrl) + "/0.jpg";
  const playIcon = document.createElement("span");
  playIcon.textContent = "▶";
  playIcon.className = "play-icon";
  wrapper.appendChild(img);
  wrapper.appendChild(playIcon);
  return wrapper;
}

function getYouTubeID(url) {
  const match = url.match(/[?&]v=([^&#]*)|youtu\.be\/([^&#]*)|embed\/([^&#]*)/);
  return match ? match[1] || match[2] || match[3] : "";
}

function renderGallery(gallery) {
  modalThumbs.innerHTML = '';
  modalMedia.innerHTML = '';

  gallery.forEach((src, i) => {
    let thumb, full;
    const isVideo = src.includes("youtube") || src.includes(".mp4");

    if (isVideo) {
      full = document.createElement("iframe");
      full.src = src;
      full.allowFullscreen = true;
      full.frameBorder = 0;
      full.className = i === 0 ? "main" : "hidden";

      thumb = createVideoThumbnail(src);
    } else {
      full = document.createElement("img");
      full.src = src;
      full.className = i === 0 ? "main" : "hidden";

      thumb = document.createElement("img");
      thumb.src = src;
    }

    if (i === 0) {
      modalMedia.appendChild(full);
      thumb.classList.add("active");
    } else {
      full.style.display = 'none';
      modalMedia.appendChild(full);
    }

    thumb.addEventListener("click", () => {
      document.querySelectorAll("#modal-media > *").forEach(m => m.style.display = 'none');
      full.style.display = 'block';
      document.querySelectorAll("#modal-thumbs > *").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });

    modalThumbs.appendChild(thumb);
  });
}

document.querySelectorAll(".btn-modal").forEach(btn => {
  btn.onclick = e => {
    const card = e.target.closest(".card");
    const title = card.dataset.title || "";
    const desc = card.dataset.desc || "";
    let gallery = [];

    if (card.dataset.gallery) {
      try {
        gallery = JSON.parse(card.dataset.gallery);
      } catch (err) {
        console.error("Erro ao interpretar galeria:", err);
      }
    } else if (card.dataset.video) {
      gallery = [card.querySelector("img")?.src || "", card.dataset.video];
    }

    if (gallery.length > 0) {
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      renderGallery(gallery);
      modal.style.display = "flex";
    } else {
      alert("Conteúdo da galeria indisponível.");
    }
  };
});

document.querySelector(".close").onclick = () => {
  modal.style.display = "none";
  modalMedia.innerHTML = "";
  modalThumbs.innerHTML = "";
};

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalMedia.innerHTML = "";
    modalThumbs.innerHTML = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
    modalMedia.innerHTML = "";
    modalThumbs.innerHTML = "";
    modalFullscreen.style.display = "none";
  }
});

// MODAL FULLSCREEN
const modalFullscreen = document.getElementById("modal-fullscreen");
document.querySelector(".btn-fullscreen").onclick = () => {
  modalFullscreen.style.display = "block";
};
document.querySelector(".close-fullscreen").onclick = () => {
  modalFullscreen.style.display = "none";
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

// ANIMAÇÃO DE ENTRADA DOS CARDS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll(".card").forEach(card => observer.observe(card));