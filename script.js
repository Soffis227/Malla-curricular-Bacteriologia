const ramos = [
  {
    id: 'biocel',
    nombre: 'Biología celular',
    semestre: 1,
    creditos: 3,
    requisitos: []
  },
  {
    id: 'morfo',
    nombre: 'Morfofisiología',
    semestre: 2,
    creditos: 4,
    requisitos: ['biocel']
  },
  {
    id: 'microgen',
    nombre: 'Microbiología general',
    semestre: 3,
    creditos: 3,
    requisitos: ['biocel']
  },
  {
    id: 'inmunogen',
    nombre: 'Inmunología general',
    semestre: 3,
    creditos: 3,
    requisitos: ['morfo']
  },
  {
    id: 'inmunoclin',
    nombre: 'Inmunología clínica',
    semestre: 4,
    creditos: 3,
    requisitos: ['inmunogen']
  },
  {
    id: 'bacteriogral',
    nombre: 'Bacteriología general',
    semestre: 4,
    creditos: 3,
    requisitos: ['microgen']
  },
  {
    id: 'bacterioclin',
    nombre: 'Bacteriología clínica',
    semestre: 5,
    creditos: 3,
    requisitos: ['bacteriogral']
  },
  {
    id: 'ccp',
    nombre: 'Correlación clínica - Patológica',
    semestre: 8,
    creditos: 2,
    requisitos: ['inmunoclin', 'bacterioclin']
  },
];

const container = document.getElementById('malla');

const estadoRamos = {};

ramos.forEach(ramo => {
  estadoRamos[ramo.id] = {
    aprobado: false,
    desbloqueado: ramo.requisitos.length === 0
  };
});

function renderRamos() {
  container.innerHTML = '';
  ramos.forEach(ramo => {
    const estado = estadoRamos[ramo.id];
    const div = document.createElement('div');
    div.className = 'ramo';
    if (!estado.desbloqueado) div.classList.add('bloqueado');
    if (estado.aprobado) div.classList.add('aprobado');
    div.innerHTML = `
      <div class="nombre">${ramo.nombre}</div>
      <div class="creditos">${ramo.creditos} créditos</div>
      <div class="semestre">Semestre ${ramo.semestre}</div>
    `;
    div.onclick = () => {
      if (!estado.desbloqueado) return;
      estado.aprobado = !estado.aprobado;
      actualizarEstado();
      renderRamos();
    };
    container.appendChild(div);
  });
}

function actualizarEstado() {
  ramos.forEach(ramo => {
    if (estadoRamos[ramo.id].aprobado) return;
    const requisitosCumplidos = ramo.requisitos.every(req => estadoRamos[req].aprobado);
    if (requisitosCumplidos) estadoRamos[ramo.id].desbloqueado = true;
  });
}

renderRamos();

