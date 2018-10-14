var sigla = [];
var descricao = [];
$.getJSON("https://raw.githubusercontent.com/FernandoGurgel/propina-no-more/master/Back-end/json/orgao_nome.json", function(data){
	for(x =0; x<data.length; x++){
	    sigla.push( data[x].sigla);
		descricao.push( data[x].nome);
	}
});

$('#cboOrgao').click(function(){
	// alert($('#cboOrgao').val());
	var sigla = $('#cboOrgao').val();
	var descricao = [];
	var cont = 0;
	var ano = $('#ano').val();

	$.getJSON("https://raw.githubusercontent.com/FernandoGurgel/propina-no-more/master/Back-end/valor_edital_2018.json", function(data){
		$('#listaCompras > tr').empty();
		for(x =0; x<data.length; x++){
			if((ano == data[x].ano)&&(sigla == data[x].sigla)&&(data[x].situacao != 'Anulado / Revogado')&&(data[x].situacao != 'Fracassada')){               
				$('#listaCompras').append('<tr><td>'+data[x].edital+'</td><td>'+data[x].objeto+'</td><td>'+ data[x].empresa+'</td><td>'+data[x].valor+'</td><td>'+data[x].situacao+'</td></tr>');
			}
		}
	})
})



$(document).ready(function(){
    for(i=0;i<sigla.length;i++){
        $("#cboOrgao").append("<option value='"+sigla[i]+"'>["+sigla[i]+"] - "+descricao[i]+"</option>")
	}
	
	
})

