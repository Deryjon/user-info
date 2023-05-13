const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());



const api = "https://jsonplaceholder.typicode.com/users";

async function getUsers() {
  const res = await fetch(api);
  const users = await res.json();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  function getDataById(id) {
      const result = users.filter(item => item.id === id);
      return result.length > 0 ? result[0] : null;
    }
    
    // 
    const idToGet = parseInt(params.id);
    const result = getDataById(idToGet);

    // Text content 
    const name = document.querySelector(".name");
    const username = document.querySelector(".username");
    const baseEmail = document.querySelector(".base-email");
    const baseCity = document.querySelector(".base-city");
    const baseWebsite = document.querySelector(".base-website");
    const basePhone = document.querySelector(".base-phone");
    const baseCompany = document.querySelector(".base-company");

    if (result) {
      name.textContent = result.name;
      username.textContent = result.username;
      baseEmail.textContent = result.email;
      baseCity.textContent = result.address.city;
      baseWebsite.textContent = result.website ;
      basePhone.textContent = result.phone;
      baseCompany.textContent = result.company.name;
        // remove loader
        const elements = document.querySelectorAll('.loading');
        elements.forEach((element) => {
            element.classList.remove('loading');
        });

    } else {
      console.log(`Data with ID ${idToGet} not found.`);
    }
}

getUsers();


  