(function(window, document, $) {
  'use strict';

  $('[data-carousel]').slick({
    autoplay: true,
    autoplaySpeed: 3000
  });


  $('[data-anchor]').on('click', function(event){
    event.preventDefault();

    var element = $(this).attr('href');

    $('html, body').stop().animate({
      scrollTop: $(element).offset().top
    }, 600);
  });

}(window, document, jQuery));
