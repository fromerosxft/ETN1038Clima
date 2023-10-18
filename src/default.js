
//mostrar tabla principal
function presentarTabla(){
    db.collection("tablas")
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

window.onload = function(){
    presentarTabla();
}

