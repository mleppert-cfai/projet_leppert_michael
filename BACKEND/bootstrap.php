<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-54-247-96-153.eu-west-1.compute.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'drqyphzyuqoiou',
'password' => 'a04cf8c3af37b505aff0cad855b35218672dd149685e623b7d9ad620f4584149',
'dbname' => 'd8nrl9rgck97vt',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);