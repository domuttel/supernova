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
        $('#videobg').hide();
        $(this).hide();
    });
    // var video = document.getElementById("videobg");
    // function enterSp(){
    //     video.hide();
    // }
});

//# sourceMappingURL=../maps/app.js.map
