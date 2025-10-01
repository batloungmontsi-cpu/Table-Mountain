/* ==================== HOME PAGE ==================== */
document.addEventListener("DOMContentLoaded", () => {
  const isHome = document.body.classList.contains("home");
  if (isHome) {

    // 1. Dynamic Welcome Message
    function showWelcome() {
      const now = new Date();
      const message = `Welcome! Today is ${now.toDateString()} and the time is ${now.toLocaleTimeString()}.`;
      document.getElementById("welcome").textContent = message;
    }
    showWelcome();

    // 2. Background Image Button
    const bgImages = ["11background2.jpg", "OPTION22.jpg", "Tablemountain9.jpg"];
    let bgIndex = 0;

    function changeBackground() {
      document.body.style.backgroundImage = `url('${bgImages[bgIndex]}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";

      bgIndex = (bgIndex + 1) % bgImages.length; // cycle images
    }

    document.getElementById("bgBtn")?.addEventListener("click", changeBackground);

    // 3. Slideshow
    const slides = ["tableMOUNT.jpg", "Park review.webp", "Park review2.webp"];
    let index = 0;

    function showSlide(i) {
      document.getElementById("slide").src = slides[i];
    }

    document.getElementById("nextBtn")?.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      showSlide(index);
    });

    document.getElementById("prevBtn")?.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    });

    showSlide(index);
  }
});

/* ==================== ABOUT PAGE ==================== */
document.addEventListener("DOMContentLoaded", () => {
  const isAbout = document.body.classList.contains("about");
  if (!isAbout) return;

  const container = document.getElementById("destination-info");

  // Destination data
  const destination = {
    name: "Table Mountain",
    history: `Table Mountain has been a landmark for centuries. Its flat summit and dramatic cliffs
              were used as navigational markers by early sailors. Over time the area developed
              cultural and ecological significance and the mountain is now a protected heritage site.`,
    culture: `The mountain and surrounding areas are important to local communities — from the Khoisan
              heritage to contemporary Cape Town culture. It features in local stories, art, and
              celebrations, and remains a symbol of identity for many residents.`,
    attractions: [
      { title: "Platteklip Gorge", desc: "The most direct hiking route to the summit — steep but rewarding." },
      { title: "Table Mountain Aerial Cableway", desc: "A quick ride up with panoramic views, open most days." },
      { title: "Signal Hill & Lion's Head", desc: "Close viewpoints offering spectacular sunrise and sunset vantage points." }
    ]
  };

  // Render destination info
  const renderDestination = (dest) => {
    const attractionsHtml = dest.attractions
      .map(a => `<li><strong>${a.title}</strong>: ${a.desc}</li>`)
      .join("");

    const html = `
      <h2>About ${dest.name}</h2>

      <div class="about-section__block">
        <h3>History</h3>
        <p>${dest.history}</p>
      </div>

      <div class="about-section__block">
        <h3>Culture</h3>
        <p>${dest.culture}</p>
      </div>

      <div class="about-section__block">
        <h3>Must-See Attractions</h3>
        <ul>${attractionsHtml}</ul>
      </div>
    `;
    container.innerHTML = html;
  };

  renderDestination(destination);

  // Show More / Show Less toggle
  const toggleBtn = document.getElementById("toggleInfoBtn");
  const extraInfo = document.getElementById("extraInfo");

  if (toggleBtn && extraInfo) {
    toggleBtn.addEventListener("click", () => {
      if (extraInfo.style.display === "none" || extraInfo.style.display === "") {
        extraInfo.style.display = "block";
        toggleBtn.textContent = "Show Less";
      } else {
        extraInfo.style.display = "none";
        toggleBtn.textContent = "Show More";
      }
    });
  }

  // ----------------- FUN FACT -----------------
  const funFactBtn = document.getElementById("funFactBtn");
  const funfact = document.getElementById("funfact");

  if (funFactBtn && funfact) {
    const funFacts = [
      "Table Mountain is home to more plant species than the entire United Kingdom—over 2,200 unique species!",
      "The cable car on Table Mountain rotates 360° during the trip for panoramic views.",
      "Table Mountain’s flat top is over 3 km long from side to side.",
      "Table Mountain is one of the New7Wonders of Nature.",
      "The mountain can be seen from almost anywhere in Cape Town."
    ];

    const randomIndex = Math.floor(Math.random() * funFacts.length);
    funfact.textContent = funFacts[randomIndex];

    funFactBtn.addEventListener("click", () => {
      if (funfact.style.display === "none" || funfact.style.display === "") {
        funfact.style.display = "block";
      } else {
        funfact.style.display = "none";
      }
    });
  }
});

/* ==================== GALLERY PAGE ==================== */
document.addEventListener("DOMContentLoaded", () => {
  const isGallery = document.body.classList.contains("gallery-page");
  if (!isGallery) return;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const galleryImages = document.querySelectorAll(".gallery-img");
  const galleryFigures = document.querySelectorAll(".gallery figure");

  let currentIndex = 0;

  // LIGHTBOX FUNCTIONS
  function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "block";
    lightboxImg.src = galleryImages[index].src;
    captionText.textContent = galleryImages[index].alt;
  }

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  function getVisibleIndices() {
    const indices = [];
    galleryFigures.forEach((figure, i) => {
      if (figure.style.display !== "none") indices.push(i);
    });
    return indices;
  }

  function nextImage() {
    const visible = getVisibleIndices();
    const currentVisible = visible.indexOf(currentIndex);
    const nextVisible = (currentVisible + 1) % visible.length;
    openLightbox(visible[nextVisible]);
  }

  function prevImage() {
    const visible = getVisibleIndices();
    const currentVisible = visible.indexOf(currentIndex);
    const prevVisible = (currentVisible - 1 + visible.length) % visible.length;
    openLightbox(visible[prevVisible]);
  }

  // Image click
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  // Close
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard support
  document.addEventListener("keydown", e => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    }
  });

  // Next/Prev buttons
  const nextBtn = document.createElement("span");
  nextBtn.innerHTML = "&#10095;";
  nextBtn.classList.add("next-btn");
  lightbox.appendChild(nextBtn);

  const prevBtn = document.createElement("span");
  prevBtn.innerHTML = "&#10094;";
  prevBtn.classList.add("prev-btn");
  lightbox.appendChild(prevBtn);

  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

  // FILTER FUNCTIONALITY
  const filterButtons = document.querySelectorAll(".filter-buttons button");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-filter");

      // Highlight active button
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Show/hide figures
      galleryFigures.forEach(figure => {
        if (category === "all" || figure.dataset.category === category) {
          figure.style.display = "block";
        } else {
          figure.style.display = "none";
        }
      });

      // Close lightbox if hidden
      if (lightbox.style.display === "block") {
        const visible = getVisibleIndices();
        if (!visible.includes(currentIndex)) closeLightbox();
      }
    });
  });

  // HOVER EFFECTS
  galleryFigures.forEach(figure => {
    figure.addEventListener("mouseenter", () => {
      figure.style.transform = "scale(1.05)";
      figure.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      figure.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.3)";
    });

    figure.addEventListener("mouseleave", () => {
      figure.style.transform = "scale(1)";
      figure.style.boxShadow = "none";
    });
  });

  /* ==================== WEATHER FETCH FOR GALLERY PAGE ==================== */
  async function fetchGalleryWeather() {
    try {
      const url = "https://api.open-meteo.com/v1/forecast?latitude=-33.9258&longitude=18.4232&current_weather=true";
      const response = await fetch(url);
      const data = await response.json();

      const weather = data.current_weather;
      const weatherInfo = document.getElementById("weather-info");

      const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Drizzle: Light",
        53: "Drizzle: Moderate",
        55: "Drizzle: Dense",
        56: "Freezing Drizzle: Light",
        57: "Freezing Drizzle: Dense",
        61: "Rain: Slight",
        63: "Rain: Moderate",
        65: "Rain: Heavy",
        66: "Freezing Rain: Light",
        67: "Freezing Rain: Heavy",
        71: "Snow fall: Slight",
        73: "Snow fall: Moderate",
        75: "Snow fall: Heavy",
        77: "Snow grains",
        80: "Rain showers: Slight",
        81: "Rain showers: Moderate",
        82: "Rain showers: Violent",
        85: "Snow showers: Slight",
        86: "Snow showers: Heavy",
        95: "Thunderstorm: Slight",
        96: "Thunderstorm: Moderate",
        99: "Thunderstorm: Heavy"
      };

      const condition = weatherCodes[weather.weathercode] || "Unknown";

      weatherInfo.textContent = `🌡️ ${weather.temperature}°C | ${condition} | 🌬️ Wind: ${weather.windspeed} km/h`;
    } catch (error) {
      document.getElementById("weather-info").textContent = "Failed to load weather data.";
      console.error("Weather fetch error:", error);
    }
  }

  fetchGalleryWeather();
});