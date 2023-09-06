const containerCards = document.getElementById('containerCards');
console.log(containerCards)

const nuevosEventos = data.events.map(event => {
    let tarjeta = {};
    tarjeta.name = event.name;
    tarjeta.date = event.date;
    tarjeta.description = event.description;
    tarjeta.category = event.category;
    tarjeta.place = event.place;
    tarjeta.capacity = event.capacity;
    tarjeta.assistance = event.assistance;
    tarjeta.price = event.price;
    tarjeta.id = event._id;
    tarjeta.image = event.image;

    return tarjeta;
})

const quearySearch = document.location.search;
const id = new URLSearchParams(quearySearch).get("id");
console.log(id)
const evento = nuevosEventos.find(event => event.id === id);
console.log(nuevosEventos)
console.log(evento)
function crearCard(event, contenedor) {
    const {name, date, description, category, place, capacity, assistance, price, image} = event;
    contenedor.innerHTML = `
    <div class="card text-bg-secondary mb-3" style="max-width: 900px; ">
    <div class="row gx-5 gy-5 p-2 m-1 justify-content-between">
    <div class="col-md-5 col-xs m-1 p-1">
          <img class="food" src=${image} alt=${name}>
        </div>
        <div class="col-md-5 m-1 p-3">
          <div class="card-body">
            <h4 class="card-title">${name}</h4>
            <p class="card-text">${date}</p>
            <p class="card-text">${description}</p>
            <p class="card-text">${category}</p>
            <p class="card-text">Place: ${place}</p>
            <p class="card-text">Capacity: ${capacity}</p>
            <p class="card-text">Assistance: ${assistance}</p>
            <p class="card-text">Price: ${price}</p>
          </div>
        </div>
    </div>
    </div>
        `
}
crearCard(evento, containerCards);