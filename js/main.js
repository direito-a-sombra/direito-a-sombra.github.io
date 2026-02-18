document.addEventListener("DOMContentLoaded", () => {
  // —— Slider (single-page panels) ——
  const page = document.getElementById("page");
  const panels = page && page.classList.contains("slider-page")
    ? Array.from(page.querySelectorAll(".panel"))
    : [];
  const panelLinks = document.querySelectorAll(".js-panel-link");

  if (panels.length > 0) {
    let active = 0;
    let lock = false;
    const duration = 650;

    const setNavActive = (index) => {
      panelLinks.forEach((link, i) => {
        link.classList.toggle("opacity-sel", i === index);
        if (i !== index) link.classList.add(`opacity-${Math.min(i, 6)}`);
      });
    };

    const go = (index) => {
      if (lock || index === active) return;
      const next = Math.max(0, Math.min(index, panels.length - 1));
      lock = true;
      active = next;
      page.style.transform = `translateX(-${active * 100}vw)`;
      setNavActive(active);
      setTimeout(() => (lock = false), duration);
    };

    page.addEventListener(
      "wheel",
      (e) => {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) <= 6) return;
        e.preventDefault();
        if (e.deltaX > 0) go(active + 1);
        else go(active - 1);
      },
      { passive: false }
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(active - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(active + 1);
      }
    });

    panelLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const idx = parseInt(link.dataset.panelIndex);
        if (!isNaN(idx)) go(idx);
      });
    });

    page.style.transition = `transform ${duration}ms ease`;
    setNavActive(0);
  }

  // —— Shade text (home panel highlights) ——
  const text = document.getElementById("shade-text");
  if (!text) return;

  let activeKey = null;

  const clearDetail = () => {
    document.body.classList.remove("detail-open");
    document.querySelectorAll(".sentence.active").forEach((node) => node.classList.remove("active"));
    activeKey = null;
  };

  const setDetail = (key) => {
    if (!key) return;
    if (activeKey === key && document.body.classList.contains("detail-open")) {
      clearDetail();
      return;
    }
    document.querySelectorAll(".sentence.active").forEach((node) => node.classList.remove("active"));
    const activeSentence = text.querySelector(`.sentence[data-key="${key}"]`);
    if (activeSentence) activeSentence.classList.add("active");
    activeKey = key;
    document.body.classList.add("detail-open");
  };

  text.addEventListener("click", (event) => {
    const trigger = event.target.closest(".highlight");
    if (!trigger) return;
    setDetail(trigger.getAttribute("data-key"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") clearDetail();
  });
});
