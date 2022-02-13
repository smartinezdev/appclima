//API OpenWeather.
const api = {
    key: 'c4e9c950d0058b2afdf1296dadb8d7c7',
    url: 'https://api.openweathermap.org/data/2.5/weather'
}

//Se recopilan los elementos del formulario por medio de su id.
const formulario = document.getElementById('panel');
const buscador = document.getElementById('buscarCiudad');
const ciudad = document.getElementById('ciudad');
const grados = document.getElementById('grados');
const clima = document.getElementById('clima');
const viento = document.getElementById('viento');
const humedad = document.getElementById('humedad');

//Se escucha el evento submit del formulario.
formulario.addEventListener('submit', consultarDato, true);

//Función que captura el dato escrito en la caja de texto al presionar el botón buscar.
function consultarDato(event) {
    event.preventDefault();
    buscarDato(buscarCiudad.value);

    //Se limpia la caja de texto al realizar la consulta.
    document.getElementById("buscarCiudad").value = "";
}

//Función donde se utiliza la API fetch para obtener la información de la ciudad y su estado del clima.
async function buscarDato(query) {

    //Se utiliza la sentencia try catch para controlar las instrucciones ejecutadas y los errores que se presenten al momento de realizar las peticiones.
    try {
        const respuesta = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const dato = await respuesta.json();

        //Se imprimen los resultados en el panel del formulario.
        ciudad.textContent = `${dato.name}, ${dato.sys.country}`;
        grados.textContent = `${toCelsius(dato.main.temp)}°C`;
        clima.textContent = dato.weather[0].description;
        viento.textContent = `${dato.wind.speed} km/h`;
        humedad.textContent = `${dato.main.humidity} %`;

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "Digite el nombre de una ciudad"
        });
    }
}

//Función para convertir el valor de la temperatura de kelvin a grados celsius.
function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}