const itemForm = document.querySelector("#itemForm");
const formInput = document.querySelector("#formInput");

// const totalCount = document.querySelector("#totalCount");
// const boughtCount = document.querySelector("#boughtCount");
// const remainingCount = document.querySelector("#remainingCount");

let list = document.querySelector("ul");
let items = JSON.parse(localStorage.getItem("items")) || [];

// create items from localStorage on page load
if (localStorage.getItem("items")) {
  items.map((item) => {
    createItem(item);
  });
}

itemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = formInput.value;

  if (inputValue == "") {
    return;
  }

  const item = {
    id: new Date().getTime(), // creates a unique id for each item
    name: inputValue,
    quantity: 1,
    isBought: false,
  };

  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));

  createItem(item);

  itemForm.reset();
  formInput.focus();
});

// remove item if user clicks on the x
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-x")) {
    const itemId = e.target.closest("li").id;
    removeItem(itemId);
  }
});

// list.addEventListener("input", (e) => {
//   const itemId = e.target.closest("li").id;
//   updateItem(itemId, e.target);
// });

function createItem(item) {
  const itemEl = document.createElement("li");
  itemEl.setAttribute("id", item.id);
  itemEl.innerHTML = `
  <div
    class="flex items-center justify-between rounded-md bg-gray-800 p-4"
  >
    <div class="flex items-center gap-2">
      <input type="checkbox" />
      <input
        type="text"
        class="bg-transparent text-lg outline-none"
        value="${item.name}"
      />
    </div>
    <button>
      <i class="fa-solid fa-x text-red-700"></i>
    </button>
  </div>
  `;
  list.appendChild(itemEl);
  // countItems();
}

function removeItem(itemId) {
  items = items.filter((item) => item.id != parseInt(itemId));
  // updates localStorage
  localStorage.setItem("items", JSON.stringify(items));
  // update DOM elements
  document.getElementById(itemId).remove();
  // countItems();
}

function countItems() {
  const boughtItemsArray = items.filter((item) => item.isBought == true);

  totalCount.textContent = items.lenght;
  boughtCount.textContent = boughtItemsArray.lenght;
  remainingCount.textContent = items.lenght - boughtItemsArray.lenght;
}

// function updateItem(itemId, el) {
//   const item = items.find((item) => itemId == parseInt(itemId));
//   if (el.value != item.name) {
//     el.value == item.name;
//   }
// }
