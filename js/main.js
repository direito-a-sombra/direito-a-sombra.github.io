document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  const text = document.getElementById("shade-text");
  if (!text) return;

  let activeKey = null;

  const clearDetail = () => {
    document.body.classList.remove("detail-open");
    document.querySelectorAll(".sentence.active").forEach((node) => {
      node.classList.remove("active");
    });
    activeKey = null;
  };

  const setDetail = (key) => {
    if (!key) return;
    if (activeKey === key && document.body.classList.contains("detail-open")) {
      clearDetail();
      return;
    }

    document.querySelectorAll(".sentence.active").forEach((node) => {
      node.classList.remove("active");
    });

    const activeSentence = text.querySelector(`.sentence[data-key="${key}"]`);
    if (activeSentence) activeSentence.classList.add("active");
    activeKey = key;
    document.body.classList.add("detail-open");
  };

  text.addEventListener("click", (event) => {
    const trigger = event.target.closest(".highlight");
    if (!trigger) return;
    const key = trigger.getAttribute("data-key");
    setDetail(key);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      clearDetail();
    }
  });
});
