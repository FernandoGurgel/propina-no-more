var datalist = [];

var editalPersist = [];

$(document).ready(() => {
    $("#btnSubmit").click((event) => {
        //stop submit the form, we will post it manually.
        event.preventDefault();
        doAjax();
    });

    $("#submitDenuncia").click(function () {

        var dados = {};

        var ano = $('#anoEdital').val();
        var valor = $("#cboOrgao").val();
        var sigla = valor.substring(0, valor.indexOf("-"));
        var orgao = valor.substring(valor.indexOf("-") + 1);
        var sigilo;
        if($('#sigilo').prop('checked')){
            sigilo = 'S'
        }else{
            sigilo = 'N';
        }
        var denuncianteNome = $('#nomeDenunciante').val();
        var denuncianteEmail = $('#nomeDenunciante').val();
        var denuncianteTelefone = $('#telefoneDenunciante').val();
        var oque = $('#oque').val();
        var quando = $('#quando').val();
        var onde = $('#onde').val();
        var lista = [];
        lista = denunciado(lista);
        console.log(denunciado);
        var prova = []
        prova = provaLista(prova);

        dados = { "ano": ano,"oque":oque,"onde":onde,"quando":quando,"sigilo": sigilo, "nome":denuncianteNome, "telefone":denuncianteTelefone, 
        "edital": editalPersist,
        "orgao": { "sigla": sigla, "nome": orgao },  "denunciado" : lista, "provas": prova};

        $.ajax({
            type:"POST",
            headers:{
                'accept':'application/json',
                'content-Type': 'application/json'
            },
			url: "http://localhost:9000/api/v1/denuncia/",
			data: JSON.stringify(dados)
        });
        
        alert('Denúncia enviada com sucesso!');
    });
});


function carregarItensBotao(elem){
    var valor = $("#cboOrgao").val();
    var sigla = valor.substring(0, valor.indexOf("-"));
    var orgao = valor.substring(valor.indexOf("-") + 1);
    var id = $(elem).attr('id');	
	var dados = id.split("##");
	var edital = dados[0];
	var empresa = dados[1];
	var situacao = dados[2];
	var json = {
		'ganhador': empresa,
        'referencia': edital,
        "objetoLicitado":"",
		'status': situacao,
        "orgao_id": { 
            "nome": orgao,
            "sigla": sigla 
        }	
	}
    editalPersist.push(json);
    alert("Edital: "+editalPersist[0].referencia);
	
}

function provaLista(prova){
    var listacodProva = document.querySelectorAll("div#evidencia input#codProva");

    var data = prova;
    
    for (i = 0; i < listacodProva.length; i++){
        data.push({"codProva":listacodProva[i].value});
    }
    
    return data;
}


function denunciado(denunciado) {
    var listanome = document.querySelectorAll("input#field-name");
    var listacargo = document.querySelectorAll("input#field-cargo");
    var listainfoadd = document.querySelectorAll("input#field-infoadd");


    for (i = 0; i < listanome.length; i++) {
        denunciado.push({
            "nome": listanome[i].value,
            "cargo": listacargo[i].value,
            "infoAdicional": listainfoadd[i].value
        });
    }
    console.log(denunciado);
    return denunciado;

};


function doAjax() {

    // Get form
    var form = $('#fileUploadForm')[0];
    var data = new FormData(form);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "http://localhost:9000/api/v1/denuncia/arquivo",
        data: data,
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        cache: false,
        success: (data) => {
            $("#listFiles").append("<p>" + data.nome + "</p>");
            $("#evidencia").append("<div><input type='hidden' id='codProva' value='" + data.codProva + "' /> </div>");
        },
        error: (e) => {
            $("#listFiles").text(e.responseText);
        }
    });
}