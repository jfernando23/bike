function autoInicioCliente(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.119.27:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta2(respuesta);
        }
    
    })
}
function pintarRespuesta2(respuesta){

    const $elemento = document.querySelector("#cli");
    $elemento.innerHTML = "";

    document.getElementById("Clientet").style.display = "";
    for(i=0;i<respuesta.length;i++){
        
        let arr = [];
        arr = [respuesta[i].idClient, respuesta[i].name, respuesta[i].email,respuesta[i].age];
        $("#cli").append("<tr>");
        $("#cli").append("<th>" + (i + 1) + "</th>");
        $("#cli").append("<td>" + respuesta[i].name + "</td>");
        $("#cli").append("<td>" + respuesta[i].email+ "</td>");
        $("#cli").append("<td>" + respuesta[i].age+ "</td>");
        $("#cli").append("<td>" + "<button type='button' class='btn btn-secondary' data-bs-toggle='modal' data-bs-target='#editarcliente' onclick='pintardatosmodal(" + JSON.stringify(arr) + ")'>Actualizar</button>" + "<button class='btn btn-secondary' onclick='borrarCliente(" + respuesta[i].idClient + ")'>Borrar</button>" + "</td>");
        $("#cli").append("</tr>");
    }
}
function pintardatosmodal(idElemento) {
    console.log(idElemento[0]);
    $("#Nombrec").val(idElemento[1]);
    $("#Correoc").val(idElemento[2]);
    $("#Edadc").val(idElemento[3]);
    $("#actualizarc").val(idElemento[0]);
    
}

function guardarInformacionCliente(){
    let var2 = {
        
        email:$("#Correon").val(),
        password:$("#Contrasenan").val(),
        name:$("#Nombren").val(),
        age:$("#Edadn").val(),
     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.119.27:8080/api/Client/save",
       
        
        success:function(response) {
            autoInicioCliente();
            alert("Se guardo correctamente");
            $('#cerrarn').click();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
        }
        });

}

function actualizarInformacionCliente(){
    let myData={
        idClient:$("#actualizarc").val(),
        email:$("#Correoc").val(),
        name:$("#Nombrec").val(),
        age:$("#Edadc").val(),


    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.119.27:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            autoInicioCliente();
            alert("se ha Actualizado correctamente Cliente");
            $('#cerrabtn').click();
        }
    });

}

function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.119.27:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioCliente();
            alert("Se ha Eliminado.")
        }
    });

}