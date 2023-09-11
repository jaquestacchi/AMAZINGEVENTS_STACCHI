let apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(apiUrl).then(respuesta => {
  return respuesta.json();
}).then(data => {

  hacerCards(data.events, "upcomingcard");

  let inputCheck = document.getElementsByClassName("form-check-input")
  let arrayCheck = Array.from(inputCheck)
  arrayCheck.forEach(input => {
    input.addEventListener('change', () => {
      checkBoxYSearch(data.events);
    });
  });

  let btnbuscador = document.getElementById("btnSearch")
  btnbuscador.addEventListener('click', function () {
    checkBoxYSearch(data.events);
  });
  
  function checkBoxYSearch(array) {
    let search = document.getElementById("eventosInput")
    let buscadorEvents = search.value
    let filtrados = array.filter(event => event.name.toLowerCase().includes(buscadorEvents.toLowerCase()));
    let inputSeleccionados = arrayCheck.filter(check => check.checked);
    let filtros = inputSeleccionados.map(imp => imp.value.toLowerCase())
    if (filtros.length > 0) {
      filtrados = filtrados.filter(event => filtros.includes(event.category.toLowerCase()));
    }

    if (filtrados.length > 0) {
      msgError.textContent = "";
    } else {
      let msgError = document.getElementById("msgError")
      msgError.textContent = "The event wasn't found. Please, try again.";
    }
    hacerCards(filtrados, "upcomingcard");
  }

}).catch(error => console.log(error));


function hacerCards(events, idcardcontenedor) {
  document.getElementById(idcardcontenedor).innerHTML = "";
  for (let event of events) {
    let fechaDelEvento = new Date(event.date)
    let fechaActual = new Date(Date.now())
    if (fechaDelEvento.getFullYear() >= fechaActual.getFullYear()) {
      let card = `<div class="col-12 col-6 col-sm-3 lg-4">
            <div class="card">
            <img src=" ${event.image} " class="card-img-top" alt="${event.name}">
            <div class="card-body">
            <h5 class="card-title1">${event.name}</h5>
            <p class="card-text1">${event.description}</p>
            <div class="precio d-flex justify-content-between">
                <p>$${event.price}</p>
                <a href="./details.html?id=${event._id}" class="btn btn-primary">Details</a>
            </div>
            </div>
        </div>
      </div>`;
      document.getElementById(idcardcontenedor).innerHTML += card;
    }
  }
};

