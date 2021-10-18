const name = document.querySelector(".name"),
  country = document.querySelector(".country"),
  personImg = document.querySelector(".person-img"),
  countryImg = document.querySelector(".country-img");

window.addEventListener("mousemove", (e) => {
  let x = e.offsetX,
    y = e.offsetY;

  if (e.target.classList.contains("name")) {
    personImg.style.left = `${x}px`;
    personImg.style.top = `${y}px`;
  }
  if (e.target.classList.contains("country")) {
    countryImg.style.left = `${x}px`;
    countryImg.style.top = `${y}px`;
  }
});

name.addEventListener("mouseover", () => {
  personImg.style.display = "block";
});

name.addEventListener("mouseleave", () => {
  personImg.style.display = "";
});

country.addEventListener("mouseover", () => {
  countryImg.style.display = "block";
});

country.addEventListener("mouseleave", () => {
  countryImg.style.display = "";
});

