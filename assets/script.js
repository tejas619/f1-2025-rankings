
async function loadStandings(){
  try{
    const res = await fetch('data/standings.json', {cache:'no-store'});
    const data = await res.json();
    renderDrivers(data.drivers);
    renderConstructors(data.constructors);
  }catch(e){
    console.error('Failed to load standings.json', e);
  }
}

function renderDrivers(list){
  const tbody = document.querySelector('#drivers-table tbody');
  tbody.innerHTML = '';
  list.sort((a,b)=>a.position - b.position).forEach(row=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.position}</td><td>${row.name}</td><td>${row.team}</td><td><strong>${row.points}</strong></td>`;
    tbody.appendChild(tr);
  });
}

function renderConstructors(list){
  const tbody = document.querySelector('#constructors-table tbody');
  tbody.innerHTML = '';
  list.sort((a,b)=>a.position - b.position).forEach(row=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.position}</td><td>${row.team}</td><td><strong>${row.points}</strong></td>`;
    tbody.appendChild(tr);
  });
}

window.addEventListener('DOMContentLoaded', loadStandings);
