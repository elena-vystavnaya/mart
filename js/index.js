$(function(){

    new WOW().init();

    var slider = $('.slider-carousel');
    slider.owlCarousel({
        items:1,
        loop:true,
        autoplay:true,
        autoplayTimeout:5000
    });



    var navHeight = $('.header-top').height();
    var nav = $('.header-menu');
    $(window).scroll(function () {
        if ($(this).scrollTop() > navHeight ) {
            nav.addClass("fixed");
        } else {
            nav.removeClass("fixed");
        }
    });

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

    $("#menu").click(function(){
        $("#list").slideToggle(1000);
    });

    var review = $('.review-carousel');
    review.owlCarousel({
        items:1,
        dotsContainer: '#carousel-custom-dots'
    });  

    var fActive = '';

    function filterColor(category){
        if(fActive != category){
        $('.sort').filter('.'+category).slideDown(1000);
        $('.sort').filter(':not(.'+category+')').slideUp(1000);
        fActive = category;
        $(this).find('span').css("display", "block");
        }
    }
        
       $('.f-elem1').click(function(){
            filterColor('elem1'); 
        });
       $('.f-elem2').click(function(){ filterColor('elem2'); });
       $('.f-elem3').click(function(){ filterColor('elem3'); });
        
       $('.f-all').click(function(){
        $('.sort').slideDown(1000);
        fActive = 'all';
       });
   /* $('.owl-dot').click(function () {
        owl.trigger('to.owl.carousel', [$(this).index(), 300]);
      });*/
});



