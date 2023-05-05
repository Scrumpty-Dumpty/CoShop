const navbarEl = document.querySelector("#navbar");
const sidebarEl = document.querySelector("#sidebar");

const colorPicker = document.querySelector("#colorPicker");
const defaultColor = "#212936";

// apply colors on page load
navbarEl.style.backgroundColor =
  localStorage.getItem("customColor") ?? defaultColor;
sidebarEl.style.backgroundColor =
  localStorage.getItem("customColor") ?? defaultColor;

// match color with colorpicker input
colorPicker.setAttribute(
  "value",
  localStorage.getItem("customColor") ?? defaultColor
);

// update colors on change
colorPicker.addEventListener("input", () => {
  navbarEl.style.backgroundColor = localStorage.getItem("customColor");
  sidebarEl.style.backgroundColor = localStorage.getItem("customColor");
  localStorage.setItem("customColor", colorPicker.value);
});
