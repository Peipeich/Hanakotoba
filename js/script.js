
$(document).ready(function () {


    // ======================================
    // 1. MODO OSCURO
    // ======================================

    const raiz = $('html');
    const botonTema = $('#boton-tema');

    // Cargar tema guardado
    if (localStorage.getItem('tema') === 'oscuro') {
        raiz.addClass('dark');
    }

    // Actualizar icono
    function actualizarTema() {

        const oscuro = raiz.hasClass('dark');

        botonTema.html(
            oscuro
                ? '<i data-feather="moon"></i>'
                : '<i data-feather="sun"></i>'
        );

        botonTema.attr('aria-pressed', oscuro);

        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    // Mostrar icono inicial
    if (botonTema.length) {

        actualizarTema();

        // Cambiar tema
        botonTema.on('click', function () {

            raiz.toggleClass('dark');

            const oscuro = raiz.hasClass('dark');

            localStorage.setItem(
                'tema',
                oscuro ? 'oscuro' : 'claro'
            );

            actualizarTema();

        });

    }


    // ======================================
    // 2. MENÚ HAMBURGUESA
    // ======================================

    const burger = $('.burger');
    const menuMov = $('#menu-mov');

    function cerrarMenu() {

        burger.removeClass('activo');
        menuMov.addClass('hidden');

        burger.attr('aria-label', 'Abrir menú');

    }

    burger.on('click', function () {

        const abierto = !$(this).hasClass('activo');

        $(this).toggleClass('activo', abierto);

        menuMov.toggleClass('hidden', !abierto);

        $(this).attr(
            'aria-label',
            abierto ? 'Cerrar menú' : 'Abrir menú'
        );

    });

    // Cerrar al pulsar un enlace
    menuMov.find('a').on('click', function () {

        cerrarMenu();

    });


    // ======================================
    // 3. CARRUSEL DE FLORES
    // ======================================

    if ($('.carrusel-flores').length && $.fn.slick) {

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

    }


    // ======================================
    // 4. ANIMACIONES AL HACER SCROLL
    // ======================================

    const elementosAnimados = $('.animacion-aparecer');

    if ('IntersectionObserver' in window) {

        const observador = new IntersectionObserver(function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    $(entrada.target).addClass('visible');

                    observador.unobserve(entrada.target);

                }

            });

        }, {
            threshold: 0.15
        });

        elementosAnimados.each(function () {

            observador.observe(this);

        });

    } else {

        elementosAnimados.addClass('visible');

    }


    // ======================================
    // 5. CATÁLOGO - BOTÓN VER MÁS
    // ======================================

    const tarjetas = $('.tarjeta-movil');
    const botonMas = $('#ver-mas');

    const ordenador = window.matchMedia('(min-width: 1024px)');

    if (tarjetas.length && botonMas.length) {

        let visibles = 5;

        function actualizarCatalogo() {

            tarjetas.each(function (indice) {

                $(this).css(
                    'display',
                    indice < visibles ? 'flex' : 'none'
                );

            });

            if (ordenador.matches || visibles >= tarjetas.length) {

                botonMas.hide();

            } else {

                botonMas.show();

            }

        }

        // Mostrar más tarjetas
        botonMas.on('click', function () {

            visibles += 5;

            if (visibles > tarjetas.length) {

                visibles = tarjetas.length;

            }

            actualizarCatalogo();

        });

        // Actualizar al cambiar el tamaño de pantalla
        ordenador.addEventListener('change', function () {

            visibles = 5;

            actualizarCatalogo();

        });

        actualizarCatalogo();

    }


    // ======================================
    // 6. FEATHER ICONS
    // ======================================

    if (typeof feather !== 'undefined') {

        feather.replace();

    }


    // ======================================
    // 7. ANIMACIONES AOS
    // ======================================

    if (typeof AOS !== 'undefined') {

        AOS.init({

            duration: 800,
            once: true,
            offset: 80

        });

    }

});


// ======================================
// PÁGINA DE PRODUCTO - PEONÍAS
// ======================================

