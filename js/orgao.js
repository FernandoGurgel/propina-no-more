var sigla = [];
var descricao = [];
$.getJSON("https://raw.githubusercontent.com/FernandoGurgel/propina-no-more/master/Back-end/json/orgao_nome.json", function(data){
	for(x =0; x<data.length; x++){
	    sigla.push( data[x].sigla);
		descricao.push( data[x].nome);
	}
});

$(document).ready(function(){
    for(i=0;i<sigla.length;i++){
        $("#cboOrgao").append("<option value='"+sigla[i]+"'>["+sigla[i]+"] - "+descricao[i]+"</option>")
    }
})