const dataBack = document.querySelector(".data-back");
const pagination = document.querySelector(".pagination");

const itemsPerPage = 5;
let currentPage = 1;

function displayItems(items, currentPage, itemsPerPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = items.slice(startIndex, endIndex);

  dataBack.innerHTML = "";

  displayedItems.forEach((item) => {
    const div = document.createElement("div");
		
    div.innerHTML = `
      <div class='id'>${item.id}</div>
      <div class="name">${item.name}</div>
      <div class="number">${item.phone}</div>
    `;
    dataBack.appendChild(div);

    const divs = document.querySelectorAll(".data-back div");

    divs.forEach((div) => {
      div.addEventListener("click", () => {
        const id = div.querySelector(".id").innerHTML;
        window.location = `user-info.html?id=${id}`;
      });
    });
  });
}

function setupPagination(items, pagination, itemsPerPage) {
  const totalPages = Math.ceil(items.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.innerText = i;
    li.appendChild(link);
    pagination.appendChild(li);

    if (i === currentPage) {
      li.classList.add("active");
    }

    link.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      pagination.innerHTML = "";
      displayItems(items, currentPage, itemsPerPage);
      setupPagination(items, pagination, itemsPerPage);
    });
  }
}
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    displayItems(data, currentPage, itemsPerPage);
    setupPagination(data, pagination, itemsPerPage);
  });
