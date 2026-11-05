const raiz = document.documentElement;
const botonTema = document.querySelector('#boton-tema');

// CARGAR TEMA GUARDADO
if (localStorage.getItem('tema') === 'oscuro') {
    raiz.classList.add('dark');
}

// ACTUALIZAR ICONO
function actualizarTema() {

    const oscuro = raiz.classList.contains('dark');

    botonTema.innerHTML = oscuro
        ? '<i data-feather="sun"></i>'
        : '<i data-feather="moon"></i>';

    botonTema.setAttribute('aria-pressed', oscuro);

    feather.replace();
}

// MOSTRAR ICONO INICIAL
actualizarTema();

// CAMBIAR TEMA
botonTema.addEventListener('click', function () {

    raiz.classList.toggle('dark');

    const oscuro = raiz.classList.contains('dark');

    localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro');

    actualizarTema();

});
// MENU HAMBURGUESA
$(function () {

    $('.burger').on('click', function () {

        // Mostrar u ocultar el menú
        $('#menu-mov').toggleClass('hidden');

        // Comprobar si el menú está abierto
        const abierto = !$('#menu-mov').hasClass('hidden');

        // Cambiar el icono
        if (abierto) {
            $('#icon-menu').attr('data-feather', 'x');
        } else {
            $('#icon-menu').attr('data-feather', 'menu');
        }

        // Actualizar los iconos de Feather
        feather.replace();

    });

});

// MARQUESINA 

$(document).ready(function () {

    function animarMarquesina() {

        const marquesina = $('.marquesina-contenido');
        const ancho = marquesina.children('p').first().outerWidth(true);

        marquesina.animate(
            {
                marginLeft: -ancho
            },
            15000,
            'linear',
            function () {

                marquesina.css('margin-left', '0');

                animarMarquesina();

            }
        );
    }

    animarMarquesina();

});

$(document).ready(function () {

    $('.carrusel-flores').slick({

        slidesToShow: 1,
        slidesToScroll: 1,

        autoplay: true,
        autoplaySpeed: 2000,

        speed: 500,
        fade: true,

        arrows: false,
        dots: false,

        infinite: true,
        pauseOnHover: false,
        pauseOnFocus: false

    });

});