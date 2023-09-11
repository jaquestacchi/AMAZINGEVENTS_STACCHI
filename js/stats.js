let apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(apiUrl).then(respuesta => {
  return respuesta.json();
}).then(data => {
  let eventosConAsistenciayGanancias = calculaAsistenciaYGanancias(data);
  let eventosConGananciasUpcoming = calculaGananciaUpcoming(data);
  hacerTabla(data.events, eventosConAsistenciayGanancias, eventosConGananciasUpcoming);
}).catch(error => console.log(error))





function calculaAsistenciaYGanancias(data) {

  let pastEvents = data.events.filter(
    event => (new Date(event.date)).getFullYear() < (new Date(Date.now()).getFullYear()));

  pastEvents.forEach(event => {
    let porcentajeAsistencia = Math.round((event.assistance / event.capacity) * 100)
    event.porcentajeAsistencia = porcentajeAsistencia
    let gananciasPast = Math.round((event.assistance * event.price))
    event.gananciasPast = gananciasPast
  });
  return pastEvents
}

function calculaGananciaUpcoming(data) {

  let upcomingEvents = data.events.filter(
    event => (new Date(event.date)).getFullYear() >= (new Date(Date.now()).getFullYear()));

  upcomingEvents.forEach(event => {
    let gananciasUpcoming = Math.round((event.estimate * event.price))
    event.gananciasUpcoming = gananciasUpcoming
    let porcentajeAsistencia = Math.round((event.estimate / event.capacity) * 100)
    event.porcentajeAsistencia = porcentajeAsistencia
  });
  return upcomingEvents
}

function hacerTabla(allEvents, events, upcomingEvents) {

  events.sort((a, b) => {
    return b.porcentajeAsistencia - a.porcentajeAsistencia
  });
  let mayorAsistencia = []
  mayorAsistencia.push(events[0])
  mayorAsistencia.push(events[1])
  mayorAsistencia.push(events[2])


  events.sort((a, b) => {
    return a.porcentajeAsistencia - b.porcentajeAsistencia
  });
  let menorAsistencia = []
  menorAsistencia.push(events[0])
  menorAsistencia.push(events[1])
  menorAsistencia.push(events[2])


  allEvents.sort((a, b) => {
    return b.capacity - a.capacity
  });
  let mayorCapacity = []
  mayorCapacity.push(allEvents[0])
  mayorCapacity.push(allEvents[1])
  mayorCapacity.push(allEvents[2])


  const categoriasUpcoming = [...new Set(Object.values(upcomingEvents).map(event => event.category))];

  let eventsUpcomingPorCategoria = {};
  for (const cat of categoriasUpcoming) {
    let gananciasTotales = 0, promediosAsistencias = 0;

    if (!eventsUpcomingPorCategoria[cat]) {
      eventsUpcomingPorCategoria[cat] = [];
    }

    for (const event of upcomingEvents) {
      if (event.category == cat) {
        gananciasTotales += event.gananciasUpcoming
        promediosAsistencias += event.porcentajeAsistencia
        eventsUpcomingPorCategoria[cat].push(event);
      }
    }
    eventsUpcomingPorCategoria[cat].gananciasTotales = gananciasTotales
    eventsUpcomingPorCategoria[cat].porcentajeAsistencia = Math.round(promediosAsistencias / eventsUpcomingPorCategoria[cat].length);
  };


   console.log(eventsUpcomingPorCategoria)

  const categoriasPast = [...new Set(Object.values(events).map(event => event.category))];

  let eventsPastPorCategoria = {};
  for (const cat of categoriasPast) {
    let gananciasTotales = 0, promediosAsistencias = 0;

    if (!eventsPastPorCategoria[cat]) {
      eventsPastPorCategoria[cat] = [];
    }

    for (const event of events) {
      if (event.category == cat) {
        gananciasTotales += event.gananciasPast
        promediosAsistencias += event.porcentajeAsistencia
        eventsPastPorCategoria[cat].push(event);
      }
    }
    eventsPastPorCategoria[cat].gananciasTotales = gananciasTotales
    eventsPastPorCategoria[cat].porcentajeAsistencia = Math.round(promediosAsistencias / eventsPastPorCategoria[cat].length);
  };
console.log(eventsPastPorCategoria)


  let tablaStats = `<table class="table table-bordered align-middle">
        <tr>
          <th colspan="3" class="table-danger text-center">Events Statistics</th>
        </tr>
        <tr class="text-center">
          <td><strong>Events with highest % of assistance</strong></td>
          <td><strong>Events with lowest % of assistance</strong></td>
          <td><strong>Events with larger capacity</strong></td>
        </tr>
        <tr>
          <td>${mayorAsistencia[0].name} : ${mayorAsistencia[0].porcentajeAsistencia}%</td>
          <td>${menorAsistencia[0].name} : ${menorAsistencia[0].porcentajeAsistencia}%</td>
          <td>${mayorCapacity[0].name} : ${mayorCapacity[0].capacity}</td>
        </tr>
        <tr>
          <td>${mayorAsistencia[1].name} : ${mayorAsistencia[1].porcentajeAsistencia}%</td>
          <td>${menorAsistencia[1].name} : ${menorAsistencia[0].porcentajeAsistencia}%</td>
          <td>${mayorCapacity[1].name} : ${mayorCapacity[1].capacity}</td>
        </tr>
        <tr>
          <td>${mayorAsistencia[2].name}  : ${mayorAsistencia[2].porcentajeAsistencia}%</td>
          <td>${menorAsistencia[2].name} : ${menorAsistencia[0].porcentajeAsistencia}%</td>
          <td>${mayorCapacity[2].name} : ${mayorCapacity[2].capacity}</td>
        </tr>
        <tr>
          <th colspan="3" class="table-danger text-center">Upcoming events statistics by category</th>
        </tr>
        <tr class="text-center">
          <td><strong>Categories</strong></td>
          <td><strong>Revenues</strong></td>
          <td><strong>Percentage of assistance</strong></td>
        </tr>`

        for (const cat of categoriasUpcoming) {

        tablaStats += `<tr>
          <td>${cat}</td>
          <td>$ ${eventsUpcomingPorCategoria[cat].gananciasTotales}</td>
          <td>${eventsUpcomingPorCategoria[cat].porcentajeAsistencia}%</td>
        </tr>`
        }
         
        tablaStats += `<tr>
          <th colspan="3" class="table-danger text-center">Past events statistics by category</th>
        </tr>
        <tr class="text-center">
          <td><strong>Categories</strong></td>
          <td><strong>Revenues</strong></td>
          <td><strong>Percentage of assistance</strong></td>
        </tr>`

        for (const cat of categoriasPast) {

        tablaStats += `<tr>
          <td>${cat}</td>
          <td>$ ${eventsPastPorCategoria[cat].gananciasTotales}</td>
          <td>${eventsPastPorCategoria[cat].porcentajeAsistencia}%</td>
        </tr>`

      }
      
      `</table>`
      
  document.getElementById("tableContenedor").innerHTML = tablaStats;
    }
