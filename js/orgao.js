var sigla = [];
var descricao = [];
$.getJSON("https://raw.githubusercontent.com/FernandoGurgel/propina-no-more/master/Back-end/json/orgaos.json", function(data){
	for(x =0; x<data.length; x++){
	    sigla.push( data[x].a);
		descricao.push( data[x].b);
	}
});

$(document).ready(function(){
    for(i=0;i<sigla.length;i++){
        $("#cboOrgao").append("<option value='"+sigla[i]+"'>["+sigla[i]+"] - "+descricao[i]+"</option>")
    }
})