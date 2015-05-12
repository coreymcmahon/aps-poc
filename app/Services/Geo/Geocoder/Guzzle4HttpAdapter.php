<?php namespace App\Services\Geo\Geocoder;

use Geocoder\HttpAdapter\HttpAdapterInterface;

use GuzzleHttp\ClientInterface;
use GuzzleHttp\Client;

class Guzzle4HttpAdapter implements HttpAdapterInterface
{
    /**
     * @var ClientInterface
     */
    protected $client;

    /**
     * @param ClientInterface $client Client object
     */
    public function __construct(ClientInterface $client = null)
    {
        $this->client = null === $client ? new Client() : $client;
    }

    /**
     * {@inheritDoc}
     */
    public function getContent($url)
    {
        $request = $this->client->createRequest('GET', $url);
        $response = $this->client->send($request);

        return (string) $response->getBody()->getContents();
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return 'guzzle4';
    }
}
