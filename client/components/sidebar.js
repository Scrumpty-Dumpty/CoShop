class Sidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <!-- Sidebar -->
      <div id="sidebar" class="absolute sm:static min-h-[calc(100dvh-49px)] flex flex-col w-72 transition-all duration-200"
        style="background-color: #212936;">
        <div class="px-4 py-8 flex flex-col gap-3 mb-auto">
          <a href="/" class="p-3 hover:bg-slate-700 rounded-md">
            <i class="mr-2 fa-solid fa-house text-lg"></i>
            Dashboard
          </a>
          <a href="/pages/lists.html" class="p-3 hover:bg-slate-700 rounded-md">
            <i class="mr-2 fa-solid fa-list text-lg"></i>
            Lists
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define("sidebar-component", Sidebar);

const body = document.body;
const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");
const mediaQuery = window.matchMedia("(min-width: 640px)");

function openMenu() {
  sidebar.classList.remove("-translate-x-72");
  sidebar.classList.replace("w-0", "w-72");
  localStorage.setItem("menu-state", "open");
}

function closeMenu() {
  sidebar.classList.add("-translate-x-72");
  sidebar.classList.replace("w-72", "w-0");
  localStorage.setItem("menu-state", "closed");
}

// auto-close the sidebar on mobile screens
function closeOnMobile(e) {
  e.matches ? openMenu() : closeMenu();
}

// check screen size and apply sidebar state on page load
closeOnMobile(mediaQuery);

// apply sidebar state on screen size change
mediaQuery.addEventListener("change", closeOnMobile);

// apply sidebar state on page load
localStorage.getItem("menu-state") == "open" ? openMenu() : closeMenu(); // FIXME: not working

// update sidebar state on change
hamburger.addEventListener("click", () => {
  localStorage.getItem("menu-state") == "open" ? closeMenu() : openMenu();
});
