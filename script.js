const ramos = [
  { nombre: "Biología celular", requisitos: [] },
  { nombre: "Seminario introducción a la constitución política de colombia", requisitos: [] },
  { nombre: "Lógica de pensamiento", requisitos: [] },
  { nombre: "Taller de vivencia de los valores", requisitos: [] },
  { nombre: "Inglés I", requisitos: [] },
  { nombre: "Matemáticas I", requisitos: [] },
  { nombre: "Química general", requisitos: [] },
  { nombre: "Electivas de complementación", requisitos: [] },

  { nombre: "Taller de comunicación oral y escrita", requisitos: [] },
  { nombre: "Inglés II", requisitos: ["Inglés I"] },
  { nombre: "Matemáticas II", requisitos: ["Matemáticas I"] },
  { nombre: "Morfofisiología", requisitos: ["Biología celular"] },
  { nombre: "Análisis instrumental", requisitos: ["Matemáticas I", "Química general"] },
  { nombre: "Química orgánica", requisitos: ["Química general"] },

  { nombre: "Inmunología general", requisitos: ["Morfofisiología"] },
  { nombre: "Microbiología general", requisitos: ["Biología celular"] },
  { nombre: "Estadística aplicada", requisitos: ["Matemáticas II"] },
  { nombre: "Genética microbiana", requisitos: [] },
  { nombre: "Metabolismo y química estructural", requisitos: ["Química orgánica"] },
  { nombre: "Educación para la salud", requisitos: [] },

  { nombre: "Bacteriología general", requisitos: ["Microbiología general"] },
  { nombre: "Hematología general", requisitos: ["Inmunología general"] },
  { nombre: "Inmunología clínica", requisitos: ["Inmunología general"] },
  { nombre: "Seminario de investigación", requisitos: ["Lógica de pensamiento"] },
  { nombre: "Biología molecular", requisitos: ["Biología celular"] },
  { nombre: "Bioquímica clínica", requisitos: ["Metabolismo y química estructural"] },

  { nombre: "Bacteriología clínica", requisitos: ["Bacteriología general"] },
  { nombre: "Hematología clínica", requisitos: ["Hematología general"] },
  { nombre: "Genética humana", requisitos: ["Biología molecular"] },
  { nombre: "Micología", requisitos: ["Microbiología general"] },
  { nombre: "Parasitología intestinal", requisitos: ["Microbiología general"] },
  { nombre: "Química especial", requisitos: ["Bioquímica clínica"] },

  { nombre: "Ambiente, agricultura y desarrollo sostenible", requisitos: ["Electivas de complementación", "Inmunología clínica", "Micología"] },
  { nombre: "Control microbiológico de productos industriales, biológicos e insumos para la salud", requisitos: ["Electivas de complementación", "Inmunología clínica", "Micología"] },
  { nombre: "Cultura colombiana", requisitos: ["Electivas de complementación"] },
  { nombre: "Epidemiología", requisitos: ["Estadística aplicada", "Electivas de complementación"] },
  { nombre: "Fisiología y parasitología veterinaria", requisitos: ["Parasitología intestinal", "Electivas de complementación", "Inmunología clínica", "Micología"] },
  { nombre: "Hematología especial", requisitos: ["Hematología clínica"] },
  { nombre: "Parasitología tisular", requisitos: ["Electivas de complementación"] },
  { nombre: "Virología", requisitos: ["Electivas de complementación"] },

  { nombre: "Atención primaria en salud", requisitos: [] },
  { nombre: "Banco de sangre y medicina de transfusión", requisitos: ["Genética humana", "Inmunología clínica"] },
  { nombre: "Bioética", requisitos: [] },
  { nombre: "Complementación del énfasis", requisitos: ["Electivas de complementación"] },
  { nombre: "Cultura latinoamericana", requisitos: [] },
  { nombre: "Electiva de profundización - Énfasis I", requisitos: ["Electivas de complementación"] },
  { nombre: "Metodología de la investigación", requisitos: ["Seminario de investigación"] },
  { nombre: "Salud pública", requisitos: ["Epidemiología"] },

  { nombre: "Administración en salud", requisitos: [] },
  { nombre: "Aseguramiento en la calidad en el laboratorio", requisitos: [] },
  { nombre: "Correlación clínica - Patológica", requisitos: ["Química especial", "Micología", "Parasitología tisular", "Virología", "Bacteriología clínica", "Inmunología clínica", "Hematología especial"] },
  { nombre: "Electiva de profundización - Énfasis II", requisitos: ["Electiva de profundización - Énfasis I"] },
  { nombre: "Salúd y sociedad", requisitos: [] },

  { nombre: "Práctica formativa (Laboratorio clínico)", requisitos: ["Complementación del énfasis", "Electiva de profundización - Énfasis I", "Electiva de profundización - Énfasis II", "Electivas de complementación"] },
  { nombre: "Modalidad de grado", requisitos: ["Complementación del énfasis", "Electiva de profundización - Énfasis I", "Electiva de profundización - Énfasis II", "Electivas de complementación"] },
  { nombre: "Práctica formativa (Laboratorio especializado)", requisitos: ["Complementación del énfasis", "Electiva de profundización - Énfasis I", "Electiva de profundización - Énfasis II", "Electivas de complementación"] }
];

const malla = document.getElementById('malla');
const estado = {};

function crearRamo(ramo) {
  const div = document.createElement('div');
  div.className = 'ramo bloqueado';
  div.id = ramo.nombre;

  const titulo = document.createElement('h3');
  titulo.textContent = ramo.nombre;

  const btn = document.createElement('button');
  btn.textContent = 'Aprobar';
  btn.onclick = () => aprobarRamo(ramo.nombre);

  div.appendChild(titulo);
  div.appendChild(btn);

  malla.appendChild(div);
  estado[ramo.nombre] = false;
}

function aprobarRamo(nombre) {
  if (estado[nombre]) return;
  estado[nombre] = true;
  const div = document.getElementById(nombre);
  div.classList.add('aprobado');
  div.classList.remove('bloqueado');
  desbloquear();
}

function desbloquear() {
  for (const ramo of ramos) {
    if (estado[ramo.nombre]) continue;
    const requisitosCumplidos = ramo.requisitos.every(req => estado[req]);
    if (requisitosCumplidos) {
      const div = document.getElementById(ramo.nombre);
      if (div) div.classList.remove('bloqueado');
    }
  }
}

function reiniciarMalla() {
  for (const ramo of ramos) {
    estado[ramo.nombre] = false;
    const div = document.getElementById(ramo.nombre);
    div.classList.remove('aprobado');
    div.classList.add('bloqueado');
  }
  desbloquear();
}

// Inicializa la malla
for (const ramo of ramos) {
  crearRamo(ramo);
}

desbloquear();

// Agrega botón de reinicio
const reinicioBtn = document.createElement('button');
reinicioBtn.textContent = 'Reiniciar malla';
reinicioBtn.onclick = reiniciarMalla;
reinicioBtn.className = 'reinicio-btn';
document.body.insertBefore(reinicioBtn, malla);


