//buscar el lugar especifico y mostrarlo
//entrada de texto
const presData = document.getElementById("presentarDatos");
//sugerencias de texto
const autoComp = document.getElementById("presentarSugerencias");
//evitar duplicados
const sugerenciasSet = new Set();
//==================================

function cargarSugerencias(){
    autoComp.innerHTML = "";
    const mosData = presData.value.toLowerCase();
    db.collection("tablas")
        .where("poblacion", ">=", mosData)
        .where("poblacion", "<=", mosData + "\uf8ff")
        .limit(55)
        .get()
        .then((querySnapshot)=> {
            querySnapshot.forEach((doc)=>{
                const autoComp = doc.data().poblacion.toLowerCase();
                
                if(autoComp.includes(mosData)){
                    sugerenciasSet.add(doc.data().poblacion);
                }
            });
            sugerenciasSet.forEach((sugerencia)=>{
                const option = document.createElement("option");
                option.value = sugerencia;
                autoComp.appendChild(option);
            });
        })
        .catch((error)=>{
            console.error("Error al buscar sugerencia: ", error);
        });
}


//evento de escucha para el campo de entrada
presData.addEventListener("input",cargarSugerencias);

function presentarButton() {
    const lugars = presData.value; //.charAt(0).toUpperCase() + dato.poblacion.slice(1);
    db.collection("tablas")
        .where("poblacion", "==", lugars)//convertir la entrada a minuscula
        .orderBy("fecha", "desc")
        .limit(10)
        .get()
        .then((querySnapshot) => {
            
            let datos = [];
            
            querySnapshot.forEach((doc)=>{
                datos.push(doc.data());
            });

            let htmlString = `<thead>`;
            
            htmlString += `<tr>`;
            htmlString += `<th scope="col">Gestión</th>`;
            htmlString += `<th scope="col">Mes</th>`;
            htmlString += `<th scope="col">Día</th>`;
            htmlString += `<th scope="col">Ciudad o Población</th>`;
            htmlString += `<th scope="col">Longitud</th>`;
            htmlString += `<th scope="col">Latitud</th>`;
            htmlString += `<th scope="col">Temperatura Máxima ºC</th>`;
            htmlString += `<th scope="col">Humedad Relativa Máxima</th>`;
            htmlString += `<th scope="col">Presión Máxima</th>`;
            htmlString += `</tr>`;
            htmlString += `</thead>`;
            htmlString += `<tbody>`;
            for(let i=0; i<datos.length; i++){
                const dato = datos[i];
                const fechasNum = dato.fecha.toDate();
                const diaNum = fechasNum.getDate();
                const mesNum = fechasNum.getMonth() + 1;
                const gestNum = fechasNum.getFullYear();

                htmlString += `<tr>`;
                htmlString += `<td>${gestNum}</td>`;
                htmlString += `<td>${mesNum}</td>`;
                htmlString += `<td>${diaNum}</td>`;
                //htmlString += `<td>${dato.poblacion.charAt(0).toUpperCase() + dato.poblacion.slice(1)}</td>`;
                htmlString += `<td>${dato.poblacion}</td>`;
                
                htmlString += `<td>${dato.longitud}</td>`;
                htmlString += `<td>${dato.latitud}</td>`;
                htmlString += `<td>${dato.temperatura}</td>`;
                htmlString += `<td>${dato.humedad}</td>`;
                htmlString += `<td>${dato.presion}</td>`;
                htmlString += `</tr>`;
            }
            htmlString += `</tbody>`;
            
            document.getElementById("imprimirTabla").innerHTML = htmlString;
        });
}



//window.onload = function(){
//   presentarButton();
    
//}