document.addEventListener('DOMContentLoaded', function () {

    const imagenPrincipal = document.querySelector('#imagen-principal');
    const miniaturas = document.querySelectorAll('.miniatura');

    const nombreFlor = document.querySelector('#nombre-flor');
    const descripcionFlor = document.querySelector('#descripcion-flor');

    const botonReserva = document.querySelector('#anadir-reserva');
    const mensajeReserva = document.querySelector('#mensaje-reserva');

    // ======================================
    // INFORMACIÓN DE LAS PEONÍAS
    // ======================================

    const flores = {
        rosa: {
            id: 1,
            nombre: 'Peonía Rosa',
            imagen: 'media/img/Flor 1.png',
            descripcion: 'La peonía rosa representa el amor, el romance y la admiración. Sus numerosos pétalos simbolizan la belleza, la felicidad y los buenos deseos. Es una flor asociada a los sentimientos sinceros y a la prosperidad.',
            significados: ['Amor', 'Prosperidad', 'Felicidad', 'Belleza'],
            precio: 'Consultar'
        },

        blanca: {
            id: 5,
            nombre: 'Peonía Blanca',
            imagen: 'media/img/Flor 5.png',
            descripcion: 'La peonía blanca simboliza la pureza, la sinceridad y la inocencia. Su aspecto delicado transmite serenidad y elegancia. También representa los nuevos comienzos, la honestidad y los sentimientos más puros.',
            significados: ['Pureza', 'Sinceridad', 'Inocencia', 'Serenidad'],
            precio: 'Consultar'
        },

        lila: {
            id: 19,
            nombre: 'Peonía Lila',
            imagen: 'media/img/Flor 19.png',
            descripcion: 'La peonía lila evoca el encanto, la sensibilidad y la creatividad. Su tonalidad delicada se relaciona con la espiritualidad, la admiración y la originalidad, transmitiendo una belleza misteriosa y elegante.',
            significados: ['Encanto', 'Creatividad', 'Admiración', 'Espiritualidad'],
            precio: 'Consultar'
        },

        amarilla: {
            id: 29,
            nombre: 'Peonía Amarilla',
            imagen: 'media/img/Flor 29.png',
            descripcion: 'La peonía amarilla representa la alegría, la amistad y la energía positiva. Su color luminoso transmite optimismo y vitalidad. También se asocia con la prosperidad, la buena fortuna y los nuevos comienzos.',
            significados: ['Alegría', 'Amistad', 'Optimismo', 'Fortuna'],
            precio: 'Consultar'
        }
    };

    // Flor seleccionada inicialmente
    let florSeleccionada = flores.rosa;


    // ======================================
    // CAMBIAR INFORMACIÓN DE LA FLOR
    // ======================================

    function actualizarFlor(flor) {

        florSeleccionada = flor;

        // Cambiar imagen
        imagenPrincipal.src = flor.imagen;
        imagenPrincipal.alt = flor.nombre;

        // Cambiar nombre y descripción
        nombreFlor.textContent = flor.nombre;
        descripcionFlor.textContent = flor.descripcion;

        // Cambiar significados
        const significados = document.querySelectorAll('.significado');

        significados.forEach(function (elemento, index) {

            if (flor.significados[index]) {
                elemento.textContent = flor.significados[index];
            }

        });

    }


    // ======================================
    // CLICK EN LAS MINIATURAS
    // ======================================

    miniaturas.forEach(function (miniatura) {

        miniatura.addEventListener('click', function () {

            const imagen = miniatura.querySelector('img');

            if (!imagen) return;

            let flor;

            if (imagen.alt.toLowerCase().includes('rosa')) {
                flor = flores.rosa;
            } else if (imagen.alt.toLowerCase().includes('blanca')) {
                flor = flores.blanca;
            } else if (imagen.alt.toLowerCase().includes('lila')) {
                flor = flores.lila;
            } else if (imagen.alt.toLowerCase().includes('amarilla')) {
                flor = flores.amarilla;
            }

            if (!flor) return;

            actualizarFlor(flor);

            // Marcar miniatura seleccionada
            miniaturas.forEach(function (elemento) {
                elemento.classList.remove('seleccionada');
            });

            miniatura.classList.add('seleccionada');

        });

    });


    // ======================================
    // AÑADIR A RESERVA
    // ======================================

    if (botonReserva && mensajeReserva) {

        botonReserva.addEventListener('click', function () {

            let reservas = JSON.parse(
                localStorage.getItem('reservaHanakotoba')
            ) || [];

            const yaExiste = reservas.some(function (flor) {
                return flor.id === florSeleccionada.id;
            });

            if (yaExiste) {

                mensajeReserva.textContent =
                    'Esta flor ya está añadida a tu reserva.';

            } else {

                reservas.push(florSeleccionada);

                localStorage.setItem(
                    'reservaHanakotoba',
                    JSON.stringify(reservas)
                );

                mensajeReserva.textContent =
                    '¡' + florSeleccionada.nombre + ' añadida a tu reserva!';

            }

        });

    }

});

const cursor = document.querySelector('#cursor-personalizado');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});