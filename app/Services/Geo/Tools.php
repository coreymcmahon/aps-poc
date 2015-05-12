<?php namespace App\Services\Geo;

class Tools
{
    public function calculateDistance($latitude1, $longitude1, $latitude2, $longitude2)
    {
        $geotools = new \League\Geotools\Geotools();
        $coordA   = new \League\Geotools\Coordinate\Coordinate([$latitude1, $longitude1]);
        $coordB   = new \League\Geotools\Coordinate\Coordinate([$latitude2, $longitude2]);

        $distance = $geotools->distance();
        $distance->setFrom($coordA)->setTo($coordB);

        return $distance->greatCircle();
    }

    /**
     * TBA
     *
     * @param $latitude
     * @param $longitude
     * @param $distance
     * @throws \Exception
     */
    public function calculateBounds($latitude, $longitude, $distance)
    {
        throw new \Exception('Not implemented');
    }
}