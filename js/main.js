var positionCarouselIcons = function (animate) {
  var title = $('.carousel-item.active p.title');
  if (title.length === 0) return null;
  var visible = false;
  var offset = title.offset();
  $('.controls-holder').css('top', offset.top).show();
};

var marker = {
  description: '<div class="marker-description"><strong>Brooklyn Outdoor Film Festival</strong><p>The <a href="index.html" target="_blank" title="Opens in a new window">Brooklyn Outdoor Film Festival</a> is taking place at Brooklyn Bridge Park Pier 6 on August 5th to 8th, from 6:00 p.m. to midnight.</p></div>',
  coordinates: [-73.9983318, 40.6972861]
}

// scroll to functions
// add event listener on load
window.addEventListener('load', function () {
  // scroll into form
  if (document.querySelector('.expand-more') !== null)
    document.querySelector('.expand-more').addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('.form').scrollIntoView({
        behavior: 'smooth'
      });
    });
  // scroll into main view
  if (document.querySelector('.expand-more') !== null)
    document.querySelector('.expand-less').addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('.photo').scrollIntoView({
        behavior: 'smooth'
      });
    });
});

$(document).ready(function () {
  if (typeof movieList !== 'undefined') {
    movieList.forEach(function (movie) {
      // build movie list
      if ($('.film-list').length > 0)
        $('.film-list').append('<li title="' + movie.date + " at " + movie.time + '"><a href="movies.html" >' + movie.title + '</a></li>');
      // build carousel
      if ($('.carousel-inner').length > 0)
        $('.carousel-inner').append('<div class="carousel-item"><div class="movie-container"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + movie.link + '?rel=0&amp;controls=0&amp;showinfo=0" allowfullscreen></iframe></div><div class="movie"><p class="title">' + movie.title + '</p><p class="showing">(' + movie.date + " at " + movie.time + ')</p><p class="description">' + movie.description + '</p></div></div></div>');
    });
  }
  // make first carousel slide active
  $('.carousel-item:first-of-type').addClass('active');
  // intialise carousel
  $('#moviesCarousel').carousel();
  // initialise datepicker
  $('#datepicker').datepicker();
  // initialise map
  if ($('#map').length > 0) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGdpYW5ub3BvdWxvcyIsImEiOiJjaXMxcDNubzUwMDcwMnNvN2J0anM4NTZmIn0.Kqsm0k8ynMSIQAvla4P_rQ';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/bright-v9',
      center: marker.coordinates, // starting position
      zoom: 16 // starting zoom
    });
    // add controls to map
    map.addControl(new mapboxgl.NavigationControl());

    // add custom marker
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.coordinates)
      .setPopup(new mapboxgl.Popup({
          offset: 10
        }) // add popups
        .setHTML(marker.description))

      .addTo(map);

    map.on('load', function () {
      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
      });
      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
      });
    });
  }
  positionCarouselIcons();
  window.addEventListener('resize', function (event) {
    positionCarouselIcons();
  });

  $('button.navbar-toggler').on('click', function () {
    // console.info($(this));
    $('.controls-holder').hide();
    setTimeout(function () {
      positionCarouselIcons();
    }, 300);
  });

  $(".top").click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });

  /*
   * Replace all SVG images with inline SVG
   */
  jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class').split(' ')[0];
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');

  });


}); // end of $(document).ready
