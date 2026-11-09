$(document).ready(function () {

    // ======================================
    // 1. MODO OSCURO
    // ======================================

    const raiz = $('html');
    const botonTema = $('#boton-tema');

    if (localStorage.getItem('tema') === 'oscuro') {
        raiz.addClass('dark');
    }

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

    if (botonTema.length) {

        actualizarTema();

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

    menuMov.find('a').on('click', cerrarMenu);


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
    // 5. CATÁLOGO MÓVIL - BOTÓN VER MÁS
    // ======================================

    const tarjetas = $('.catalogo-movil .tarjeta-movil');
    const botonMas = $('#ver-mas');

    let visibles = 5;
    const cantidadPorClick = 5;

    const pantallaOrdenador = window.matchMedia('(min-width: 1024px)');

    function actualizarCatalogo() {

        tarjetas.each(function (index) {

            if (index < visibles) {
                this.style.display = 'flex';
            } else {
                this.style.display = 'none';
            }

        });

        if (
            pantallaOrdenador.matches ||
            visibles >= tarjetas.length
        ) {

            botonMas.hide();

        } else {

            botonMas.show();

        }

    }

    if (tarjetas.length && botonMas.length) {

        actualizarCatalogo();

        botonMas.on('click', function () {

            const inicio = visibles;

            visibles = Math.min(
                visibles + cantidadPorClick,
                tarjetas.length
            );

            const nuevasTarjetas = tarjetas.slice(inicio, visibles);

            nuevasTarjetas.each(function () {

                this.style.display = 'flex';
                this.style.opacity = '0';
                this.style.transform = 'translateY(45px)';

            });

            requestAnimationFrame(function () {

                nuevasTarjetas.each(function (index) {

                    const tarjeta = this;

                    const animacion = tarjeta.animate(

                        [
                            {
                                opacity: 0,
                                transform: 'translateY(45px)'
                            },
                            {
                                opacity: 1,
                                transform: 'translateY(0)'
                            }
                        ],

                        {
                            duration: 800,
                            delay: index * 300,
                            easing: 'ease-out',
                            fill: 'forwards'
                        }

                    );

                    animacion.onfinish = function () {

                        tarjeta.style.opacity = '';
                        tarjeta.style.transform = '';

                        animacion.cancel();

                    };

                });

            });

            actualizarCatalogo();

        });

        pantallaOrdenador.addEventListener('change', function () {

            visibles = 5;

            actualizarCatalogo();

        });

    }


    // ======================================
    // 6. FEATHER ICONS
    // ======================================

    if (typeof feather !== 'undefined') {

        feather.replace();

    }


    // ======================================
    // 7. ANIMACIÓN EN ESCALERA DEL CATÁLOGO
    // ======================================

    // CATÁLOGO MÓVIL

    $('.catalogo-movil .tarjeta-movil').each(function(index) {

        $(this).attr('data-aos', 'fade-up');
        $(this).attr('data-aos-delay', (index % 3) * 150);
        $(this).attr('data-aos-duration', '1000');

    });


    // CATÁLOGO ORDENADOR

    let columnas = 2;

    if (window.matchMedia('(min-width: 1280px)').matches) {

        columnas = 5;

    } else if (window.matchMedia('(min-width: 1024px)').matches) {

        columnas = 4;

    } else if (window.matchMedia('(min-width: 768px)').matches) {

        columnas = 3;

    }

    $('.catalogo-extra > article').each(function(index) {

        $(this).attr('data-aos', 'fade-up');

        // PRIMERA FILA

        if (index < columnas) {

            $(this).attr('data-aos-delay', index * 300);
            $(this).attr('data-aos-duration', '1500');

        }

        // RESTO DE FILAS

        else {

            $(this).attr('data-aos-delay', (index % columnas) * 150);
            $(this).attr('data-aos-duration', '1000');

        }

    });


    // ======================================
    // 8. INICIALIZAR AOS
    // ======================================

    if (typeof AOS !== 'undefined') {

        AOS.init({

            once: true,
            offset: 100,
            duration: 1000,
            easing: 'ease-out',
            mirror: false

        });

    }


    // ======================================
    // 9. PÁGINA DE PRODUCTO - PEONÍAS
    // ======================================

    const imagenPrincipal = document.querySelector('#imagen-principal');
    const miniaturas = document.querySelectorAll('.miniatura');
    const nombreFlor = document.querySelector('#nombre-flor');
    const descripcionFlor = document.querySelector('#descripcion-flor');
    const botonReserva = document.querySelector('#anadir-reserva');
    const mensajeReserva = document.querySelector('#mensaje-reserva');

    if (
        imagenPrincipal &&
        miniaturas.length &&
        nombreFlor &&
        descripcionFlor
    ) {

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


        let florSeleccionada = flores.rosa;


        // CAMBIAR INFORMACIÓN DE LA FLOR

        function actualizarFlor(flor) {

            florSeleccionada = flor;

            imagenPrincipal.src = flor.imagen;
            imagenPrincipal.alt = flor.nombre;

            nombreFlor.textContent = flor.nombre;
            descripcionFlor.textContent = flor.descripcion;

            const significados = document.querySelectorAll('.significado');

            significados.forEach(function (elemento, index) {

                if (flor.significados[index]) {

                    elemento.textContent = flor.significados[index];

                }

            });

        }


        // CLICK EN LAS MINIATURAS

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

                miniaturas.forEach(function (elemento) {

                    elemento.classList.remove('seleccionada');

                });

                miniatura.classList.add('seleccionada');

            });

        });


        // AÑADIR A RESERVA

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

    }


   // ======================================
// 10. CURSOR PERSONALIZADO
// ======================================

const cursor = document.querySelector('#cursor-personalizado');

if (cursor) {

    // SEGUIR EL MOVIMIENTO DEL RATÓN

    document.addEventListener('mousemove', function (e) {

        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

    });


    // HOVER EN BOTONES Y ENLACES

    document.querySelectorAll('a, button').forEach(function (elemento) {

        elemento.addEventListener('mouseenter', function () {

            cursor.classList.remove('cursor-ver', 'cursor-escribir');
            cursor.classList.add('cursor-hover');

        });

        elemento.addEventListener('mouseleave', function () {

            cursor.classList.remove('cursor-hover');

        });

    });


    // HOVER EN IMÁGENES Y TARJETAS

    document.querySelectorAll('.tarjeta-movil, .catalogo-extra article, img').forEach(function (elemento) {

        elemento.addEventListener('mouseenter', function () {

            cursor.classList.remove('cursor-hover', 'cursor-escribir');
            cursor.classList.add('cursor-ver');

        });

        elemento.addEventListener('mouseleave', function () {

            cursor.classList.remove('cursor-ver');

        });

    });


    // HOVER EN INPUTS Y TEXTAREA

    document.querySelectorAll('input, textarea').forEach(function (elemento) {

        elemento.addEventListener('mouseenter', function () {

            cursor.classList.remove('cursor-hover', 'cursor-ver');
            cursor.classList.add('cursor-escribir');

        });

        elemento.addEventListener('mouseleave', function () {

            cursor.classList.remove('cursor-escribir');

        });

    });

}

});