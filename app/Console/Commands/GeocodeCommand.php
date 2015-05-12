<?php namespace App\Console\Commands;

use App\Models\PlantSite;
use App\Services\Geo\Geocoder;
use Illuminate\Console\Command;

class GeocodeCommand extends Command {

    const BATCH_SIZE = 10;

    /**
     * @var string
     */
    protected $name = 'geocode';

    /**
     * @var string
     */
    protected $description = "Pull results for next 10 sites and geocode.";

    protected $gecoder;

    public function __construct(Geocoder $gecoder)
    {
        $this->gecoder = $gecoder;
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {
        $count = 0;

        $sites = PlantSite::whereNull('latitude')
            ->limit(self::BATCH_SIZE)
            ->get();

        foreach ($sites as $site) {

            $count++;

            try {

                //$name = $this->prepareName($site->name);
                $name = $site->name;
                $this->info("Geocoding '{$name}'...");

                if (($result = $this->gecoder->placeSearch($name))) {

                    $site->latitude = $result->geometry->location->lat;
                    $site->longitude = $result->geometry->location->lng;
                    $site->save();

                } else {
                    $this->comment("Could not geocode '{$site->name}'.");
                }

            } catch (\Exception $ex) {
                $message = $ex->getMessage();
                $this->error("Error processsing '{$site->name}': {$message}");
            }

            sleep(1);
        }

        $this->info("Processsed {$count} sites.");
    }

    /**
     * @param $name
     * @return mixed
     */
    protected function prepareName($name)
    {
        $name = strtolower($name);

        if (strpos($name, 'nuclear') !== false || strpos($name, 'power') !== false) {
            return $name;
        }

        if (strpos($name, 'plant')) {
            $name = str_replace('plant', 'nuclear power plant', $name);
        } else if (strpos($name, 'station')) {
            $name = str_replace('station', 'nuclear power station', $name);
        } else {
            $name .= 'nuclear power';
        }

        return $name;
    }

}