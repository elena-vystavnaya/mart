$(document).ready(function(){
    
    //подключение плагина wow
    wow = new WOW(
        {
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
      }
    );
    wow.init();

    //фиксированное меню
    var navHeight = $('.header-top').height();
    var nav = $('.header-menu');
    $(window).scroll(function () {
        if ($(this).scrollTop() > navHeight ) {
            nav.addClass("fixed");
        } else {
            nav.removeClass("fixed");
        }
    });

    //кнопка меню для мобильной версии
    $("#menu").click(function(){
        $("#list").slideToggle(1000);
    });

    //hover для product
    $('.product').mouseover(function(){
        $(this).find('.block-hover').show();
        $(this).find('h3').css("background", "#46bfa9");
        $(this).find('span').css("background", "#a3f3e2");
    });

    $('.product').mouseleave(function(){
        $(this).find('.block-hover').hide();
        $(this).find('h3').css("background", "#323232");
        $(this).find('span').css("background", "#8c8c8c");
    });

    //фильтрация
    var fActive = '';

    function filterColor(category){
        if(fActive != category){
        $('.sort').filter('.'+category).show();
        $('.sort').filter(':not(.'+category+')').hide();
        fActive = category;
        }
    }
        
       $('.f-elem1').click(function(){
            filterColor('elem1'); 
        });
       $('.f-elem2').click(function(){ filterColor('elem2'); });
       $('.f-elem3').click(function(){ filterColor('elem3'); });
        
       $('.f-all').click(function(){
        $('.sort').show();
        fActive = 'all';
       });
});



