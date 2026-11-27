// Footer content shared by the form and confirmation pages.
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;

const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

const productSelect = document.getElementById("product");
if (productSelect) {
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
}

if (document.body.dataset.page === "review") {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");
  const rating = Number(params.get("rating"));
  const installationDate = params.get("installationDate") ?? "";
  const date = new Date(`${installationDate}T00:00:00Z`);
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(installationDate)
    && !Number.isNaN(date.getTime())
    && date.toISOString().slice(0, 10) === installationDate;
  const product = products.find((item) => item.id === productId);
  const validSubmission = Boolean(
    product
    && Number.isInteger(rating)
    && rating >= 1
    && rating <= 5
    && validDate
  );

  const status = document.getElementById("review-status");
  const invalidMessage = document.getElementById("invalid-submission");
  const details = document.getElementById("review-details");
  const counter = document.getElementById("review-counter");

  if (validSubmission) {
    const featureLabels = {
      "easy-to-use": "Easy to use",
      durable: "Durable",
      "good-value": "Good value",
      performance: "Works as expected"
    };
    const features = params.getAll("features")
      .filter((feature) => Object.hasOwn(featureLabels, feature))
      .map((feature) => featureLabels[feature]);
    const storedCount = Number(localStorage.getItem("wdd131-review-count") ?? 0);
    const nextCount = Number.isSafeInteger(storedCount) && storedCount >= 0
      ? storedCount + 1
      : 1;

    localStorage.setItem("wdd131-review-count", String(nextCount));
    document.getElementById("review-product").textContent = product.name;
    document.getElementById("review-rating").textContent = `${rating} out of 5`;
    document.getElementById("review-date").textContent = new Intl.DateTimeFormat("en", {
      dateStyle: "long",
      timeZone: "UTC"
    }).format(date);
    document.getElementById("review-features").textContent = features.join(", ") || "None selected";
    document.getElementById("review-text").textContent = params.get("writtenReview")?.trim() || "Not provided";
    document.getElementById("review-name").textContent = params.get("userName")?.trim() || "Not provided";
    document.getElementById("review-count").textContent = String(nextCount);
    status.hidden = false;
    details.hidden = false;
    counter.hidden = false;
  } else {
    status.hidden = true;
    invalidMessage.hidden = false;
  }
}
