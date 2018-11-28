/*
biblioteca jquery-animateNumber
http://aishek.github.io/jquery-animateNumber/
14-10-2018
*/

$(document).ready(function () {    

    rodarGastometro();

    var nextElement;

    $("#next").click(function() {
        //var nextElement = $('#ano > option:selected').next('option');
        nextElement = $('#ano > option:selected').next('option');
        if (nextElement.length > 0) {
        $('#ano > option:selected').removeAttr('selected').next('option').attr('selected', 'selected');
        rodarGastometro();
        }
    });

    $("#prev").click(function() {
        nextElement = $('#ano > option:selected').prev('option');
        if (nextElement.length > 0) {
        $('#ano > option:selected').removeAttr('selected').prev('option').attr('selected', 'selected');
        rodarGastometro();
        }
    });

    $('#ano').change(function(){
        rodarGastometro();
    });


    function rodarGastometro() {
        var ano = $('#ano').val();       
        $("#gastometro").show();
        var link = '/Back-end/json_gastometro/gastometro'+ano+'.json';
        var valorTotal = 0;
        $.getJSON(link, function (data) {            
            for (x = 0; x < 4; x++) {                
                valorTotal = valorTotal + data[x].Preco_Maximo;
                var decimal_places = 2;
                var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);
                var num = data[x].Preco_Maximo + " ";
                var ponto = num.indexOf(".") + 3;
                
                $(valor).text(num.substring(0, ponto));
    
                var valor = "#valor" + (x + 1);
                var nome = "#nome" + (x + 1);
    
                $(valor).animateNumber({
                    number: num * decimal_factor,
                    numberStep: function (now, tween) {
                        var floored_number = Math.floor(now) / decimal_factor,
                            target = $(tween.elem);

                        if (decimal_places > 0) {
                            // force decimal places even if they are 0
                            floored_number = floored_number.toFixed(decimal_places);

                            // replace '.' separator with ','
                            floored_number = floored_number.toString().replace('.', ',');
                        }
                        target.text('R$' + floored_number);
                    }
                },  1000,
                    function () {
                        for (i = 1; i < 5; i++) {
                            var valor2 = "#valor" + i;
                            $(valor2).priceFormat({
                                prefix: 'R$ ',
                                centsSeparator: ',',
                                thousandsSeparator: '.'
                            });
    
                        }
    
                    }
                );
                $(nome).text(data[x].UG_Sigla);
                }  
                var decimal_places = 2;
                var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);
                var num = valorTotal + " ";
                var ponto = num.indexOf(".") + 3;
                $('#totalAno').text(num.substring(0, ponto));
                $('#totalAno')
                    .animateNumber(
                        {
                            number: num * decimal_factor,

                            numberStep: function (now, tween) {
                                var floored_number = Math.floor(now) / decimal_factor,
                                    target = $(tween.elem);

                                if (decimal_places > 0) {
                                    // force decimal places even if they are 0
                                    floored_number = floored_number.toFixed(decimal_places);

                                    // replace '.' separator with ','
                                    floored_number = floored_number.toString().replace('.', ',');
                                }

                                target.text('R$' + floored_number);
                            }
                },
                1000,
                function () {
                    $('#totalAno').priceFormat({
                        prefix: 'R$ ',
                        centsSeparator: ',',
                        thousandsSeparator: '.'
                    });
                }
            );        
        });
    }

    /*
    
    DROP AND DRAW
      */
    var obj = $("#dragandrophandler");
    obj.on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).css('border', '2px solid #0B85A1');
    });
    obj.on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    obj.on('drop', function (e) {

        $(this).css('border', '2px dotted #0B85A1');
        e.preventDefault();
        var files = e.originalEvent.dataTransfer.files;

        //We need to send dropped files to Server
        handleFileUpload(files, obj);
    });
    $(document).on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        obj.css('border', '2px dotted #0B85A1');
    });
    $(document).on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });


    /*
    TABELA COM TABULACAO TRADUCAO
    */

    $(document).ready(function () {
        var table = $('#dtBasicExample').DataTable();

        $('#dtBasicExample tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        $('#button').click(function () {
            table.row('.selected').remove().draw(false);
        });
    });

    $('#dtBasicExample').DataTable({
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
            "sEmptyTable": "Sem dados disponiveis na tabela",
            "sInfo": "Exibindo _START_ a _END_ de _TOTAL_ entradas",
            "sInfoEmpty": "Exibindo 0 a 0 de 0 entradas",
            "sInfoFiltered": "(filtered from _MAX_ total entries)",
            "sInfoPostFix": "",
            "sDecimal": "",
            "sThousands": ",",
            "sLengthMenu": "Show _MENU_ entries",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sSearch": "Procurar:",
            "sSearchPlaceholder": "",
            "sUrl": "",
            "sZeroRecords": "Não foi encontrado nenhum dado"
        }
    });
    $('.dataTables_length').addClass('bs-select');

    // Smooth scrolling
    $(function () {


        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, 'easeInOutExpo');

                    if ($(this).parents('.nav-menu').length) {
                        $('.nav-menu .menu-active').removeClass('menu-active');
                        $(this).closest('li').addClass('menu-active');
                    }

                    if ($('body').hasClass('mobile-nav-active')) {
                        $('body').removeClass('mobile-nav-active');
                        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                        $('#mobile-body-overly').fadeOut();
                    }
                    return false;
                }
            }
        });
    });

    // Initiate superfish on nav menu
    $('.nav-menu').superfish({
        animation: { opacity: 'show' },
        speed: 400
    });

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav' });
        $mobile_nav.find('> ul').attr({ 'class': '', 'id': '' });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function (e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function (e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Stick the header at top on scroll
    $("#header").sticky({ topSpacing: 0, zIndex: '50' });

    // Counting numbers

    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    // Tooltip & popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    // Background image via data tag
    $('[data-block-bg-img]').each(function () {
        // @todo - invoke backstretch plugin if multiple images
        var $this = $(this),
            bgImg = $this.data('block-bg-img');

        $this.css('backgroundImage', 'url(' + bgImg + ')').addClass('block-bg-img');
    });

    // jQuery counterUp
    if (jQuery().counterUp) {
        $('[data-counter-up]').counterUp({
            delay: 20,
        });
    }

    //Scroll Top link
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrolltop').fadeIn();
        } else {
            $('.scrolltop').fadeOut();
        }
    });

    $('.scrolltop, #logo a').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000, 'easeInOutExpo');
        return false;
    });









});

