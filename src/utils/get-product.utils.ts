import { executeSql } from "../db/executeQuery";

export const getProduct = async (productId: number) => {
  const sql = `SELECT PRODUCT_ID as "objectID",
	(SELECT CATEGORY_NAME
		FROM BAZAAR_CATEGORIES
		WHERE CATEGORY_ID = BP.CATEGORY_ID) AS "category",
        PRODUCT_NAME,
        PRODUCT_IMAGE as "image",
        QUANTITY,
        STATUS,
        PRICE
        FROM PUBLIC.BAZAAR_PRODUCTS BP where status = 'active' and quantity > 0 and product_id = $1 limit 1;`;
  const { rows } = await executeSql(sql, [`${productId}`]);
  return rows[0];
};
