$(function () {
    'use strict';

    /*--------------------------------------------------
        WOW Effects Animation
        ---------------------------------------------------*/

    var wow = new WOW({
        boxClass: 'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 100,          // distance to the element when triggering the animation (default is 0)
        mobile: false        // trigger animations on mobile devices (true is default)
    });
    wow.init();

    /*--------------------------------------------------
        Page Scroll Features 
        ---------------------------------------------------*/
    smoothScroll.init({
        speed: 1000,
        updateURL: true,
        offset: 50
    });

    /*--------------------------------------------------
        Menu Features 
        ---------------------------------------------------*/

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').on('click', function () {
        $('.navbar-toggle:visible').trigger('click');
    });

    // Change color from NavBac on Toggle Click
    $('.navbar-toggle').on('click', function () {
        // document.getElementById("navbar-collapse").style.background = "#000";
        // document.getElementById().style.background = "#000";
        //var cclass = $("#navbar-collapse").hasClass("background-color");
        //alert(cclass);
        // $("navbar-collapse").addClass("navbar-black");
    });


    /*--------------------------------------------------
        Open video modal
        ---------------------------------------------------*/

    $('#popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    /*--------------------------------------------------
        Initialize portfolio filter
        ---------------------------------------------------*/

    $('#link-controls').mixItUp();


    /*--------------------------------------------------
        Set main image height.
        ---------------------------------------------------*/

    function homeFullScreen() {
        var homeSection = $('.slide');
        var windowHeight = $(window).outerHeight();
        if (homeSection.hasClass('slide-fullscreen')) {
            $('.slide-fullscreen').css('height', windowHeight);
        }
    }

    homeFullScreen();

    //What happen on window resize
    $(window).resize(function () {
        homeFullScreen();
    });


    function stickyMenu() {

        var scrollTop = $(window).scrollTop();
        var offset = 0;

        if (scrollTop > offset) {
            $('.navbar-default').addClass('navbar-small');
        } else {
            $('.navbar-default').removeClass('navbar-small');
        }
    }

    //What happen on window scroll  
    $(window).on("scroll", function (e) {
        setTimeout(function () {
            stickyMenu();
        }, 300)
    });

    $("body *").mouseover(function () {
        $("#float-btn").css("display", "block");
    });

    $("#contact").mouseover(function () {
        $("#float-btn").css("display", "none");
    });

});

function link_video(opt) {
    var link = '';
    if (opt == 1) {
        link = '';
    } else if (opt == 2) {
        link = '';
    } else if (opt == 3) {
        link = '';
    }
    window.open(link, '_blank');
}

function link_news(opt) {
    var link = '';
    if (opt == 1) {
        link = 'https://www.tjpe.jus.br/web/resolucao-de-conflitos/noticias/-/asset_publisher/1La0I97uEg8A/content/tjpe-promove-acao-do-justica-itinerante-na-cidade-do-paulista/10180?inheritRedirect=false&redirect=https%3A%2F%2Fwww.tjpe.jus.br%2Fweb%2Fresolucao-de-conflitos%2Fnoticias%3Fp_p_id%3D101_INSTANCE_1La0I97uEg8A%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-2%26p_p_col_count%3D2%26_101_INSTANCE_1La0I97uEg8A_advancedSearch%3Dfalse%26_101_INSTANCE_1La0I97uEg8A_keywords%3D%26_101_INSTANCE_1La0I97uEg8A_delta%3D30%26p_r_p_564233524_resetCur%3Dfalse%26_101_INSTANCE_1La0I97uEg8A_cur%3D2%26_101_INSTANCE_1La0I97uEg8A_andOperator%3Dtrue';
    } else if (opt == 2) {
        link = 'https://www.tjpe.jus.br/web/resolucao-de-conflitos/noticias/-/asset_publisher/1La0I97uEg8A/content/indice-de-conciliacao-de-quase-90-marca-14-acao-do-justica-itinerante-no-municipio-do-paulista/10180?inheritRedirect=false&redirect=https%3A%2F%2Fwww.tjpe.jus.br%2Fweb%2Fresolucao-de-conflitos%2Fnoticias%3Fp_p_id%3D101_INSTANCE_1La0I97uEg8A%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-2%26p_p_col_count%3D2%26_101_INSTANCE_1La0I97uEg8A_advancedSearch%3Dfalse%26_101_INSTANCE_1La0I97uEg8A_keywords%3D%26_101_INSTANCE_1La0I97uEg8A_delta%3D30%26p_r_p_564233524_resetCur%3Dfalse%26_101_INSTANCE_1La0I97uEg8A_cur%3D3%26_101_INSTANCE_1La0I97uEg8A_andOperator%3Dtrue';
    } else if (opt == 3) {
        link = 'https://www.tjpe.jus.br/web/resolucao-de-conflitos/noticias/-/asset_publisher/1La0I97uEg8A/content/tribunal-promove-14-acao-do-justica-itinerante-no-municipio-do-paulista/10180?inheritRedirect=false&redirect=https%3A%2F%2Fwww.tjpe.jus.br%2Fweb%2Fresolucao-de-conflitos%2Fnoticias%3Fp_p_id%3D101_INSTANCE_1La0I97uEg8A%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-2%26p_p_col_count%3D2%26_101_INSTANCE_1La0I97uEg8A_advancedSearch%3Dfalse%26_101_INSTANCE_1La0I97uEg8A_keywords%3D%26_101_INSTANCE_1La0I97uEg8A_delta%3D30%26p_r_p_564233524_resetCur%3Dfalse%26_101_INSTANCE_1La0I97uEg8A_cur%3D3%26_101_INSTANCE_1La0I97uEg8A_andOperator%3Dtrue';
    }
    window.open(link, '_blank');
}


