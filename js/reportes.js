function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://129.151.119.27:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){
    document.getElementById("resultadoStatus").style.display="";
    let alert="";
    alert +="Completas:" +respuesta.completed+" Canceladas:" +respuesta.cancelled;
    console.log(alert);
    $("#info").append(alert);
}
function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://129.151.119.27:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
    function pintarRespuestaDate(respuesta){

        document.getElementById("tablaid").style.display="";
        for(i=0;i<respuesta.length;i++){

            $("#res").append("<tr>");
            $("#res").append("<th>"+(i+1)+"</th>");
            $("#res").append("<td>" +respuesta[i].devolutionDate+ "</td>");
            $("#res").append("<td>" +respuesta[i].startDate+"</td>");
            $("#res").append("<td>" +respuesta[i].status+ "</td>");
            $("#res").append("</tr> ");
        }
    }

    function traerReporteClientes(){
        $.ajax({
            url:"http://129.151.119.27:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }
    function pintarRespuestaClientes(respuesta){
        document.getElementById("tablacliente").style.display="";
        for(i=0;i<respuesta.length;i++){
            $("#cli").append("<tr>");
            $("#cli").append("<th>"+(i+1)+"</th>");
            $("#cli").append("<td>" +respuesta[i].total+"</td>");
            $("#cli").append("<td>" +respuesta[i].client.name+ "</td>");
            $("#cli").append("<td>" +respuesta[i].client.email+"</td>");
            $("#cli").append("<td>"+respuesta[i].client.age+"</td>");
            $("#cli").append("</tr> ");
        }
    }