/*
SISTEMA DRAW AND DROP
*/

function sendFileToServer(formData, status) {
    var uploadURL = "http://hayageek.com/examples/jquery/drag-drop-file-upload/upload.php"; //Upload URL
    var extraData = {}; //Extra Data.
    var jqXHR = $.ajax({
        xhr: function () {
            var xhrobj = $.ajaxSettings.xhr();
            if (xhrobj.upload) {
                xhrobj.upload.addEventListener('progress', function (event) {
                    var percent = 0;
                    var position = event.loaded || event.position;
                    var total = event.total;
                    if (event.lengthComputable) {
                        percent = Math.ceil(position / total * 100);
                    }
                    //Set progress
                    status.setProgress(percent);
                }, false);
            }
            return xhrobj;
        },
        url: uploadURL,
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        data: formData,
        success: function (data) {
            status.setProgress(100);

            $("#status1").append("File upload Done<br>");
        }
    });

    status.setAbort(jqXHR);
}

var rowCount = 0;
function createStatusbar(obj) {
    rowCount++;
    var row = "odd";
    if (rowCount % 2 == 0) row = "even";
    this.statusbar = $("<div class='statusbar " + row + "'></div>");
    this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
    this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
    this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
    this.abort = $("<div class='abort'>Cancelar</div>").appendTo(this.statusbar);
    obj.after(this.statusbar);

    this.setFileNameSize = function (name, size) {
        var sizeStr = "";
        var sizeKB = size / 1024;
        if (parseInt(sizeKB) > 1024) {
            var sizeMB = sizeKB / 1024;
            sizeStr = sizeMB.toFixed(2) + " MB";
        }
        else {
            sizeStr = sizeKB.toFixed(2) + " KB";
        }

        this.filename.html(name);
        this.size.html(sizeStr);
    }
    this.setProgress = function (progress) {
        var progressBarWidth = progress * this.progressBar.width() / 100;
        this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
        if (parseInt(progress) >= 100) {
            this.abort.hide();
        }
    }
    this.setAbort = function (jqxhr) {
        var sb = this.statusbar;
        this.abort.click(function () {
            jqxhr.abort();
            sb.hide();
        });
    }
}
function handleFileUpload(files, obj) {
    for (var i = 0; i < files.length; i++) {
        var fd = new FormData();
        fd.append('file', files[i]);

        var status = new createStatusbar(obj); //Using this we can set progress.
        status.setFileNameSize(files[i].name, files[i].size);
        sendFileToServer(fd, status);

    }
}


