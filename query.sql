BEGIN;
INSERT INTO categories (categories_name,categories_inc_exp,categories_color,categories_icons_id) 
  VALUES('Test','0','7','5');
  INSERT INTO transactions (transactions_id,transactions_amount,transactions_catid) 
  VALUES('0','123456789',LAST_INSERT_ID());
INSERT INTO main (main_id,main_date, main_comment,main_catid,main_transid)
  VALUES('0','29-01-2219', 'mislim da radi',LAST_INSERT_ID(),LAST_INSERT_ID());
COMMIT;