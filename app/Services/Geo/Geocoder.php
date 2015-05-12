<?php namespace App\Services\Geo;

use GuzzleHttp\Client as GuzzleClient;

class Geocoder
{
    public function __construct(GuzzleClient $client)
    {
        $this->client = $client;
    }

    public function fromAddress($address)
    {
        $request = $this->client->createRequest('GET', 'https://maps.googleapis.com/maps/api/geocode/json');

        $request->getQuery()->set('address', $address);
        //$request->getQuery()->set('components', 'country:US');
        $request->getQuery()->set('key', app()->make('config')->get('services.google_maps.server_key'));

        $response = $this->client->send($request);
        $json = $response->getBody()->getContents();

        return json_decode($json);
    }

    public function placeSearch($text)
    {
        $request = $this->client->createRequest('GET', 'https://maps.googleapis.com/maps/api/place/textsearch/json');

        $request->getQuery()->set('query', $text);
        $request->getQuery()->set('key', app()->make('config')->get('services.google_maps.server_key'));

        $response = $this->client->send($request);
        $json = $response->getBody()->getContents();

        return json_decode($json)->results[0];
    }
}