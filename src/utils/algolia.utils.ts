import algoliasearch from "algoliasearch";
import {
  algoliaAdminKey,
  algoliaAppId,
  algoliaIndex,
} from "../environments/environments";
import { getProduct } from "./get-product.utils";

const client = algoliasearch(`${algoliaAppId}`, `${algoliaAdminKey}`);
const index = client.initIndex(`${algoliaIndex}`);

export const updateAlgolia = async (productId: number) => {
  const product = await getProduct(productId);
  try {
    if (product.status === "active") {
      index.saveObject(product);
      console.log("Successfully saved product in algolia");
    } else {
      index.deleteObject(product.objectID);
      console.log('Successfully deleted product from algolia');
    }
  } catch (error: any) {
    console.log("--error while updating product in algolia");
    console.log(error.stack);
  }
};
