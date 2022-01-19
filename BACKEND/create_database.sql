DROP TABLE IF EXISTS order_history;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS period;
DROP TABLE IF EXISTS country;
DROP TABLE IF EXISTS client;

CREATE TABLE client (
    id_client SERIAL PRIMARY KEY,
    firstname varchar(50),
    lastname varchar(50),
    civility varchar(25),
    address varchar(50),
    city varchar(50),
    zip varchar(5),
    country varchar(50),
    email varchar(100),
    phone varchar(10),
    login varchar(50),
    password varchar(255)
);

CREATE TABLE category (
    id_category SERIAL PRIMARY KEY,
    name varchar(100)
);

CREATE TABLE period (
    id_period SERIAL PRIMARY KEY,
    name varchar(100),
    description varchar(100)
);

CREATE TABLE country (
    id_country SERIAL PRIMARY KEY,
    name varchar(100)
);

CREATE TABLE product (
    id_product SERIAL PRIMARY KEY,
    name varchar(255),
    description varchar(1000),
    image varchar(500),
    price numeric,
    fk_category INT,
    fk_period INT,
    fk_country INT,

    FOREIGN KEY (fk_category) REFERENCES category(id_category),
    FOREIGN KEY (fk_period) REFERENCES period(id_period),
    FOREIGN KEY (fk_country) REFERENCES country(id_country)
); -- image ?

CREATE TABLE order_history (
    id_Order SERIAL PRIMARY KEY,
    fk_client INT,
    fk_product INT,
    date DATE,

    FOREIGN KEY (fk_client) REFERENCES client(id_client),
    FOREIGN KEY (fk_product) REFERENCES product(id_product)
);

-- Insert Data

INSERT INTO category (name) VALUES
    ('Tenue'),
    ('Vehicule'),
    ('Arme'),
    ('Pièces detachees armes'),
    ('Pièces detachees vehicule'),
    ('Accessoires'),
    ('Artillerie'),
    ('Divers');

INSERT INTO period (name, description) VALUES
    ('WWI','1914-1918'),
    ('WWII', '1939-1945'),
    ('Guerre froide','1946-1989'),
    ('Actuelle','1990-Aujourd''hui');

INSERT INTO country (name) VALUES
    ('France'),
    ('Etats-Unis'),
    ('Allemagne'),
    ('Commonwealth'),
    ('Russie / URSS');

INSERT INTO product (name, description, image, price, fk_category, fk_period, fk_country) VALUES
    ('Uniforme d''officier français WWII', 'Description du produit en cours de redaction','assets/img/uniforme_officier_francais_ww2.jpg', 399.99, 1, 2, 1),
    ('Brassard FFI', 'Description du produit en cours de redaction','assets/img/bassard_ffi.jpg', 299.99, 1, 2, 1),
    ('Binoculaire Huet Paris 8x40 H/6400', 'Description du produit en cours de redaction','assets/img/binoculaire_huet_paris.jpg', 139.99, 8, 2, 1),
    ('M4 Sherman', 'Description du produit en cours de redaction','assets/img/m4_sherman.jpg', 330000.00, 2, 2, 2),
    ('Canon anti char US M3', 'Description du produit en cours de redaction','assets/img/canon_antichar_us_m3.jpg', 25000.00, 7, 2, 2),
    ('Jeep willys MB', 'Description du produit en cours de redaction','assets/img/jeep_willys_mb.jpg', 8000.00, 2, 2, 2),
    ('GMC CCKW 353', 'Description du produit en cours de redaction','assets/img/gmc_cckw_353.jpg', 8500.00, 2, 2, 2),
    ('VW Kübelwagen', 'Description du produit en cours de redaction','assets/img/vw_kubelwagen.jpg', 43000.00, 2, 2, 3),
    ('Sidecar Oural M72', 'Description du produit en cours de redaction','assets/img/sidecar_oural_m72.jpg', 13000.00, 2, 2, 2),
    ('Chenilles M4 Sherman', 'Description du produit en cours de redaction','assets/img/chenilles_m4_sherman.jpg', 13000.00, 5, 2, 2),
    ('M55 Quad gun', 'Description du produit en cours de redaction','assets/img/m55_quad_gun.jpg', 18000.00, 7, 2, 2),
    ('Cartouchière française WWI', 'Description du produit en cours de redaction','assets/img/cartouchiere_francaise_ww1.jpg', 30.00, 8, 1, 1),
    ('1959 Saracen ARMORED PERSONNEL CARRIER', 'Description du produit en cours de redaction','assets/img/saracen_armored_carrier.jpg', 25000.00, 2, 3, 4),
    ('Chenillette T 16 windsor Ford Canada', 'Description du produit en cours de redaction','assets/img/chenillete_t16_canada.jpg', 46000.00, 2, 2, 4),
    ('AML 90 Panhard 1974', 'Description du produit en cours de redaction','assets/img/aml90.jpg', 32000.00, 2, 3, 1),
    ('BRDM 2', 'Description du produit en cours de redaction','assets/img/brdm2.jpg', 12200.00, 2, 3, 5),
    ('PLDDVK 53', 'Description du produit en cours de redaction','assets/img/plddvk53.jpg', 13500.00, 2, 3, 5);   
   