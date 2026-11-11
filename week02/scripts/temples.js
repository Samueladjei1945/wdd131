// Footer: current year and last-modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;

// Hamburger menu: toggle navigation and swap the symbol
const menuButton = document.getElementById("menu");
const navigation = document.getElementById("primary-nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.innerHTML = isOpen ? "&#10005;" : "&#9776;"; // ✕ when open, ☰ when closed
});
