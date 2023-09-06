function hacerCards(events, idcardcontenedor) {
  document.getElementById(idcardcontenedor).innerHTML = "";
  for (let event of events) {
    let fechaDelEvento = new Date(event.date)
    let fechaActual = new Date(Date.now())
    if (fechaDelEvento.getFullYear() === fechaActual.getFullYear()) {
      let card = `<div class="col">
            <div class="card col-12 col-xs-6 lg-4 xl-3">
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

hacerCards(data.events, "upcomingcard");

let inputCheck = document.getElementsByClassName("form-check-input")
let arrayCheck = Array.from(inputCheck)
arrayCheck.forEach(input => {
  input.addEventListener('change', () => {

    checkBoxYSearch(data.events);


  });
});

let btnbuscador = document.getElementById("btnSearch")
let search = document.getElementById("eventosInput")
btnbuscador.addEventListener('click', function () {

  checkBoxYSearch(data.events);


});

function checkBoxYSearch(array) {

  let buscadorEvents = search.value
  let filtrados = data.events.filter(event => event.name.toLowerCase().includes(buscadorEvents.toLowerCase()));
  let inputSeleccionados = arrayCheck.filter(check => check.checked);
  let filtros = inputSeleccionados.map(imp => imp.value.toLowerCase())
  if (filtros.length > 0) {
    filtrados = filtrados.filter(event => filtros.includes(event.category.toLowerCase()));
  }

  if (filtrados.length > 0) {

    msgError.textContent = "";
  } else {
    let msgError = document.getElementById("msgError")
    msgError.textContent = "No se encontraron coincidencias. Por favor, intente de nuevo.";
  }
  hacerCards(filtrados, "upcomingcard");

}
