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
        $('#videobg').animate({opacity: 0 }, 100, function(){
            $('#enter-sp').hide();
            $('#videobg-container').remove();
        });
    });
    // var video = document.getElementById("videobg");
    // function enterSp(){
    //     video.hide();
    // }
});
