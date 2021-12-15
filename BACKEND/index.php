<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\JwtAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/vendor/autoload.php';
//require_once __DIR__ . '/bootstrap.php';

$app = AppFactory::create();

function addHeaders(Response $response, array $headersOrigin) : Response {
    $origin = 'herokuapp';

    if(count ($headersOrigin) > 0) {
        $origin = $headersOrigin[0];
    }

    //(str_contains($origin, 'localhost') ? 'http://localhost:4200/' : 'https://tp05-leppert-michael.herokuapp.com/')
    $response = $response
    ->withHeader("Content-Type", "application/json")
    ->withHeader("Access-Control-Allow-Origin", ("*"))
    ->withHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
    ->withHeader("Access-Control-Expose-Headers", "Authorization");

    return $response;
}

function createJwt (Response $response) : Response {
    $userid = "micha";
    $email = "micha@micha.fr";
    $issuedAt = time();
    $expirationTime = $issuedAt + 60;

    $payload = array(
        'userid' => $userid,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");

    return $response;
}

const JWT_SECRET = "mykey12345abcd";

$app->options('/api/auth/{login}', function (Request $request, Response $response, $args) {
    $response = $response->withHeader('Access-Control-Max-Age', 600);
    return addHeaders($response, $request->getHeader('Origin'));
});

$app->get('/api/auth/{login}', function (Request $request, Response $response, $args) {
    global $entityManager;

    $login = $args['login'];

    if($login) {
        $data = array('login' => $login);
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response = createJwt($response);
        $response->getBody()->write(json_encode($data));
    }
    else {
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->post('/api/login', function (Request $request, Response $response, $args) {
    global $entityManager;
    $err = false;
    $body = $request->getParsedBody();
    $login = $body['login'] ?? "";
    $pass = $body['pass'] ?? "";

    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login)){
        $err = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$pass)){
        $err = true;
    }
    if(!$err)
    {
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response = createJwt($response);
        $data = array('nom' => $login);
        $response->getBody()->write(json_encode($data));
    }
    else {
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->get('/api/hello/{login}', function (Request $request, Response $response, $args) {
    $response->getBody()->write($args['login']);
    return $response;
    });

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello", "/api/login"],
    "error" => function($response, $arguments){
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->add(new Tuupola\Middleware\JwtAuthentication($options));

// Run app
$app->run(); 
 
?>