<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title></title>
    <style type="text/css">
        html, body, #google-map { height: 100%; margin: 0; padding: 0;}
    </style>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key={{ app()->make('config')->get('services.google_maps.browser_key') }}"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.4/flatly/bootstrap.min.css"/>
</head>
<body>
<div id="wrap">
    <div class="container" id="content">

        <div id="google-map" style="width: 800px; height: 600px;"></div>

        <script>
            var map, markers = [], latLngs = [];
            // init map
            function initialize() {
                var mapOptions = {
                    center: { lat: -34.397, lng: 150.644},
                    zoom: 8
                };
                map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
                addMarkers();
            }
            google.maps.event.addDomListener(window, 'load', initialize);

            // add markers in here
            function addMarkers() {
                var bounds = new google.maps.LatLngBounds();

                @foreach ($sites as $site)
                latLngs.push(new google.maps.LatLng("{{ $site->latitude }}","{{ $site->longitude }}"));
                markers.push(new google.maps.Marker({
                    position: latLngs[latLngs.length-1],
                    map: map,
                    title: "{{ $site->name }}"
                }));
                bounds.extend(latLngs[latLngs.length-1]);
                @endforeach

                map.fitBounds(bounds);
            }
        </script>

    </div><!--/container-->
    <div class="footer">
        <div class="container">
            <p class="text-muted">{{ date('Y') }} <a href="http://slashnode.com">slashnode</a></p>
        </div><!--/container-->
    </div><!--/footer-->
</div><!--/wrap-->
</body>
</html>
