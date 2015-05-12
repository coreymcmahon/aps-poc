<?php

// auth routes

$app->get('/auth/login', function () { return view('auth.login'); });
$app->post('/auth/login', function () { return 'not implemented'; });
$app->get('/auth/logout', function () { app('auth')->logout(); return redirect()->to('/')->with('success_message', 'Signed out.'); });

// front-end app

$app->get('/', function () {
    return view('home.index');
});

// api routes

$app->get('sites', function (App\Repositories\PlantSites $plantSites, Illuminate\Http\Request $request) {

	// within 50 kms
    return response()->json(
    	$plantSites->findWithinDistance($request->get('latitude'), $request->get('longitude'), 81)
	);
    
});

// admin routes

$app->get('admin/sites', function () {
    return view('sites.index')
        ->with('sites', \App\Models\PlantSite::all());
});

$app->get('admin/sites/{id}', function ($id) {
    $site = App\Models\PlantSite::findOrFail($id);
    return view('sites.show')
        ->with('site', $site);
});