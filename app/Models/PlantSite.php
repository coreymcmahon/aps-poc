<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;

class PlantSite extends Eloquent
{
    protected $table = 'plant_sites';

    protected $fillable = [
        'name',
        'latitude',
        'longitude',
    ];
}