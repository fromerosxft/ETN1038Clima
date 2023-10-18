//const puppeteer = require('puppeteer');
//import obtenerDatosClima from "./index";
//import scraPp from "./pupsrc.js"; 

//entrada de texto
const busquedaDb = document.getElementById("actualizarDatos");
//sugerencias de texto
const autoCompDb = document.getElementById("actualizarSugerencias");

//evitar acumulaciones
const sugerenciasSetDb = new Set();
//sugerencias
function cargarSugeAlfa() {
    autoCompDb.innerHTML = "";
    const mosDataDb = busquedaDb.value.trim().toLowerCase();

    db.collection("localidad")
        .where("Poblacion", ">=", mosDataDb)
        .where("Poblacion", "<=", mosDataDb + "\uf8ff")

        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const autoCompDb = doc.data().Poblacion.toLowerCase();
                //console.log(autoCompDb)
                if (autoCompDb.includes(mosDataDb)) {
                    sugerenciasSetDb.add(doc.data().Poblacion);
                }
            });
            sugerenciasSetDb.forEach((sugerenciaDb) => {
                const option = document.createElement("option");
                option.value = sugerenciaDb;
                autoCompDb.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error al buscar sugerencia: ", error);
        });
}

// Simular entrada de texto al cargar la página
//busquedaDb.value = "a"; // Cambia "a" a la letra o texto que desees
//busquedaDb.dispatchEvent(new Event("input"));

//vincular sugerencias con el input
busquedaDb.addEventListener("input", cargarSugeAlfa);
//ejecutar la busqueda y almacenamiento de datos

const API_KEY = "223fb445e31993417cd9636103a8275a"; //llave para la consulta

function actualizarButton() {

    const poblacionClim = busquedaDb.value.trim();
    //if (!poblacionClim) return; //devolver el nombre de la ciudad
    const GEOCODING_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${poblacionClim}&appid=${API_KEY}&units=metric`;
    fetch(GEOCODING_API_URL)
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            let poblacionDb = data.name;
            let latitudDb = data.coord.lat;
            let longitudDb = data.coord.lon;
            let temperaturaDb = data.main.temp_max;
            let humedadDb = data.main.humidity;
            let presionhDb = data.main.pressure; // presion hPa
            let presionDb = 0.75 * presionhDb; //hPa a mmHg

            almacenFirebase(poblacionDb, latitudDb, longitudDb, temperaturaDb, humedadDb, presionDb);

        }).catch(() => {
            alert("error al buscar la poblacion");
        });

}

function almacenFirebase(poblacionFbs, latitudFbs, longitudFbs, temperaturaFbs, humedadFbs, presionFbs) {
    console.log("la poblacion es: " + poblacionFbs);
    console.log("latitud: " + latitudFbs);
    console.log("longitud: " + longitudFbs);
    console.log("temperatura: " + temperaturaFbs);
    console.log("humedad: " + humedadFbs);
    console.log("presion: " + presionFbs);
    //buscar ultimo registro
    db.collection("tablas")
        .where("poblacion", "==", poblacionFbs)
        .orderBy("fecha", "desc")
        .limit(1)
        .get()
        .then((querySnapshot) => {
            //fecha actual
            const fechaActual1 = new Date()
            const fechaActual = fechaActual1.getTime();//milisegundos

            if (querySnapshot.empty) {
                //si la base de datos se encuentra vacia
                console.log("No hay registros previos para esta ciudad.");
                regDatosFire();
            } else {

                //acceder a la base de datos para obtener el tiempo del ultimo registro
                querySnapshot.forEach((doc) => {
                    const tguardado = doc.data().fecha.seconds;//segundos
                    console.log("el tguardado es" + tguardado)
                    const timeDiference = (parseInt(fechaActual) - parseInt(tguardado * 1000)) / 1000;
                    console.log("han pasado en hrs: " + timeDiference)
                    // ha pasado mas de un dia? 864000
                    if (timeDiference > 86400) {
                        console.log("ha pasado mas de un dia")
                        //refistrar datos si ya paso mas de un dia

                    } else {
                        alert("aun no paso mas de un dia")
                        console.log("aun no paso mas de un dia")
                        location.reload()
                    }
                });

            }

        })
        .catch((error) => {
            console.error("Error al consultar Firestore: ", error);
        });

    function regDatosFire() {
        //refistrar datos si ya paso mas de un dia
        db.collection("tablas").add({
            poblacion: poblacionFbs,
            latitud: latitudFbs,
            longitud: longitudFbs,
            temperatura: temperaturaFbs,
            humedad: humedadFbs,
            presion: presionFbs,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then((docRef) => {

                location.reload()
                alert("registro Exitoso LOCALIDAD")
                //console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                alert("ERROR en el registro LOCALIDAD")
                //console.error("Error adding document: ", error);
            });
    }

}




