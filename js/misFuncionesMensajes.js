function autoInicioRelacionCliente(){
    
    $.ajax({
        url:"http://129.151.119.27:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}
function autoInicioSkate(){

    $.ajax({
        url:"http://129.151.119.27:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-skate");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}
function autoInicioRelacionCliente2(){
    
    $.ajax({
        url:"http://129.151.119.27:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-cliented");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}
function autoInicioSkate2(){

    $.ajax({
        url:"http://129.151.119.27:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-skateed");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}


function autoInicioMensajes(){
    console.log("se esta ejecutando")

    $.ajax({
        url:"http://129.151.119.27:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
            
        }
    
    })

}

function pintarRespuestaMensajes(respuesta){
    const $elemento = document.querySelector("#men");
    $elemento.innerHTML = "";


    document.getElementById("Mensaje").style.display = "";
    for(i=0;i<respuesta.length;i++){
        let arr = [];
        arr = [respuesta[i].idMessage,respuesta[i].client.name, respuesta[i].client.idClient,respuesta[i].bike.name , respuesta[i].messageText];
        $("#men").append("<tr>");
        $("#men").append("<th>" + (i + 1) + "</th>");
        $("#men").append("<td>" + respuesta[i].client.name+ "</td>");
        $("#men").append("<td>" + respuesta[i].bike.name+ "</td>");
        $("#men").append("<td>" + respuesta[i].messageText+ "</td>");
        $("#men").append("<td>" + "<button type='button' class='btn btn-secondary' data-bs-toggle='modal' data-bs-target='#editarmensaje' onclick='pintardatosmodal(" + JSON.stringify(arr) + ")'>Actualizar</button>" + "<button class='btn btn-secondary' onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar</button>" + "</td>");
        $("#men").append("</tr>");
    }
}
function pintardatosmodal(idElemento) {

    $("#Nombrem").val(idElemento[4]);
    $("#actualizarm").val(idElemento[0]);
    
}

function guardarInformacionMensajes(){
    if ($("#messagetext").val().length==0 ){

        alert("Todos los campos son obligatorios");
    }else{
    
    
    let var2 = {
        
        messageText:$("#messagetext").val(),
        bike:{id: +$("#select-skate").val()},
        client:{idClient: +$("#select-client").val()},

     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.119.27:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            autoInicioMensajes();
            $('#cerrarn').click();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
             window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });
    }
}

function actualizarInformacionMensaje(){
    let myData={
        idMessage:$("#actualizarm").val(),
        messageText:$("#Nombrem").val(),
        client:{idClient: +$("#select-cliented").val()},
        bike:{id: +$("#select-skateed").val()},
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.119.27:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#messagetext").val("");
            autoInicioMensajes();
            alert("se ha Actualizado correctamente el Mensaje");
            $('#cerrabtn').click();
        }
    });

}

function borrarMensaje(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.119.27:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioMensajes();
            alert("Se ha Eliminado.")
        }
    });

}