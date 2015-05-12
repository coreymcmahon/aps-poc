<?php namespace App\Repositories;

use App\Models\PlantSite;

class PlantSites
{
    protected $model;

    public function __construct(PlantSite $model)
    {
        $this->model = $model;
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    /**
     * @param $latitude
     * @param $longitude
     * @param $distance float In km
     * @return array
     */
    public function findWithinDistance($latitude, $longitude, $distance)
    {
        $distance = $distance * 1000;

        // @TODO: optimize this using bounding boxes; see http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates

        /** @var \App\Services\Geo\Tools $geotools */
        $geotools = app()->make('App\Services\Geo\Tools');

        $sites = $this->model->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->get();

        $within = [];

        foreach ($sites as $site) {
            if ($geotools->calculateDistance($latitude, $longitude, $site->latitude, $site->longitude) <= $distance) {
                $within[] = $site;
            }
        }

        return $within;
    }
}