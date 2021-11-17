import { Request,Response } from "express";


/**
 * @route public/read-products
 * @request {offset=0,limit=30}
 * @response product_id,category_id,product_name,product_image,quantity,created_on,updated_on,status,price,delivery_price,product_desc,gender,country_id 
 */
 export const readProducts = async(request:Request,response:Response) => {
    
}