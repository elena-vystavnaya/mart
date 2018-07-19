$(document).ready(function(){
    new WOW().init();

    var navHeight = 49;
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

    var slider = $('.slider-carousel');
    slider.owlCarousel({
        items:1,
        loop:true,
        autoplay:true,
        smartSpeed:1000,
        autoplayTimeout:5000,
        autoplayHoverPause:true
    });

    var review = $('.review-carousel');
    review.owlCarousel({
        items:1,
        dotsContainer: '#carousel-custom-dots'
    });  

   /* $('.owl-dot').click(function () {
        owl.trigger('to.owl.carousel', [$(this).index(), 300]);
      });*/
});



