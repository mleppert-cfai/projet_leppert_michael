<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\JwtAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/bootstrap.php';

$app = AppFactory::create();

function addHeaders(Response $response, array $headersOrigin) : Response {
    $origin = 'herokuapp';

    if(count ($headersOrigin) > 0) {
        $origin = $headersOrigin[0];
    }
    
    //("*")
    //(str_contains($origin, 'localhost') ? 'http://localhost:4200/' : 'https://tp05-leppert-michael.herokuapp.com/')
    $response = $response
    ->withHeader("Content-Type", "application/json")
    ->withHeader("Access-Control-Allow-Origin", (str_contains($origin, 'localhost') ? 'http://localhost:4200' : 'https://projet-michael-leppert.herokuapp.com'))
    ->withHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
    ->withHeader("Access-Control-Expose-Headers", "Authorization");

    return $response;
}

function createJwt (Response $response) : Response {
    $userid = "micha";
    $email = "micha@micha.fr";
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;

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

$app->options('/{routes:.+}', function (Request $request, Response $response, $args) {
    $response = $response->withHeader('Access-Control-Max-Age', 600);
    return addHeaders($response, $request->getHeader('Origin'));
});

$app->get('/api/login/{login}', function (Request $request, Response $response, $args) {
    global $entityManager;
    $login = $args['login'];

    $client = $entityManager->getRepository('Client')->findOneBy(array('login' => $login));

    if($login && $client != null) {
        $data = array(
            'id_client' => $client->getIdClient(),
            'firstname' => $client->getFirstname(),
            'lastname' => $client->getLastname(),
            'civility' => $client->getCivility(),
            'address' => $client->getAddress(),
            'city' => $client->getCity(),
            'zip' => $client->getZip(),
            'country' => $client->getCountry(),
            'email' => $client->getEmail(),
            'phone' => $client->getPhone(),
            'login' => $client->getLogin(),
            'password' => $client->getPassword()
        );
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data));
    }
    else {
        $response = addHeaders($response, $request->getHeader('Origin'));
        $data = array('ERROR' => "Failed to get login");
        $response->getBody()->write(json_encode($data));
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->post('/api/login/', function (Request $request, Response $response, $args) {
    global $entityManager;
    $body = $request->getParsedBody();
    $login = $body['login'] ?? "";
    $password = $body['password'] ?? "";
    $err = 
    $login == "" ||
    $password == "";

    $client = $entityManager->getRepository('Client')->findOneBy(array('login' => $login));

    if($client != null && password_verify($password, $client->getPassword()))
    {
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response = createJwt($response);
        $data = array('SUCCESS' => 'Login succeded');
        $response->getBody()->write(json_encode($data));
    }
    else {
        $response = addHeaders($response, $request->getHeader('Origin'));
        $data = array('ERROR' => "Mauvais login ou mot de passe");
        $response->getBody()->write(json_encode($data));
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->post('/api/register/', function (Request $request, Response $response, $args) {
    global $entityManager;
    $body = $request->getParsedBody();
    $firstname = $body['firstname'] ?? "";
    $lastname = $body['lastname'] ?? "";
    $civility = $body['civility'] ?? "";
    $address = $body['address'] ?? "";
    $city = $body['city'] ?? "";
    $zip = $body['zip'] ?? "";
    $country = $body['country'] ?? "";
    $email = $body['email'] ?? "";
    $phone = $body['phone'] ?? "";
    $login = $body['login'] ?? "";
    $password = $body['password'] ?? "";

    $err =
    $firstname == "" ||
    $lastname == "" ||
    $civility == "" ||
    $address == "" ||
    $city == "" ||
    $zip == "" ||
    $country == "" ||
    $email == "" ||
    $phone == "" ||
    $login == "" ||
    $password == "";

    if($entityManager->getRepository('Client')->findOneBy(array('login' => $login)) != null){
        $response = addHeaders($response, $request->getHeader('Origin'));
        $data = array('ERROR' => "Ce login est deja utilise");
        $response->getBody()->write(json_encode($data));
        $response = $response->withStatus(401);
    }
    else if($entityManager->getRepository('Client')->findOneBy(array('email' => $email)) != null){
        $response = addHeaders($response, $request->getHeader('Origin'));
        $data = array('ERROR' => "Cet email est deja utilise");
        $response->getBody()->write(json_encode($data));
        $response = $response->withStatus(401);
    }
    else if(!$err)
    {   
        $client = new Client();
        $client->setFirstname($firstname);
        $client->setLastname($lastname);
        $client->setCivility($civility);
        $client->setAddress($address);
        $client->setCity($city);
        $client->setZip($zip);
        $client->setCountry($country);
        $client->setEmail($email);
        $client->setPhone($phone);
        $client->setLogin($login);
        $client->setPassword(password_hash($password, PASSWORD_DEFAULT));

        $entityManager->persist($client);
        $entityManager->flush();
        
        $response = addHeaders($response, $request->getHeader('Origin'));
        $data = array('SUCCESS' => "Register succeded");
        $response->getBody()->write(json_encode($data));
    }
    else {
        $response = addHeaders($response, $request->getHeader('Origin'));
        $data = array('ERROR' => "Invalid register");
        $response->getBody()->write(json_encode($data));
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->post('/api/order/', function (Request $request, Response $response, $args) {
    global $entityManager;
    $err = false;
    $body = $request->getParsedBody();
    $id_client = $body['id_client'] ?? "";
    $array_id_products = $body['id_products'] ?? "";
    
    $date = new DateTime();
    $date->format('d-m-Y H:i:s');
    $date->getTimestamp();
    
    $err =
    $id_client == "" ||
    $array_id_products == "";

    if(!$err)
    {        
        $array_product = explode(',', $array_id_products, PHP_INT_MAX);
        $client = $entityManager->getRepository('Client')->findOneBy(array('idClient' => $id_client));

        $lastorder = $entityManager->getRepository('OrderHistory')->findBy(array(), array('idOrder' => 'DESC'));
        $lastorder = $lastorder[0];
        $lastorder_id = -1;

        if($lastorder == null){
            $lastorder_id = 0;
        }
        else{
            $lastorder_id = $lastorder->getIdOrder();
        }
        $lastorder_id++;

        foreach($array_product as $id_product)
        {
            $product = $entityManager->getRepository('Product')->findOneBy(array('idProduct' => $id_product));
            $order = new OrderHistory();
            $order->setIdOrder($lastorder_id);
            $order->setFkClient($client);
            $order->setFkProduct($product);
            $order->setDate($date);
            $entityManager->persist($order);                  
        }
        $entityManager->flush();
        $response = addHeaders($response, $request->getHeader('Origin'));
        $data = array('SUCCESS' => "Order succeded");
        $response->getBody()->write(json_encode($data));
    }
    else {    
        $response = addHeaders($response, $request->getHeader('Origin'));    
        $data = array('ERROR' => "Invalid order");
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->get('/api/orderhistory/{id_client}', function (Request $request, Response $response, $args) {
    global $entityManager;

    $id_client = $args['id_client'] ?? "";

    $err =
    $id_client == "";

    $orderhistory = null;

    if(!$err){
        $client = $entityManager->getRepository('Client')->findBy(array('idClient' => $id_client));

        if($client != null){            
            $orderhistory = $entityManager->getRepository('OrderHistory')->findBy(array('fkClient' => $client), array('date' => 'DESC'));
        }
    }

    if($orderhistory != null) {
        $data = array();
        $lastDate = "date";

        foreach($orderhistory as $order)
        {
            $productsSameDate_id = null;
            $productsSameDate = null;

            if($lastDate != $order->getDate()->format('d-m-Y'))
            {
                $orderSameDate = $entityManager->getRepository('OrderHistory')->findBy(array('idOrder' => $order->getIdOrder()));
                $productsSameDate_id = array();
                foreach($orderSameDate as $order){
                    array_push($productsSameDate_id, $order->getFkProduct()->getIdProduct());                    
                }
                $productsSameDate = $entityManager->getRepository('Product')->findBy(array('idProduct' => $productsSameDate_id));
                $arrayProducts = array();
                foreach($productsSameDate as $product){
                    $category = $entityManager->getRepository('Category')->findOneBy(array('idCategory' => $product->getFkCategory()));
                    $period = $entityManager->getRepository('Period')->findOneBy(array('idPeriod' => $product->getFkPeriod()));
                    $country = $entityManager->getRepository('Country')->findOneBy(array('idCountry' => $product->getFkCountry()));
                    $productsInfo = array(
                            'id_product' => $product->getIdProduct(),
                            'name' => $product->getName(),
                            'description' => $product->getDescription(),
                            'image' => $product->getImage(),
                            'price' => $product->getPrice(),
                            'fk_category' => $category->getName(),
                            'fk_period' => $period->getName(),
                            'fk_country' => $country->getName(),
                    );
                    array_push($arrayProducts, $productsInfo);
                }
                $infosHistory = array(
                    'id_order' => $order->getIdOrder(),
                    'orderDate' => $order->getDate()->format('d-m-Y'),
                    'list_products' => $arrayProducts,
                );    
                array_push($data, $infosHistory);
            }
            $lastDate = $order->getDate()->format('d-m-Y');
        }
            
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data));
    }
    else {
        $response = addHeaders($response, $request->getHeader('Origin')); 
        $data = array('ERROR' => "Failed to get history");
        $response->getBody()->write(json_encode($data));
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->get('/api/products/', function (Request $request, Response $response, $args) {
    global $entityManager;

    $products = $entityManager->getRepository('Product')->findAll();

    if($products != null) {
        $data = array();
        foreach($products as $product)
        {
            $category = $entityManager->getRepository('Category')->findOneBy(array('idCategory' => $product->getFkCategory()));
            $period = $entityManager->getRepository('Period')->findOneBy(array('idPeriod' => $product->getFkPeriod()));
            $country =$entityManager->getRepository('Country')->findOneBy(array('idCountry' => $product->getFkCountry()));
            $infosProduct = array(
                'id_product' => $product->getIdProduct(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'image' => $product->getImage(),
                'price' => $product->getPrice(),
                'fk_category' => $category->getName(),
                'fk_period' => $period->getName(),
                'fk_country' => $country->getName(),
            );
            array_push($data, $infosProduct);
        }
            
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data));
    }
    else {
        $response = addHeaders($response, $request->getHeader('Origin')); 
        $data = array('ERROR' => "Failed to get products");
        $response->getBody()->write(json_encode($data));
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->get('/api/categories/', function (Request $request, Response $response, $args) {
    global $entityManager;

    $categories = $entityManager->getRepository('Category')->findAll();

    if($categories != null) {
        $data = array();
        foreach($categories as $category)
        {
            $infosCategory = array(
                'id_category' => $category->getIdCategory(),
                'name' => $category->getName(),
            );
            array_push($data, $infosCategory);
        }
            
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data));
    }
    else {
        $response = addHeaders($response, $request->getHeader('Origin')); 
        $data = array('ERROR' => "Failed to get categories");
        $response->getBody()->write(json_encode($data));
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->get('/api/countries/', function (Request $request, Response $response, $args) {
    global $entityManager;

    $countries = $entityManager->getRepository('Country')->findAll();

    if($countries != null) {
        $data = array();
        foreach($countries as $country)
        {
            $infosCountry = array(
                'id_country' => $country->getIdCountry(),
                'name' => $country->getName(),
            );
            array_push($data, $infosCountry);
        }
            
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data));
    }
    else {
        $response = addHeaders($response, $request->getHeader('Origin')); 
        $data = array('ERROR' => "Failed to get countries");
        $response->getBody()->write(json_encode($data));
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->get('/api/periods/', function (Request $request, Response $response, $args) {
    global $entityManager;

    $periods = $entityManager->getRepository('Period')->findAll();

    if($periods != null) {
        $data = array();
        foreach($periods as $period)
        {
            $infosPeriod = array(
                'id_period' => $period->getIdPeriod(),
                'name' => $period->getName(),
                'description' => $period->getDescription(),
            );
            array_push($data, $infosPeriod);
        }
            
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data));
    }
    else {
        $response = addHeaders($response, $request->getHeader('Origin')); 
        $data = array('ERROR' => "Failed to get periods");
        $response->getBody()->write(json_encode($data));
        $response = $response->withStatus(401);
    }

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
    "ignore" => ["/api/login/", "/api/register/", "/api/products/", "/api/categories/", "/api/countries/", "/api/periods/"],
    "error" => function($response, $arguments){
        $data = array('ERROR' => 'Invalid JWT');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->add(new Tuupola\Middleware\JwtAuthentication($options));

// Run app
$app->run(); 
 
?>