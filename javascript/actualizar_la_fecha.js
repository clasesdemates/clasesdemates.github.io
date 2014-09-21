function escribir_fecha_del_dia_de_hoy()
{
var mydate=new Date();
var year=mydate.getYear();
if (year < 1000)
year+=1900;
var day=mydate.getDay();
var month=mydate.getMonth();
var daym=mydate.getDate();
var dayarray=new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
var montharray=new Array("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");
document.write("<p class='fecha'>"+dayarray[day]+", "+daym+" de "+montharray[month]+" de "+year+".</p>");

}