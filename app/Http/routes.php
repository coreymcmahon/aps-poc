<?php

$app->get('/', function () {

	//return response()->json(App\Models\PlantSite::all());
	$site = App\Models\PlantSite::first();

    /** @var App\Services\Geocoding\Geocoder $geocoder */
	$geocoder = app()->make('App\Services\Geocoding\Geocoder');

	return response()->json([
        'site' => $site,
        'geo' => $geocoder->placeSearch($site->name)
    ]);
	
});

$app->get('sites/{id}', function ($id) {

    $site = App\Models\PlantSite::findOrFail($id);

    return view('sites.show')
        ->with('site', $site);

});