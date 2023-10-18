//************************************************************* */
// guardar datos de las localidades
function funcionGuardar() {
    db.collection("tablas").add({
        poblacion: document.getElementById("idPoblacion").value,
        longitud: document.getElementById("idLongitud").value,
        latitud: document.getElementById("idLatitud").value,
        temperatura: document.getElementById("idTemperatura").value,
        humedad: document.getElementById("idHumedad").value,
        presion: document.getElementById("idPresion").value,
        fecha: firebase.firestore.FieldValue.serverTimestamp()

    })
    .then((docRef) => {
        alert("registro Exitoso LOCALIDAD")
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        alert("ERROR en el registro LOCALIDAD")
        //console.error("Error adding document: ", error);
    });
}
