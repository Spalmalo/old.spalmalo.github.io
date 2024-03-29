$(document).ready(function() {

  // Detect url and set active menu item
  (function() {
    var pathname = window.location.pathname;
    if (pathname.startsWith("/services/smm")) {
      $(".main-menu__item-smm").addClass("main-menu__item_active");
    } else if (pathname.startsWith("/services/consulting")) {
      $(".main-menu__item-consulting").addClass("main-menu__item_active");
    } else if (pathname.startsWith("/services")) {
      $(".main-menu__item-services").addClass("main-menu__item_active");
    } else if (pathname.startsWith("/projects")) {
      $(".main-menu__item-projects").addClass("main-menu__item_active");
    } else if (pathname.startsWith("/contacts")) {
      $(".main-menu__item-contacts").addClass("main-menu__item_active");
    } else {
      $(".main-menu__item-home").addClass("main-menu__item_active");
    }
  })();


  svg4everybody();

  FastClick.attach(document.body);

  $('.content-wrapper table').basictable({baseClass: 'table'});

  // Paralax background
  (function(){
    var $window = $(window);
    $('[data-paralax-type="background"]').each(function(){
      var $bgobj = $(this);

      $(window).scroll(function() {
        var yPos = -($window.scrollTop() / $bgobj.data('paralax-speed'));
        var coords = '50% '+ yPos + 'px';
        $bgobj.css({
          backgroundPosition: coords
        });
      });
    });
  })();


  // Projects filtring
  (function(){
    var $filterType = $('.nav-menu__item_active a').data('id');
    var $holder = $('.projects-grid');
    var $data = $holder.clone();

    var quicksandOptions = {
      useScaling: true,
      duration: 500,
      adjustHeight: false,
    };

    var $filteredData;

    var handler = function(filterType, menuElement) {
      $('.nav-menu__item').removeClass('nav-menu__item_active');
      $(menuElement).parent().addClass('nav-menu__item_active');

      var height = $holder.find('.projects-grid__item').first().height();
      $data.find('.projects-grid__item').css('height', height);

      if (filterType == 'all') {
        $filteredData = $data.find('.projects-grid__item');
      }
      else {
        $filteredData = $data.find('.projects-grid__item[data-category*=' + filterType + ']');
      }

      $holder.quicksand($filteredData, quicksandOptions);
      // return false;
    }


    $('.nav-menu__link').click(function(e) {
      var filterType = $(this).data('id');
      handler(filterType, this);
    });

    if ($('.project-list').length) {
      $(window).on('popstate', function() {
        var filterType = window.location.hash.split("/")[2]
        handler(filterType, $(".nav-menu a[data-id="+ filterType +"]"));
      });
    }

    $(document).ready(function() {
      $(window).on('orientationchange resize', function(event) {
        event.preventDefault();
        $holder.css({"width": $(this).width()})
      });

      if(window.location.hash) {
        var filterType = window.location.hash.replace('#/category/', '');

        $('.nav-menu__item').removeClass('nav-menu__item_active');
        $('.nav-menu__item').find('a[data-id=' + filterType + ']').parent().addClass('nav-menu__item_active');

        if (filterType == 'all') {
          $filteredData = $data.find('.projects-grid__item');
        }
        else {
          $filteredData = $data.find('.projects-grid__item[data-category=' + filterType + ']');
        }

        $holder.quicksand($filteredData, quicksandOptions);
      }
    });

  })();


  // Here insert modules scripts
  $('.browsehappy').click(function() {
    $(this).slideUp();
  });


  var setFormFieldFocus = function(block, control) {
    var $control = $('.' + block + '__' + control);

    $control.focusin(function(event) {
      $(this).parents('.' + block).addClass(block + '_focused');
    });

    $control.focusout(function(event) {
      $(this).parents('.' + block).removeClass(block + '_focused');
    });
  };


  setFormFieldFocus('select', 'control');
  setFormFieldFocus('input', 'control');
  setFormFieldFocus('textarea', 'control');


  $('.menu-trigger').click(function(event) {
    var $page = $('.page');
    var $trigger = $(this);
    var $overlay = $page.elem('overlay');

    $trigger.ctx('menu-trigger').mod('active', true);
    $page.ctx('page').mod('menu', 'open');

  });


  $('.mobile-menu').each(function(index, el) {
    var $that = $(this);
    var $close = $that.elem('close');
    var $page = $('.page');

    $close.click(function(event) {
      if ($page.hasMod('menu', 'open')) {
        event.preventDefault();
        $page.ctx('page').mod('menu', false);
      }
    });
  });


  // Remodal init
  $('[data-remodal-id]').remodal();


  $('.page').each(function(index, el) {
    $page = $(this);
    $overlay = $page.elem('overlay');

    $overlay.on('click', function(event) {
      event.preventDefault();
      if ($page.hasMod('menu', 'open')) {
        $page.mod('menu', false);
      }
    });
  });

  $('.main-slider__slides').slick(
  {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    dots: true,
    pauseOnDotsHover: true,
    infinite: true,
    pauseOnHover: true,
    arrows: true,
    useTransform: true,
    cssEase: "ease",
    responsive: [
    {
      breakpoint: 900,
      settings:
      {
        dots: false
      }
    },
    {
      breakpoint: 480,
      settings:
      {
        arrows: false,
        dots: false
      }
    }]
  });


});
