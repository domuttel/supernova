$(document).ready( function() {
    $('#nav-command').on('click','#about-button', function(){
        $('#about-list').fadeIn();
        $('#sched-list').hide();
    });
    $('#nav-command').on('click','#sched-button', function(){
        $('#sched-list').fadeIn();
        $('#about-list').hide();
    });

    $('#enter-sp').on('click', function(){
        $('.vid-controller').fadeOut(400, function(){
            $(this).remove();
        });
        $('#videobg').animate({opacity: 0 }, 800).delay(1000, "fx").queue("fx", function (next) {
            $('#videobg-container').remove();
            next();
        });
    });

    // $(document).scroll(function () {
    //     var y = $(this).scrollTop();
    //     if (y > 1) {
    //         $('#nav-bar').animate({height: "5rem"}, 75).css("background-color", "rgba(255,255,0,0.85)");
    //         $('#logo-banner').css("font-size", "3rem");
    //     }
    //     else if (y < 1) {
    //         $('#nav-bar').animate({height: "6rem"}, 75).css("background-color", "yellow");
    //         $('#logo-banner').css("font-size", "3.3rem");
    //     }
    // });

    var home = $("#home");
    var screenings = $("#screenings");
    var education = $('#education');
    var maps = $("#maps");
    var allSched = $(".sched-containers");
    var container = $('#loaded-content');

    $('#logo-banner').on('click', function() {
        container.empty();
        allSched.hide();
        home.fadeIn(1000);
    });
    $('#sched-list div').on('click', function() {
        var index = $(this).index();
        container.empty();
        $('.nav-list').fadeOut();
        home.hide();
        allSched.hide();
        if (index === 0) {
            screenings.fadeIn(1000);
        }
        else if (index === 1) {
            education.fadeIn(1000);
        }
        else{
            maps.fadeIn(1000);
        }
    });
    $('#about-list div').on('click', function() {
        var index = $(this).index();
        home.hide();
        allSched.hide();
        container.hide().empty();
        $('.nav-list').fadeOut();
        if (index === 0) {
            container.fadeIn(1000).load('pages/festival.html');
        }
        else if (index === 1) {
            container.fadeIn(1000).load('pages/jurors.html');
        }
        else if (index === 2) {
            container.fadeIn(1000).load('pages/the-team.html');
        }
        else if (index === 3) {
            container.fadeIn(1000).load('pages/history.html');
        }
        else if (index === 4) {
            container.fadeIn(1000).load('pages/press.html');
        }
        else if (index === 5) {
            container.fadeIn(1000).load('pages/sponsors.html');
        }
        else {
            container.fadeIn(1000).load('pages/guidelines.html');
        }
    });
    var hamburger = $('#hamburger-icon');
      hamburger.click(function() {
         hamburger.toggleClass('active');
         return false;
      });
});

//# sourceMappingURL=../maps/app.js.map
