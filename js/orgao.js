
$(document).ready(function () {
	popularOrgao();	
	
	$("#cboOrgao").change(function(){
		var ano = $("#anoEdital").val();
		var orgao = $("#cboOrgao").val();
		if(ano!=null && orgao !=null){
			$("#tabelaEdital").show();
			!popularEditais(ano, orgao);
		}
	})

	$("#anoEdital").change(function(){
		$("#cboOrgao").val("nenhum");
		$('#listaCompras > tr').empty();
	})
	
});

function popularOrgao(){
	var sigla = [];
	var descricao = [];
	$.getJSON("Back-end/json/orgaos.json", function (orgaos) {
		for (x = 0; x < orgaos.length; x++) {
			sigla.push(orgaos[x].sigla);
			descricao.push(orgaos[x].nome);
			$("#cboOrgao").append("<option value='" + sigla[x] + "'>[" + sigla[x] + "] - " + descricao[x] + "</option>")			
		}
	});
	
}

function popularEditais(ano, sigla){		
	$("#circle").show();
	$('#listaCompras > tr').empty();
	$.getJSON("Back-end/json_edital/valor_edital_"+ano+".json", function (dadosOrgaos) {	
		for (x = 0; x < dadosOrgaos.length; x++) {	
			if ((sigla == dadosOrgaos[x].sigla) && (dadosOrgaos[x].situacao != 'Anulado / Revogado') && (dadosOrgaos[x].situacao != 'Fracassada') && (dadosOrgaos[x].situacao != 'Suspensa')) {
				var num = dadosOrgaos[x].valor + " ";
				var ponto = num.indexOf(".") + 3;
				var valor = (num.substring(0, ponto));
				$('#listaCompras').append('<tr><td>' + dadosOrgaos[x].edital + '</td><td>' + dadosOrgaos[x].objeto + '</td><td>' + dadosOrgaos[x].empresa + '</td><td class="valorTabela">' + valor + '</td><td>' + dadosOrgaos[x].situacao + '</td></tr>');
			}
		}
		$('.valorTabela').priceFormat({
			prefix: 'R$ ',
			centsSeparator: ',',
			thousandsSeparator: '.'
		});
		$("#circle").hide();
	})  
	  .fail(function() {
		$('#listaCompras').append('<tr><td class="text-center" colspan=5> Não há registros para o órgão selecionado</td><tr>');
	  })
	 ;	
	
	
}