/*--------------------------------------------------
    Modal Methods and Effects
    ---------------------------------------------------*/

$(window).on('shown.bs.modal', function () {
    console.log('shown.bs.modal');
    RefreshValidate('#form-agenda');
});

$(window).on('hidden.bs.modal', function () {
    RefreshValidate('#form-agenda');
    console.log('hidden.bs.modal');
});


// $("#modal-agenda").on('shown', function () {
//     alert("I want this to appear after the modal has opened!");
//     $('#modal-agenda').validator('update');
//     $('#modal-agenda').validator('destroy');
// });

$('#submit-modal').on('click', function () {
    // alert('Submit Modal Button');
});

function RegistrarAgenda() {
    if (Validate('#form-agenda')) {
        $("#modal-agenda").modal("hide");

        var data = CarregarDados();
        var json = JSON.stringify(data);
        //console.log(json);

        var win = window.open("register.html?register=" + encodeURIComponent(json), "_blank", "", true);
        win.print();
    }
}

function CarregarDados() {
    var tipo = document.getElementById("rdd-mediacao").checked ? "MEDIAÇÃO" : "ORIENTAÇÃO";
    var assunto = document.getElementById("txt-assunto").value;
    var mensagem = document.getElementById("txt-mensagem").value;
    var nome = document.getElementById("txt-nome").value;
    var fone = document.getElementById("txt-fone").value;
    var email = document.getElementById("txt-email").value;
    var usuario = 0; //Usuário Portal Web
    var datahora = new Date();

    json = {
        tipo: tipo,
        assunto: assunto,
        mensagem: mensagem,
        nome: nome,
        fone: fone,
        email: email,
        usuario: usuario,
        registrado_em: datahora
    };
    return json;
}

function CarregarRegistro(win) {
    var query = win.location.search;
    var param = new URLSearchParams(query);
    var value = param.get('register');

    // $(win.document).ready(function () {
    var data = decodeURIComponent(value);
    var json = JSON.parse(data);

    var ajax = new XMLHttpRequest();
    var host = "localhost";
    var port = "5001";
    var url = "https://" + host + ":" + port + "/Registro/Post";
    ajax.open("POST", url, true);
    ajax.setRequestHeader('Accept', 'application/json');
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.setRequestHeader('Access-Control-Allow-Headers', '*');
    ajax.setRequestHeader('Access-Control-Allow-Origin', '*');
    ajax.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
    ajax.send(JSON.stringify(json));

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var response = ajax.responseText;
            //console.log(response);

            var res = JSON.parse(response);
            var sequencia = res.sequencia;

            var protocolo = win.document.getElementById("reg-protocolo");
            protocolo.innerText = `${protocolo.innerText} ${sequencia}`;

            var assunto = win.document.getElementById("reg-assunto");
            assunto.innerText = assunto.innerText + " " + json.assunto;

            var mensagem = win.document.getElementById("reg-mensagem");
            mensagem.innerText = mensagem.innerText + " " + json.mensagem;

            var nome = win.document.getElementById("reg-nome");
            nome.innerText = nome.innerText + " " + json.nome;

            var telefone = win.document.getElementById("reg-telefone");
            telefone.innerText = telefone.innerText + " " + json.fone;

            var email = win.document.getElementById("reg-email");
            email.innerText = email.innerText + " " + json.email;

            var tipo = win.document.getElementById("reg-tipo");
            tipo.innerText = tipo.innerText + " " + json.tipo;

            var datahora = win.document.getElementById("reg-datahora");
            datahora.innerText = datahora.innerText + " " + json.registrado_em;

            win.focus();
        }
    }
    // });
}
