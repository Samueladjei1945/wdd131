// Footer: current year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Footer: date the document was last modified
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;
