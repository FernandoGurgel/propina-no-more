$(document).ready(function () {

	var teste = 1;
    var title; 
	var novaFuncao;

    $('#xxxxxx thead th').each( function () {
		teste ++;
		
		if(teste <  7){
			title = $('#xxxxxx thead th').eq( $(this).index() ).text();
			$(this).html( '    '+title+' <input type="text"  class="form-control"  placeholder="Pesquisar '+title+'" /> ' );
		}
    } );

    var table = $('#xxxxxx').DataTable( {
		
		   

           "ajax": {
	       "url": "https://raw.githubusercontent.com/propina-no-more/API-propina/master/denuncia.json",
		   "dataSrc": "denuncia"
		},
	    aoColumns: [

            {mData: 'orgao.sigla' },
			{mData: 'orgao.nome' },
			{mData: 'quando' },
			{mData: 'onde' },
			{mData: 'oque' },
		//    {mData: null, sDefaultContent: '<button type="button" class="btn btn-primary">Verificar</button>' }
			
        ],/*
		"aoColumnDefs": [{
               "aTargets": [5],
               "mRender": function (data, type, full) {
				   
				   
                   return '<button type="button" onclick="alert('+data.codDenuncia+');" class="btn btn-primary" >Verificar</button>';
				   
               },
			   
			   
               "fnPreDrawCallback": function () {
                   // gather info to compose a message
                   $('#loading').show();
                   return true;
               },
         "fnDrawCallback": function () {
                   // in case your overlay needs to be put away automatically you can put it here
                   $('#loading').hide();
         }
	}],*/
		"bLengthChange": false,
        "oLanguage": {
            "oAria": {
                "sSortAscending": ": activate to sort column ascending",
                "sSortDescending": ": activate to sort column descending"
            },
            "oPaginate": {
                "sFirst": "Primeiro",
                "sLast": "Último",
                "sNext": "Próximo",
                "sPrevious": "Anterior"
            },
            "sEmptyTable": "Sem dados disponiveis no sistema",
            "sInfo": "Exibindo _START_ a _END_ de _TOTAL_ entradas",
            "sInfoEmpty": "Exibindo 0 a 0 de 0 entradas",
            "sInfoFiltered": "(filtered from _MAX_ total entries)",
            "sInfoPostFix": "",
            "sDecimal": "",
            "sThousands": ",",
            "sLengthMenu": "Show _MENU_ entries",
            "sLoadingRecords": "Carregando dados do sistema...",
            "sProcessing": "Processando dados do sistema...",
            "sSearch": "Pesquisar em todo o banco de dados:",
            "sSearchPlaceholder": "",
            "sUrl": "",
            "sZeroRecords": "Não foi encontrado nenhuma informação no sistema"
        }
    } );
	
	table.columns().eq( 0 ).each( function ( colIdx ) {
        $( 'input', table.column( colIdx ).header() ).on( 'keyup change', function () {
            table
                .column( colIdx )
                .search( this.value )
                .draw();
        } );
    } );
});

function lancarModal(id) {
   alert(id);
}
