
$(document).ready(function () {
	popularOrgao();	
	
	$("#cboOrgao").change(function(){
		$('#listaCompras > tr').empty();
		$("#anoEdital").prop('disabled', false);
		$("#anoEdital").val("nenhum");		
	})

	$("#anoEdital").change(function(){
		var ano = $("#anoEdital").val();
		var orgao = $("#cboOrgao").val();
		if(ano!=null && orgao !=null){
			$("#tabelaEdital").show();
			popularEditais(ano, orgao);
		}
	})

	// $(".btnSelecionarEdital").click(function(){
	// 	var id = $(this).attr('id');
	// 	var dados = id.split("##");
	// 	var edital = dados[0];
	// 	var empresa = dados[1];
	// })

});

function carregarItensBotao(elem){	
	var id = $(elem).attr('id');	
	var dados = id.split("##");
	var edital = dados[0];
	var empresa = dados[1];
	var situacao = dados[2];
	var json = {
		'edital': edital,
		'empresa': empresa,
		'situacao': situacao
	}
	var json = JSON.parse(json);
	
}

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
				id = dadosOrgaos[x].edital+"##"+dadosOrgaos[x].empresa+"##"+dadosOrgaos[x].situacao;
				$('#listaCompras').append('<tr><td id="orgao'+[x]+'">' + dadosOrgaos[x].edital + '</td><td id="empresa'+[x]+'">' + dadosOrgaos[x].empresa + '</td><td id="situacao'+[x]+'">' + dadosOrgaos[x].situacao + '</td><td><button type="button" id="'+id+'" onclick="carregarItensBotao(this)" class="btnSelecionarEdital">Selecionar</button></td></tr>');
			}
		}		
		$("#circle").hide();
	})  
	  .fail(function() {
		$('#listaCompras').append('<tr><td class="text-center" colspan=5> Não há registros para o órgão selecionado</td><tr>');
	  })
	 ;	
	 
	
}