<?php namespace App\Services\Geocoding;

use Geocoder\Geocoder as BaseGeocoder;
use Geocoder\HttpAdapter\GuzzleHttpAdapter;
use Geocoder\Provider\GoogleMapsProvider;
use GuzzleHttp\Client;

class Geocoder
{
    public function __construct(BaseGeocoder $geocoder, Guzzle4HttpAdapter $adapter)
    {
        $this->geocoder = $geocoder;
        $this->adapter = $adapter;
    }

//    public function fromAddress($address)
//    {
//        $provider = new GoogleMapsProvider($this->adapter);
//        $this->geocoder->registerProvider($provider);
//        return $this->geocodeString($address);
//    }
//
//    protected function geocodeString($str)
//    {
//        try {
//
//            $result = $this->geocoder->geocode($str);
//
//            if (!$result) {
//                return false;
//            }
//
//            return [
//                $result->getLatitude(),
//                $result->getLongitude()
//            ];
//
//        } catch (\Exception $ex) {
//            // no-op
//        }
//
//        return false;
//    }

    public function fromAddress($address)
    {
        $client = new Client();

        $request = $client->createRequest('GET', 'https://maps.googleapis.com/maps/api/geocode/json');

        $request->getQuery()->set('address', urlencode($address));
        //$request->getQuery()->set('components', 'country:US');
        $request->getQuery()->set('key', app()->make('config')->get('services.google_maps.server_key'));

        //dd($request);

        $response = $client->send($request);
        $json = $response->getBody()->getContents();

        return json_decode($json);
    }

    public function placeSearch($text)
    {
        // https://maps.googleapis.com/maps/api/place/textsearch/output?parameters

        $client = new Client();

        $request = $client->createRequest('GET', 'https://maps.googleapis.com/maps/api/place/textsearch/json');

        $request->getQuery()->set('query', $text);
        $request->getQuery()->set('key', app()->make('config')->get('services.google_maps.server_key'));

        $response = $client->send($request);
        $json = $response->getBody()->getContents();

        return json_decode($json)->results[0];
    }
}