<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title></title>
</head>
<body>
<div id="wrap">
    <div class="container" id="content">

    @if ($site)
        <h2>{{ $site->name }}</h2>
        <img src="https://maps.googleapis.com/maps/api/staticmap?size=500x400&markers={{$site->latitude}},{{$site->longitude}}" alt="{{ $site->name }}"/>
        <a href="https://www.google.com/maps?q=loc:{{$site->latitude}},{{$site->longitude}}">google maps</a>
    @else
        <h2>site not found.</h2>
    @endif

    </div><!--/container-->
    <div class="footer">
        <div class="container">
            <p class="text-muted">{{ date('Y') }} <a href="http://slashnode.com">slashnode</a></p>
        </div><!--/container-->
    </div><!--/footer-->
</div><!--/wrap-->
</body>
</html>
