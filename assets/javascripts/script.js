let valorGlobal; /* valor ingresado por el usuario */
let selectorGlobal;/* puedo leer el input seleccionado por el usuario */
let valorDolarGlobal; /* tengo asignado el valor del Dolar por API*/
let valorEuroGlobal; /* Tengo asignado el valor del Euro por API */
let conversionDolar = false;
let conversionEuro = false;

async function getMindicador() {
  try {
    const res = await fetch("https://mindicador.cl/api");
    const data = await res.json();
    console.log(data);
    let valorDolar = data.dolar.valor;
    let valorEuro = data.euro.valor;
    valorDolarGlobal = valorDolar;
    valorEuroGlobal = valorEuro;
    console.log(valorDolarGlobal);
    console.log(valorEuroGlobal);
  } catch (error) {
    alert(error.message);
  }
}

/* Funcion para detectar el selector y revisar la posicion de los elementos para asignar el valor del API */
document.getElementById("selector").addEventListener("change", function() {
  const seleccionado = this.value;
  selectorGlobal = seleccionado;
  console.log("La moneda seleccionada es: " + seleccionado);
  if (selectorGlobal === 'Dolar') {
    conversionDolar = true;
    console.log (conversionDolar)
  } else {
    conversionDolar = false;
    console.log('no esta seleccionado dolar')
  }
  if (selectorGlobal === 'Euro'){
    conversionEuro = true;
    console.log (conversionEuro)
  } else {
    conversionEuro = false;
    console.log('no esta seleccionado euro')
  }
  if (seleccionado === ''){
    alert ("Por favor, selecciona una moneda (Dolar o Euro)");
  }
});

/* Accion del BOTON para ingresar informacion al DOM */
document.getElementById("button").addEventListener("click", function(){
  const valor = document.querySelector("#input").value;
  valorGlobal = valor;
  console.log (valor);
  let resultado;
  if(conversionDolar === true){
    resultado = (valorGlobal/valorDolarGlobal).toFixed(2);
    const parrafo = document.querySelector("#resultado");
    parrafo.innerHTML = `${resultado} $`;
    console.log(conversionDolar)}
  if (conversionEuro === true){
    resultado = (valorGlobal/valorEuroGlobal).toFixed(2);
    const parrafo = document.querySelector("#resultado")
    parrafo.innerHTML = `${resultado} Є`;
    console.log(conversionEuro);
  }
  if (valor === ''){
    alert('Por favor ingresa primero la cantidad de pesos a convertir.')
  }
})

/* GRAFICO */
async function renderGrafica() {
  await getMindicador(); // Espera a que se complete getMindicador antes de continuar
  const valores = { Dolar: valorDolarGlobal, Euro: valorEuroGlobal };
  const config = prepararConfiguracionParaLaGrafica(valores);
  const chartDOM = document.getElementById("myChart");
  new Chart(chartDOM, config);
}

function prepararConfiguracionParaLaGrafica(valores) {
  const tipoDeGrafica = "line";
  const nombresDeLasMonedas = Object.keys(valores);
  const titulo = "Valores de Monedas";
  // Asignamos dos colores específicos
  const colores = ["red", "blue"];

  const datasets = nombresDeLasMonedas.map((moneda, index) => {
    return {
      label: moneda,
      backgroundColor: colores[index],
      data: [valores[moneda]]
    };
  });

  const config = {
    type: tipoDeGrafica,
    data: {
      labels: [titulo],
      datasets: datasets
    }
  };

  return config;
}

document.addEventListener("DOMContentLoaded", () => {
  renderGrafica();
});
