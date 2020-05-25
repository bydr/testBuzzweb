$(document).ready(function () {

// настроки слайдера фотографий
    $('.user-gallery__carousel').owlCarousel({
        loop: false,
        margin:2,
        dots: false,
        nav:true,
        navText: ["<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "<path d=\"M15.2929 20.7071C15.6834 21.0976 16.3166 21.0976 16.7071 20.7071C17.0976 20.3166 17.0976 19.6834 16.7071 19.2929L15.2929 20.7071ZM8 12L7.29289 11.2929L6.58579 12L7.29289 12.7071L8 12ZM16.7071 4.70711C17.0976 4.31658 17.0976 3.68342 16.7071 3.29289C16.3166 2.90237 15.6834 2.90237 15.2929 3.29289L16.7071 4.70711ZM16.7071 19.2929L8.70711 11.2929L7.29289 12.7071L15.2929 20.7071L16.7071 19.2929ZM8.70711 12.7071L16.7071 4.70711L15.2929 3.29289L7.29289 11.2929L8.70711 12.7071Z\" fill=\"#496ADC\"/>\n" +
        "</svg>\n","<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "<path d=\"M8.70711 3.29289C8.31658 2.90237 7.68342 2.90237 7.29289 3.29289C6.90237 3.68342 6.90237 4.31658 7.29289 4.70711L8.70711 3.29289ZM16 12L16.7071 12.7071L17.4142 12L16.7071 11.2929L16 12ZM7.29289 19.2929C6.90237 19.6834 6.90237 20.3166 7.29289 20.7071C7.68342 21.0976 8.31658 21.0976 8.70711 20.7071L7.29289 19.2929ZM7.29289 4.70711L15.2929 12.7071L16.7071 11.2929L8.70711 3.29289L7.29289 4.70711ZM15.2929 11.2929L7.29289 19.2929L8.70711 20.7071L16.7071 12.7071L15.2929 11.2929Z\" fill=\"#496ADC\"/>\n" +
        "</svg>\n"],
        smartSpeed: 500,
        responsive:{
            0:{
                items: 1
            },
            500:{
                items:1
            },
            768: {
                items: 3
            }
        }
    });


    //кастомизация плавающего label
    var show = 'is-active';
    $('.form-group__element').on('checkval', function () {
        let label = $(this).next('label');
        if(this.value !== '') {
            label.addClass(show);
        } else {
            label.removeClass(show);
        }
    }).on('keyup', function () {
        $(this).trigger('checkval');
    });


    //запуск тестового блока
    $('.run-block-test').on('click', function() {
        $('.block-settings__wrapper')
            .addClass(show)
            .closest('html').addClass(show);
    });


    $('body').on('click', function (e){ // событие клика по веб-документу
        let div = $('.block-settings__wrapper'); // элемент
        if (div.hasClass(show)) {
            if (div.is(e.target) // если клик был по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                div
                    .closest('.block-settings__wrapper').removeClass(show)
                    .closest('html').removeClass(show);
            }
        }
    });

    /* кастомный select */
    $(function () {
        $(document).on('click.simple-select', '.simple-select .simple-select-main', function (e) {
            let $dropdown = $(this).closest('.simple-select');

            $('.simple-select').not($dropdown).removeClass('is-active');
            $dropdown.toggleClass('is-active');
            if (e.originalEvent) {$dropdown.find('.focus').removeClass('focus'); return;}
            if ($dropdown.hasClass('is-active')) {
                $dropdown.find('.focus').removeClass('focus');
                if ($dropdown.find('.simple-select-item.is-active').length) {
                    $dropdown.find('.is-active').addClass('focus');
                } else {
                    $dropdown.find('.simple-select-item').first().addClass('focus');
                }
            } else {
                $dropdown.focus();
            }
        });
        $(document).on('click.simple-select', '.simple-select .simple-select-item:not(.is-active)', function (e) {
            let val = $(this).data('value');
            let select = $(this).closest('.simple-select');
            let text = $(this).html();

            select.removeClass('is-active');
            select.find('.simple-select-item').removeClass('is-active');
            select.find('.simple-select-selected').html(text);
            select.find('input').val(val).change();
            $(this).addClass('is-active').blur();//blur для закрытия списка, из-за стилей, которые позволяют открыть список при фокусе на эл. списка
        });
        $(document).on('click', function (e) {
            if (!$(e.target).closest('.simple-select').length) {
                $('.simple-select').removeClass('is-active');
            }
        });
        $(document).on('keydown.simple-select', '.simple-select', function(event) {
            let $dropdown = $(this);
            let $toggle = $dropdown.find('.simple-select-main');
            let $focused_option = $($dropdown.find('.focus') || $dropdown.find('.simple-select-item.is-active'));
            $focused_option.length === 0 ? $focused_option = $dropdown.find('.simple-select-item').first() : '';
            if (event.keyCode === 32 || event.keyCode === 13) {// Space or Enter
                if ($dropdown.hasClass('is-active')) {
                    $focused_option.trigger('click');
                } else {
                    $toggle.trigger('click');
                }
                return false;
            } else if (event.keyCode === 40) {// Down
                if (!$dropdown.hasClass('is-active')) {
                    $toggle.trigger('click');
                } else {
                    let $next = $focused_option.nextAll('.simple-select-item:not(.disabled)').first();
                    if ($next.length > 0) {
                        $dropdown.find('.focus').removeClass('focus');
                        $next.addClass('focus');
                    }
                }
                return false;
            } else if (event.keyCode === 38) {// Up
                if (!$dropdown.hasClass('is-active')) {
                    $toggle.trigger('click');
                } else {
                    var $prev = $focused_option.prevAll('.simple-select-item:not(.disabled)').first();
                    if ($prev.length > 0) {
                        $dropdown.find('.focus').removeClass('focus');
                        $prev.addClass('focus');
                    }
                }
                return false;
            } else if (event.keyCode === 27) {// Esc
                if ($dropdown.hasClass('is-active')) {
                    $toggle.trigger('click');
                }
            } else if (event.keyCode === 9) {// Tab
                if ($dropdown.hasClass('is-active')) {
                    return false;
                }
            }
        });
    });
    /* кастомный select */


    //кастомизация input[type="range"]
    var sliderRange = $('.slider-range');
    var maxSlideRange = sliderRange.attr("max");
    var minSlideRange = sliderRange.attr("min");
    var sliderRangeOut = $('.slider-range-value');
    sliderRange.bind('keyup mousemove change',function() {
        // sliderRange.change(function() {
        var value = $( this ).val();
        var procent = (100 * value) / maxSlideRange;
        var beginColor = $('.range-color-input');
        var colorDefault = beginColor.attr("value");
        var colorRGBA = convertHexToRGBA(colorDefault, procent);
        var colorNewHex = convertRGBAToHex(colorRGBA);
        sliderRangeOut.html(value+" <span>%</span>");
        beginColor
            .attr("value", colorNewHex);
    });

    const convertHexToRGBA = (hex, opacity) => {
        const tempHex = hex.replace('#', '');
        const r = parseInt(tempHex.substring(0, 2), 16);
        const g = parseInt(tempHex.substring(2, 4), 16);
        const b = parseInt(tempHex.substring(4, 6), 16);

        return `rgba(${r},${g},${b},${opacity / 100})`;
    };

    function convertRGBAToHex(orig) {
        var a, isPercent,
            rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
            alpha = (rgb && rgb[4] || "").trim(),
            hex = rgb ?
                (rgb[1] | 1 << 8).toString(16).slice(1) +
                (rgb[2] | 1 << 8).toString(16).slice(1) +
                (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

        if (alpha !== "") {
            a = alpha;
        } else {
            a = 1;
        }
        // multiply before convert to HEX
        a = ((a * 255) | 1 << 8).toString(16).slice(1)
        hex = hex + a;

        return `#${hex}`;
    }

});
