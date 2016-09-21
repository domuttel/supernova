var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("mobile-e");
var btn2 = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
    modal.style.zIndex = "9999";
    // modal.css("z-index", "2000");
}
btn2.onclick = function() {
    modal.style.display = "block";
    modal.style.zIndex = "9999";
    // modal.css("z-index", "2000");
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    modal.style.zIndex = "-9999";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
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
    var container = $('#loaded-content');
    $('.juror-img').on('click', function() {
        var index = $(this).index();
        container.empty( function(){
        });
        container.fadeIn(1000).load('pages/jurors.html');
        allSched.hide();
        home.hide();
    });
    var screenings = $("#screenings");
    var home = $("#home");
    var education = $('#education');
    var maps = $("#maps");
    var allSched = $(".sched-containers");
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
        else {
            education.fadeIn(1000);
        }
    });
    $('#mobile-sched-list div').on('click', function() {
        var index = $(this).index();
        container.empty();
        hamburger.toggleClass('active');
            $('#mobile-menu').toggle();
        home.hide();
        allSched.hide();
        if (index === 0) {
            screenings.fadeIn(1000);
        }
        else {
            education.fadeIn(1000);
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
            maps.fadeIn(1000);
        }
        else if (index === 2) {
            container.fadeIn(1000).load('pages/jurors.html');
        }
        else if (index === 3) {
            container.fadeIn(1000).load('pages/the-team.html');
        }
        else if (index === 4) {
            container.fadeIn(1000).load('pages/history.html');
        }
        else if (index === 5) {
            container.fadeIn(1000).load('pages/press.html');
        }
        else if (index === 6) {
            container.fadeIn(1000).load('pages/sponsors.html');
        }
        else {
            container.fadeIn(1000).load('pages/guidelines.html');
        }
    });
    $('#mobile-about-list div').on('click', function() {
        var index = $(this).index();
        home.hide();
        allSched.hide();
        container.hide().empty();
        hamburger.toggleClass('active');
            $('#mobile-menu').toggle();
        // $('.nav-list').fadeOut();
        if (index === 0) {
            container.fadeIn(1000).load('pages/festival.html');
        }
        else if (index === 1) {
            maps.fadeIn(1000);
        }
        else if (index === 2) {
            container.fadeIn(1000).load('pages/jurors.html');
        }
        else if (index === 3) {
            container.fadeIn(1000).load('pages/the-team.html');
        }
        else if (index === 4) {
            container.fadeIn(1000).load('pages/history.html');
        }
        else if (index === 5) {
            container.fadeIn(1000).load('pages/press.html');
        }
        else if (index === 6) {
            container.fadeIn(1000).load('pages/sponsors.html');
        }
        else {
            container.fadeIn(1000).load('pages/guidelines.html');
        }
    });

    // $('#mobile-sched-list div').on('click', function() {
    //     var index = $(this).index();
    //     container.empty();
    //     home.hide();
    //     hamburger.toggleClass('active');
    //     $('#mobile-menu').toggle();
    //     // allSched.hide();
    //     if (index === 0) {
    //         screenings.fadeIn(1000);
    //     }
    //     if (index === 1) {
    //         console.log(index);
    //         // console.log("bbb");
    //         // $('#mobile-menu').fadeOut();
    //         education.fadeIn(1000);
    //     }
    //     else{
    //         // $('#mobile-menu').fadeOut();
    //         maps.fadeIn(1000);
    //     }
    // });
    var hamburger = $('#hamburger-icon');
    var mobile = $('#mobile-menu');
    hamburger.click(function() {
        hamburger.toggleClass('active');
        mobile.toggle('slow');
        return false;
        // mobile.animate({top: "+=100"});
    });
    var $contactForm = $('#my-form');
    $contactForm.submit(function(e) {
    	e.preventDefault();
    	$.ajax({
    		url: '//formspree.io/ivar@plusgallery.com',
    		method: 'POST',
    		data: $(this).serialize(),
    		dataType: 'json',
    		beforeSend: function() {
    			$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
    		},
    		success: function(data) {
    			$contactForm.find('.alert--loading').hide();
    			$contactForm.append('<div class="alert alert--success">Message sent!</div>');
    		},
    		error: function(err) {
    			$contactForm.find('.alert--loading').hide();
    			$contactForm.append('<div class="alert alert--error">Oops, there was an error.</div>');
    		}
    	});
    });
});
