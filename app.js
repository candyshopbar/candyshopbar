document.addEventListener("DOMContentLoaded", () => {

  // --- LOADER LOGIC ---
  const loadingScreen = document.getElementById("loading-screen");

  // Machine animation: stream starts at 0.8s, cup fills at 1.8s, coffee-fill at 3.2s
  // Total visible time ~4.5s
  setTimeout(() => {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 900);
    }, 4200);
  }, 100);

  // --- NAVBAR: hide deal bar on scroll ---
  const dealBar = document.getElementById("deal-bar");
  const handleNavScroll = () => {
    if (!dealBar) return;
    const currentScrollY = window.scrollY;
    if (currentScrollY > 80) {
      dealBar.style.maxHeight = "0";
      dealBar.style.overflow = "hidden";
      dealBar.style.padding = "0";
      dealBar.style.opacity = "0";
    } else {
      dealBar.style.maxHeight = "";
      dealBar.style.overflow = "";
      dealBar.style.padding = "";
      dealBar.style.opacity = "";
    }
  };

  // Smooth transition for deal bar
  if (dealBar) {
    dealBar.style.transition = "max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease";
  }

  // --- SCROLL LISTENER ---
  window.addEventListener("scroll", handleNavScroll, { passive: true });

  // --- CONTACT FORM HANDLING ---
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");
  const submitBtn = document.getElementById("contact-submit");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = "Wird gesendet...";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          contactForm.reset();
          formSuccess.style.display = "block";
          submitBtn.querySelector('.btn-text').textContent = "✅ Gesendet!";
          setTimeout(() => {
            formSuccess.style.display = "none";
            submitBtn.querySelector('.btn-text').textContent = "Nachricht senden";
            submitBtn.disabled = false;
          }, 5000);
        } else {
          // Fallback: open mailto
          openMailtoFallback(formData);
          submitBtn.querySelector('.btn-text').textContent = "Nachricht senden";
          submitBtn.disabled = false;
        }
      } catch (err) {
        // Fallback: open mailto
        openMailtoFallback(formData);
        submitBtn.querySelector('.btn-text').textContent = "Nachricht senden";
        submitBtn.disabled = false;
      }
    });
  }

  function openMailtoFallback(formData) {
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const subject = formData.get("subject") || "Nachricht von der Website";
    const message = formData.get("message") || "";
    const body = `Name: ${name}\nE-Mail: ${email}\n\n${message}`;
    const mailtoLink = `mailto:farrukhkhan1008@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  // --- SCROLL ANIMATIONS (Intersection Observer) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => scrollObserver.observe(el));

});

// --- ROUTE MODAL ---
function openRouteModal() {
  const modal = document.getElementById("route-modal");
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeRouteModal() {
  const modal = document.getElementById("route-modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeRouteModal();
  }
});
