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
        ? '<i data-feather="moon"></i>'
        : '<i data-feather="sun"></i>';

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

// CARRUSEL DE FLORE MAIN

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

// ANIMACIONES

// =========================================
// ANIMACIONES AL HACER SCROLL
// =========================================

const elementosAnimados = document.querySelectorAll('.animacion-aparecer');

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add('visible');

            observador.unobserve(entrada.target);

        }

    });

}, {
    threshold: 0.15
});

elementosAnimados.forEach((elemento) => {
    observador.observe(elemento);
});

// PAGINA CATALOGO

/* ====================================== */
/* CATÁLOGO - BOTÓN VER MÁS */
/* ====================================== */

document.addEventListener('DOMContentLoaded', function () {

    const tarjetas = document.querySelectorAll('.tarjeta-movil');
    const boton = document.querySelector('#ver-mas');
    const ordenador = window.matchMedia('(min-width: 1024px)');

    let visibles = 5;

    function actualizarCatalogo() {

        tarjetas.forEach(function (tarjeta, indice) {
            tarjeta.style.display = indice < visibles ? 'flex' : 'none';
        });

        if (ordenador.matches || visibles >= tarjetas.length) {
            boton.style.display = 'none';
        } else {
            boton.style.display = 'block';
        }
    }

    boton.addEventListener('click', function () {

        visibles += 5;

        if (visibles > tarjetas.length) {
            visibles = tarjetas.length;
        }

        actualizarCatalogo();
    });

    ordenador.addEventListener('change', function () {
        visibles = 5;
        actualizarCatalogo();
    });

    actualizarCatalogo();

});


/* ====================================== */
/* FEATHER ICONS */
/* ====================================== */

if (typeof feather !== 'undefined') {
    feather.replace();
}
