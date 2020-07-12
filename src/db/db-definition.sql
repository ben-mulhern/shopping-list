CREATE SEQUENCE meal_seq;

CREATE TABLE meal (

  CONSTRAINT pk_meal PRIMARY KEY (meal_id),
  
  meal_id INT NOT NULL DEFAULT nextval('meal_seq')
    CONSTRAINT ck_meal_meal_id CHECK (meal_id > 0),
  description VARCHAR(200) NOT NULL UNIQUE
    CONSTRAINT ck_meal_description CHECK (description <> ''),
  serves SMALLINT NOT NULL
    CONSTRAINT ck_meal_serves CHECK (serves BETWEEN 1 AND 8),
  leftovers BOOLEAN NOT NULL,
  diet_type VARCHAR(10) NOT NULL DEFAULT 'OMNI'
    CONSTRAINT ck_meal_diet_type CHECK (diet_type IN ('VEGAN', 'VEGETARIAN', 'OMNI')),
  recipe_book VARCHAR(500)
    CONSTRAINT ck_meal_recipe_book CHECK (recipe_book <> ''),
  image_url VARCHAR(1000)
    CONSTRAINT ck_meal_image_url CHECK (image_url <> '')
);

CREATE TABLE unit (

  CONSTRAINT pk_unit PRIMARY KEY (unit_id),

  unit_id VARCHAR(5) NOT NULL
    CONSTRAINT ck_unit_unit_id 
	  CHECK (unit_id <> ''),
  description VARCHAR(200) NOT NULL UNIQUE
    CONSTRAINT ck_unit_description CHECK (description <> '')
  
 );

CREATE TABLE store_location (

  CONSTRAINT pk_store_location PRIMARY KEY (store_location_id),

  store_location_id VARCHAR(20) NOT NULL
    CONSTRAINT ck_store_location_store_location_id
	  CHECK (store_location_id <> '' 
			 AND TRIM(TRANSLATE(store_location_id, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 
			                                       '                                    ')) = ''),  
  description VARCHAR(200) NOT NULL UNIQUE
    CONSTRAINT ck_store_location_description CHECK (description <> ''), 	
  shop_order SMALLINT NOT NULL UNIQUE
    CONSTRAINT ck_shop_order CHECK (shop_order > 0)      

); 

CREATE SEQUENCE ingredient_seq;

CREATE TABLE ingredient (

  CONSTRAINT pk_ingredient PRIMARY KEY (ingredient_id),
   
  ingredient_id INT NOT NULL DEFAULT nextval('ingredient_seq')
    CONSTRAINT ck_ingredient_ingredient_id CHECK (ingredient_id > 0),
  description VARCHAR(200) NOT NULL
    CONSTRAINT ck_ingredient_description CHECK (description <> ''),
  store_location_id VARCHAR(20) NOT NULL,
	
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
  unit_id VARCHAR(5) NOT NULL,
  
  CONSTRAINT fk_meal_ingredient_meal FOREIGN KEY (meal_id) REFERENCES meal(meal_id)
    ON DELETE CASCADE
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
    ON DELETE CASCADE
	  ON UPDATE RESTRICT								
								
);

CREATE INDEX meal_tag_by_tag ON meal_tag(tag);	

CREATE SEQUENCE shopping_list_seq;

CREATE TABLE shopping_list_item (

  CONSTRAINT pk_shopping_list PRIMARY KEY (item_id),
  
  item_id INT NOT NULL DEFAULT nextval('shopping_list_seq')
    CONSTRAINT ck_shopping_list_item_item_id CHECK (item_id > 0),
  quantity DECIMAL (8, 2) NOT NULL
    CONSTRAINT ck_meal_ingredient_quantity CHECK (quantity > 0),
  unit_id VARCHAR(5) NOT NULL DEFAULT 'x',  
  ingredient_id INT NOT NULL,
  ticked_at TIMESTAMP,
  question_mark BOOLEAN NOT NULL DEFAULT false,

  CONSTRAINT fk_shopping_list_item_unit FOREIGN KEY (unit_id) REFERENCES unit(unit_id)
    ON DELETE RESTRICT
	  ON UPDATE RESTRICT, 

  CONSTRAINT fk_shopping_list_item_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id)
    ON DELETE RESTRICT
	  ON UPDATE RESTRICT     

);

-- Extension of meal_ingredient that records transient plan data
CREATE TABLE meal_ingredient_plan_item (

  CONSTRAINT pk_plan_ PRIMARY KEY (meal_id, ingredient_id),

    meal_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  question_mark BOOLEAN NOT NULL DEFAULT false,
  checked BOOLEAN NOT NULL DEFAULT true,

  CONSTRAINT fk_meal_ingredient_plan_item_meal_ingredient FOREIGN KEY (meal_id, ingredient_id) REFERENCES meal_ingredient(meal_id, ingredient_id)
    ON DELETE RESTRICT
	  ON UPDATE RESTRICT,

  CONSTRAINT ck_meal_ingredient_plan_item_question_mark_checked CHECK (checked OR NOT question_mark)     

);