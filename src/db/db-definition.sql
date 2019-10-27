CREATE TABLE meal (

  CONSTRAINT pk_meal PRIMARY KEY (meal_id),
  
  meal_id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
  description VARCHAR(200) NOT NULL UNIQUE
    CONSTRAINT ck_meal_description CHECK (description <> ''),
  serves SMALLINT NOT NULL
    CONSTRAINT ck_meal_serves CHECK (serves BETWEEN 1 AND 8),
  leftovers BOOLEAN NOT NULL,
  diet_type CHAR(10) NOT NULL
    CONSTRAINT ck_meal_diet_type CHECK (diet_type IN ('VEGAN', 'VEGETARIAN', 'OMNI')),
  recipe_book VARCHAR(500),
  image_url VARCHAR(1000)
);

CREATE TABLE unit (

  CONSTRAINT pk_unit PRIMARY KEY (unit_id),

  unit_id TEXT(5) NOT NULL
    CONSTRAINT ck_unit_unit_id 
	  CHECK (unit_id <> ''),
  description TEXT(200) NOT NULL UNIQUE
    CONSTRAINT ck_unit_description CHECK (description <> '')
  
 );

CREATE TABLE store_location (

  CONSTRAINT pk_store_location PRIMARY KEY (store_location_id),

  store_location_id CHAR(20) NOT NULL
    CONSTRAINT ck_store_location_store_location_id
	  CHECK (store_location_id <> '' 
			 AND TRIM(TRANSLATE(store_location_id, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 
			                                       '                                    ')) = ''),  
  description VARCHAR(200) NOT NULL UNIQUE
    CONSTRAINT ck_store_location_description CHECK (description <> ''), 	
  shop_order SMALLINT NOT NULL UNIQUE
    CONSTRAINT ck_shop_order CHECK (shop_order > 0)      

); 
 
CREATE TABLE ingredient (

  CONSTRAINT pk_ingredient PRIMARY KEY (ingredient_id),
   
  ingredient_id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
  description VARCHAR(200) NOT NULL
    CONSTRAINT ck_ingredient_description CHECK (description <> ''),
  default_unit CHAR(5) NOT NULL,
  store_location_id CHAR(20) NOT NULL,
  
  CONSTRAINT fk_ingredient_unit FOREIGN KEY (default_unit) REFERENCES unit(unit_id)
    ON DELETE RESTRICT
	ON UPDATE RESTRICT,
	
  CONSTRAINT fk_ingredient_store_location FOREIGN KEY (store_location_id) REFERENCES store_location(store_location_id)
    ON DELETE RESTRICT
	ON UPDATE RESTRICT	
  
 );  
  	
CREATE TABLE meal_ingredient (

  CONSTRAINT pk_meal_ingredient PRIMARY KEY (meal_id, ingredient_id),
  meal_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  quantity DECIMAL (8, 2) NOT NULL
    CONSTRAINT ck_meal_ingredient_quantity CHECK (quantity > 0),
  unit_id CHAR(5) NOT NULL,
  
  CONSTRAINT fk_meal_ingredient_meal FOREIGN KEY (meal_id) REFERENCES meal(meal_id)
    ON DELETE RESTRICT
	ON UPDATE RESTRICT,
	
  CONSTRAINT fk_meal_ingredient_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id)
    ON DELETE RESTRICT
	ON UPDATE RESTRICT,
	
  CONSTRAINT fk_meal_ingredient_unit FOREIGN KEY (unit_id) REFERENCES unit(unit_id)
    ON DELETE RESTRICT
	ON UPDATE RESTRICT

);	
	
CREATE TABLE meal_tag (

  CONSTRAINT pk_meal_tag PRIMARY KEY (meal_id, tag),
  
  meal_id INT NOT NULL,
  tag VARCHAR(20) NOT NULL
    CONSTRAINT ck_meal_tag_tag CHECK (tag <> '' 
			 AND TRIM(TRANSLATE(tag, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 
			                         '                                    ')) = ''),  

  CONSTRAINT fk_meal_tag_meal FOREIGN KEY (meal_id) REFERENCES meal(meal_id)
    ON DELETE RESTRICT
	ON UPDATE RESTRICT								
								
);

CREATE INDEX meal_tag_by_tag ON meal_tag(tag);	

CREATE TABLE shopping_list_item (

  CONSTRAINT pk_shopping_list PRIMARY KEY (item_id),
  
  item_id INT NOT NULL GENERATED ALWAYS AS IDENTITY,  
  description VARCHAR(200) NOT NULL
    CONSTRAINT ck_ingredient_description CHECK (description <> ''),
  quantity DECIMAL (8, 2) NOT NULL
    CONSTRAINT ck_meal_ingredient_quantity CHECK (quantity > 0),
  unit_id CHAR(5) NOT NULL DEFAULT '*',  
  list_order SMALLINT UNIQUE
    CONSTRAINT ck_list_order CHECK (list_order > 0),

  CONSTRAINT fk_shopping_list_item_unit FOREIGN KEY (unit_id) REFERENCES unit(unit_id)
    ON DELETE RESTRICT
	ON UPDATE RESTRICT  

);	
	
CREATE VIEW meal_ingredient_detail AS (

SELECT m.description AS meal_description, mi.quantity, mi.unit_id, i.description AS ingredient_description
FROM   meal AS m
       INNER JOIN meal_ingredient AS mi
               ON m.meal_id = mi.meal_id
       INNER JOIN ingredient AS i
               ON mi.ingredient_id = i.ingredient_id
ORDER  BY m.meal_id               
               
);  