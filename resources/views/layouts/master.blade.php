<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>@yield('title', '')</title>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key={{ app()->make('config')->get('services.google_maps.browser_key') }}"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.4/flatly/bootstrap.min.css"/>
    <script src="/assets/dist/js/fastclick.js"></script>
    <link rel="stylesheet" href="/assets/dist/css/styles.css"/>
    @yield('head', '')
</head>
<body>
<div id="wrap">
    <div class="container" id="content">
        @yield('content')
    </div><!--/container-->
</div><!--/wrap-->
@yield('bottom', '')
</body>
</html>
