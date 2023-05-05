class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <!-- Navbar -->
    <nav id="navbar" class="bg-gray-800 px-8 py-2 flex items-center justify-between drop-shadow">
      <div class="flex items-center gap-6">
        <button id="hamburger">
          <i class="fa-solid fa-bars fa-lg"></i>
        </button>
        <span class="font-semibold">CoShop</span>

        <!-- <form
          class="flex items-center py-1 rounded-md bg-gray-700"
        >
          <button>
            <i class="fa-solid fa-magnifying-glass p-1 mx-2"></i>
          </button>

          <input
            type="search"
            size="10"
            placeholder="Search..."
            class="text-sm bg-transparent rounded-md p-1 mr-4 pr-2 focus:outline-0" 
          />
        </form> -->

      </div>
      <div class="relative flex items-center gap-6">
        <a href=""> <!-- TODO: link to messages page -->     
          <i class="fa-solid fa-bell fa-lg relative">
            <div class="absolute -top-3 -right-[0.10rem] border border-gray-800 bg-red-500 h-2.5 w-2.5 rounded-full"></div> <!-- TODO: show bubble when notification count is > 0 -->  
          </i>
        </a>
        <img id="dropdownBtn" src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" width="33" class="cursor-pointer aspect-square object-cover rounded-full">
        <div id="dropdown" class="hidden absolute right-0 top-0 mt-12 w-32 origin-top-right rounded-md bg-gray-800 shadow-md py-1">
          <a href="/pages/settings.html" class="block px-4 py-2 text-sm hover:bg-slate-700 rounded-md">Settings</a>
          <a href="mailto:..." class="block px-4 py-2 text-sm hover:bg-slate-700 rounded-md">Report a Bug</a>
          <hr class="my-1 h-px border-0 bg-gray-700">
          <form method="POST" class="block px-4 py-2 text-sm hover:bg-slate-700 rounded-md">
            <button>
              Log Out
            </button>
          </form>
        </div>
      </div>
    </nav>
    `;
  }
}

customElements.define("navbar-component", Navbar);

const dropdownBtn = document.querySelector("#dropdownBtn");
const dropdown = document.querySelector("#dropdown");

dropdownBtn.addEventListener("click", () => {
  dropdown.classList.contains("hidden")
    ? dropdown.classList.remove("hidden")
    : dropdown.classList.add("hidden");
});
