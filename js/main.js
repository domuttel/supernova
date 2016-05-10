// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  var blurb = $('<div id="blurb"><p>OUTDOOR FESTIVAL OF DIGITAL ANIMATION AND ART<br>DOWNTOWN DENVER SATURDAY SEPTEMBER 24TH</p></div>');
   var blurbSm = $('<div><p>OUTDOOR FESTIVAL OF DIGITAL ANIMATION AND ART DOWNTOWN DENVER SATURDAY SEPTEMBER 24TH</p></div>');
  $(blurb).appendTo(".navbar-header");
  $(blurbSm).appendTo("#blurb-area");

});
