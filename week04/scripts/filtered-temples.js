// Footer: current year and last-modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;

// Hamburger menu: toggle navigation and swap the symbol
const menuButton = document.getElementById("menu");
const navigation = document.getElementById("primary-nav");

function setMenuState(isOpen) {
  navigation.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "\u00d7" : "\u2630";
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

menuButton.addEventListener("click", () => {
  setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    setMenuState(false);
    menuButton.focus();
  }
});

const desktopView = window.matchMedia("(min-width: 700px)");
desktopView.addEventListener("change", (event) => {
  if (event.matches) {
    setMenuState(false);
  }
});

// Temple data
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Three additional temples
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/5de4eea2484dc25b0d4239e59d34905ff8b5c4fe/full/!320,/0/default"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/c8f9e392284fb5ab45815e69507af83d668097bd/full/!320,/0/default"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/60ecad34b8ccba920297633d3f3b4763a7785667/full/!320,/0/default"
  }
];

const gallery = document.getElementById("gallery");
const pageTitle = document.querySelector("main h1");
const navLinks = document.querySelectorAll("#primary-nav a");

// Get the dedication year as a number from a string like "2005, August, 7"
function getYear(temple) {
  return parseInt(temple.dedicated.split(",")[0]);
}

// Build and show a card for every temple in the list
function displayTemples(templeList) {
  gallery.innerHTML = "";

  if (templeList.length === 0) {
    gallery.textContent = "No temples match this filter.";
    return;
  }

  templeList.forEach((temple) => {
    const card = document.createElement("figure");
    const image = document.createElement("img");
    image.src = temple.imageUrl;
    image.alt = `${temple.templeName} Temple`;
    image.width = 400;
    image.height = 250;
    image.loading = "lazy";

    const caption = document.createElement("figcaption");
    const name = document.createElement("h2");
    name.textContent = temple.templeName;
    caption.appendChild(name);

    [
      ["Location", temple.location],
      ["Dedicated", temple.dedicated],
      ["Size", `${temple.area.toLocaleString()} sq ft`]
    ].forEach(([label, value]) => {
      const paragraph = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = `${label}:`;
      paragraph.append(strong, ` ${value}`);
      caption.appendChild(paragraph);
    });

    card.append(image, caption);
    gallery.appendChild(card);
  });
}

// Filters for each menu item
const filters = {
  home: () => temples,
  old: () => temples.filter((temple) => getYear(temple) < 1900),
  new: () => temples.filter((temple) => getYear(temple) > 2000),
  large: () => temples.filter((temple) => temple.area > 90000),
  small: () => temples.filter((temple) => temple.area < 10000)
};

// Respond to the main navigation
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const filtered = filters[link.id]();
    displayTemples(filtered);
    pageTitle.textContent = link.textContent;
    navLinks.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    });
    link.classList.add("active");
    link.setAttribute("aria-current", "page");

    // Close the mobile navigation after a filter is selected.
    setMenuState(false);
  });
});

setMenuState(false);

// Show every temple when the page loads
displayTemples(temples);
