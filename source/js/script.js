$(document).ready(function(){
  $('.main-slider__container').slick({
    infinite: true,
    adaptiveHeight: true,
    draggable: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          dots: false,
        }
      }
    ]
  });
  
  $('.reviews-slider__container').slick({
    infinite: true,
    adaptiveHeight: true,
    draggable: true,
  });
  
    $('.hits-slider__container').slick({
      infinite: true,
      adaptiveHeight: true,
      draggable: true,
    });
  
  $(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
      $('#scroller').fadeIn();
      $('.to-top__btn').addClass('to-top__btn--visible');
    } else {
      $('#scroller').fadeOut();
      $('.to-top__btn').removeClass('to-top__btn--visible');
    }
  });
  $('#scroller').click(function() {
    $('body,html').animate({scrollTop: 0}, 500); 
    return false;
  });
  
  
  
  var $burger = $('.top-nav__burger');
  var $menu = $('.top-nav__wrapper');
  
  $burger.on('click', function(e) {
    e.preventDefault();
    $burger.toggleClass('top-nav__burger--opened');
    $menu.toggleClass('top-nav__wrapper--opened');
  });
  
  var slinky = $('.top-nav__list').slinky({
    title: true
  });
  
  if( window.innerWidth >= 1024 ){
      slinky.destroy();
  }
  
  $('[data-popup-close]').on('click', function(e) {
    e.preventDefault();
    $('.popup').toggleClass('popup--hidden');
    $('.popup__container').toggleClass('popup__container--hidden');
  });
});

