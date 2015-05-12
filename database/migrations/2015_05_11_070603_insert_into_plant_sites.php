<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InsertIntoPlantSites extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	$now = Carbon\Carbon::now();

        foreach ($this->getData() as $data) {

            DB::table('plant_sites')->insert([
                'name' => $data[0],
                'latitude' => $data[1],
                'longitude' => $data[2],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('plant_sites')->truncate();
    }

    public function getData()
    {
        return [
            ["Arkansas Nuclear One", 35.3188661, -93.2279398],
            ["Beaver Valley Power Station", 40.621435, -80.431776],
            ["Braidwood Station", 41.244385, -88.228798],
            ["Browns Ferry Nuclear Plant", 34.708034, -87.115174],
            ["Brunswick Steam Electric Plant", 40.323946, -75.921651],
            ["Byron Station", 42.073471, -89.282351],
            ["Callaway Plant", 38.762082, -91.78163],
            ["Calvert Cliffs Nuclear Power Plant", 38.431874, -76.452541],
            ["Catawba Nuclear Station", 35.051623, -81.069381],
            ["Clinton Power Station", 40.1720324, -88.829484],
            ["Columbia Generating Station", 38.8831943, -77.0091239],
            ["Comanche Peak Steam Electric Station", 31.820398, -96.05484],
            ["Cooper Nuclear Station ", 40.359657, -95.654654],
            ["Davis-Besse Nuclear Power Station", 41.59545, -83.089507],
            ["Diablo Canyon Nuclear Power Plant", 35.212524, -120.851877],
            ["Donald C. Cook Nuclear Power Plant", 41.975391, -86.565914],
            //["Dresden Nuclear Power Station", 51.11383, 13.58572],
            ["Duane Arnold Energy Center", 42.098184, -91.783282],
            ["Edwin I. Hatch Nuclear Plant", 31.746778, -82.328549],
            ["Fermi", 41.840657, -88.279084],
            ["Fort Calhoun Station", 41.455644, -96.026443],
            ["Grand Gulf Nuclear Station", 30.756667, -91.333333],
            ["H. B. Robinson Steam Electric Plant", 34.402543, -80.156825],
            ["Hope Creek Generating Station", 39.466865, -75.537496],
            ["Indian Point Nuclear Generating", 39.747973, -75.546635],
            ["James A. FitzPatrick Nuclear Power Plant", 43.517358, -76.395557],
            ["Joseph M. Farley Nuclear Plant", 31.223047, -85.112531],
            ["LaSalle County Station", 41.338611, -89.114455],
            ["Limerick Generating Station", 40.226466, -75.583234],
            ["McGuire Nuclear Station", 35.432806, -80.948462],
            ["Millstone Power Station", 41.313405, -72.168456],
            ["Monticello Nuclear Generating Plant", 28.959023, -82.63286],
            ["Nine Mile Point Nuclear Station", 43.52083, -76.407469],
            //["North Anna Power Station", 12.3980311, 78.0513838],
            ["Oconee Nuclear Station", 34.793365, -82.893605],
            ["Oyster Creek Nuclear Generating Station", 39.814106, -74.207661],
            ["Palisades Nuclear Plant", 42.323397, -86.314516],
            ["Palo Verde Nuclear Generating Station", 33.389167, -112.865],
            ["Peach Bottom Atomic Power Station", 39.75921, -76.268794],
            ["Perry Nuclear Power Plant", 41.795684, -81.145404],
            ["Pilgrim Nuclear Power Station", 43.517358, -76.395557],
            ["Point Beach Nuclear Plant", 44.280973, -87.536745],
            ["Prairie Island Nuclear Generating Plant", 44.621524, -92.63319],
            ["Quad Cities Nuclear Power Station", 41.728068, -90.307322],
            //["River Bend Station", 50.976386, -114.013817],
            ["R.E. Ginna Nuclear Power Plant", 43.277651, -77.308801],
            ["St. Lucie Plant", 27.33713, -80.411686],
            ["Salem Nuclear Generating Station", 39.466865, -75.537496],
            ["Seabrook Station", 42.898802, -70.850815],
            ["Sequoyah Nuclear Plant", 35.226521, -85.091928],
            ["Shearon Harris Nuclear Power Plant", 35.633442, -78.955867],
            ["South Texas Project", 28.792222, -96.041944],
            //["Surry Nuclear Power Station", -33.887838, 151.207934],
            ["Susquehanna Steam Electric Station", 41.091821, -76.146004],
            ["Three Mile Island Nuclear Station", 40.15349, -76.723344],
            ["Turkey Point Nuclear Generating", 25.43533, -80.331259],
            ["Vermont Yankee Nuclear Power Plant", 42.779008, -72.513286],
            ["Virgil C. Summer Nuclear Station", 28.959023, -82.63286],
            ["Vogtle Electric Generating Plant", 33.141935, -81.758988],
            //["Waterford Steam Electric Station", 52.340323, -6.463421],
            ["Watts Bar Nuclear Plant", 35.614679, -84.795804],
            ["Wolf Creek Generating Station", 38.242663, -95.688435],
        ];
    }

}
