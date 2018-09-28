<?php
/**
 * Template part for displaying google map
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Starter_theme
 */

?>

<section class="googleMap">
	
	<!-- Google map widget -->

	<style>
        .googleMap{
            height: 100%;
        }
		#googleMap__map {
			height: 100%;
			width: 100%;
			padding: 0px 15px;
		}
		@media screen and (max-width: 767px) {
			#googleMap__map{
				height: 400px;
			}
		}
        .googleMap__mapContainer{
            max-width: 100%;
            height: 100%;
		    margin: 0 auto;
		    position: relative;
        }

    </style>
	
	<div class="googleMap__mapContainer">
        <div id="googleMap__map"></div>
    </div>

    <script>
		function initMap() {
			var mapCenter = {lat: 52.227784, lng: 21.033421};
			var map = new google.maps.Map(document.getElementById('googleMap__map'), {
			  zoom: 17,
			  center: mapCenter,
			  disableDefaultUI: true,
			  styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": "-100"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.province",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 65
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "gamma": "2.70"
                            },
                            {
                                "hue": "#ff00e2"
                            },
                            {
                                "saturation": "19"
                            },
                            {
                                "lightness": "-10"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": "-100"
                            },
                            {
                                "lightness": "50"
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "saturation": "-100"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "invert_lightness": true
                            },
                            {
                                "weight": "0.01"
                            },
                            {
                                "lightness": "8"
                            },
                            {
                                "saturation": "-100"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "weight": "0.50"
                            },
                            {
                                "hue": "#ff0000"
                            },
                            {
                                "lightness": "-100"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "invert_lightness": true
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "all",
                        "stylers": [
                            {
                                "lightness": "30"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "all",
                        "stylers": [
                            {
                                "lightness": "40"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "hue": "#ffff00"
                            },
                            {
                                "lightness": -25
                            },
                            {
                                "saturation": -97
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#3f3861"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "lightness": "61"
                            },
                            {
                                "saturation": "-100"
                            }
                        ]
                    }
                ]
			});

            var $path = 'M17.474,0C7.823,0,0,7.824,0,17.474c0,9.651,17.474,28.375,17.474,28.375s17.474-18.724,17.474-28.375 C34.948,7.824,27.124,0,17.474,0z M25.064,26.815c-3.496,3.027-6.479,2.611-6.794,4.601c-0.372,2.366-0.771,6.547-0.771,6.547 s-0.01-0.068-0.025-0.19c-0.015,0.122-0.025,0.19-0.025,0.19s-0.401-4.181-0.773-6.547c-0.312-1.989-3.297-1.573-6.792-4.601 C6.171,23.604,11.53,7.884,11.53,7.884s-3.667,14.02-0.015,18.084c1.596,1.778,5.014,2.428,5.959,4.281 c0.944-1.854,4.363-2.503,5.959-4.281c3.65-4.064-0.015-18.084-0.015-18.084S28.776,23.604,25.064,26.815z';
            var $anchor = new google.maps.Point(17, 45);

			var markerIcon = {
			  path: $path,
			  fillColor: 'white',
			  fillOpacity: 1,
			  scale: 1,
			  strokeWeight: 0,
			  anchor: $anchor
			};

			var markerIconActive = {
			  path: $path,
			  fillColor: '#aa095f',
			  fillOpacity: 1,
			  scale: 1,
			  strokeWeight: 0,
			  anchor: $anchor
			};

			var locationMarkers = [];

			function addLocationMarker(name, lat, lng, status) {

				var name_coordinates = {lat: lat, lng: lng};

				window[name] = new google.maps.Marker({
				  position: name_coordinates,
				  icon: (status===true ? markerIconActive : markerIcon),
				  Animation: (status===true ? google.maps.Animation.BOUNCE : null),
				  map: map
				});

				locationMarkers.push(window[name]);

				// marker click event
				window[name].addListener('click', function() {

					for (var i = 0; i <= locationMarkers.length-1; i++) {

						if (this != locationMarkers[i] ) {
							locationMarkers[i].setIcon(markerIcon);
							locationMarkers[i].setAnimation(null);
						}else{
							this.setIcon(markerIconActive);
							this.setAnimation(google.maps.Animation.BOUNCE);
						}

					}	

		        });
			};

			// Wine avenue
			addLocationMarker('wineavenue', 52.227784, 21.033421, true);

		}

    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDVQTfe6AiAzWWUgWKaksTZiYKo4E6u05g&callback=initMap">
    </script>

    <!-- // Google map widget -->

</section>
