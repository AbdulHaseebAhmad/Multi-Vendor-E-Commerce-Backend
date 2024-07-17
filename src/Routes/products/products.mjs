import { Router, query, response } from "express";
import { Product } from "../../utils/mongooseSchemas/productSchema.mjs";
import {
  matchedData,
  checkSchema,
  validationResult,
  body,
} from "express-validator";
import productCategorySchema from "../../utils/validationSchemas/productCategorySchema.mjs";

const productRouter = Router();

productRouter.get("/api/products/allproducts", async (request, response) => {
  const { user } = request;
  if (user) {
    try {
      const products = await Product.find();
      response.send(products);
    } catch (err) {
      response.status(400).send({ msg: err });
    }
  } else {
    response.status(401).send({
      msg: "User is not Logged in need Authentication to fetch Products",
    });
  }
});

productRouter.get(
  "/api/products/categoryproducts",
  checkSchema(productCategorySchema),
  async (request, response) => {
    const { query } = request;
    const errors = validationResult(request);
    const queries = matchedData(request);
    const { filter, value } = queries;
    const productSearchProp = {};
    productSearchProp[filter] = value;

    if (errors.errors.length === 0 && request.isAuthenticated()) {
      const products = await Product.find(productSearchProp);
      //console.log(products)
      response.status(200).send(products);
    } else {
      if (errors.errors.length !== 0) {
        response.status(400).send(
          errors.errors.map((error) => {
            return { msg: error.msg };
          })
        );
      }
      if (!request.isAuthenticated()) {
        response.status(401).send({ msg: "The User is Not Logged In" });
      }
    }
  }
);

productRouter.get("/api/shop/getproducts/", async (request, response) => {
  const {
    query: { shopid },
  } = request;
  console.log(shopid);
  const findProducts = await Product.find({ seller: `${shopid}` });
  // const {_id,name,img,price} = findProducts;
  if (findProducts && findProducts.length > 0) {
    const foundproducts = findProducts.map(({ _id, name, img, price }) => {
      return { _id, name, img, price };
    });
    response.status(200).send({ products: foundproducts });
  } else {
    response.status(404).send({ msg: "No Products Found" });
  }
});

productRouter.post("/api/shop/addproduct", async (request, response) => {
  if (request.isAuthenticated()) {
    console.log(request.body);
    const product = request.body;
    const addproduct = await Product.create(product);
    if (addproduct.status === 200) {
      response.status(201).send({ msg: "Product Added" });
    }
  }
});

productRouter.put("/api/shop/editproduct", async (request, response) => {
  if (request.isAuthenticated()) {
    console.log(`This is From Put: ${request.body._id}`);
    const product = request.body;
     const addproduct = await Product.findOneAndReplace({ _id: product._id },product);
    if (addproduct._id == product._id) {
      response.status(201).send({ msg: "Product Edited" });
    }
  }
});

productRouter.delete("/api/shop/deleteproduct", async (request, response) => {
  if (request.isAuthenticated()) {
    console.log(request.query.productid);
    const product = request.query.productid;
    const deleteproduct = await Product.findByIdAndDelete(product);
    console.log(deleteproduct._id, "This was deleted");
    if (deleteproduct._id == request.query.productid) {
      response
        .status(200)
        .send({
          msg: `The Product With ${request.query.productid} was Deleted`,
        });
    }
  }
});

productRouter.get("/api/products/searchproducts/:productId/", async (request, response) => {
  const {
    params: { productId },
    query : {sellerId}
  } = request;

  if (request.isAuthenticated()) {
    const product = await Product.findOne({id:productId,seller:sellerId});
    response.status(200).send({msg:product});
  } else {
    response.status(401).send({ msg: "The Product is not Found" });
  }
});


productRouter.get("/api/products/:productId", async (request, response) => {
  const {
    params: { productId },
  } = request;

  if (request.isAuthenticated()) {
    const product = await Product.findById(productId);
    response.status(200).send(product);
  } else {
    response.status(401).send({ msg: "The User is not logged in" });
  }
});




/**productRouter.get(
  "/api/users/uniqueUser",
  checkSchema(createQueryValidationSchema),
  (request, response) => {
    const result = validationResult(request); // this is for if we use query('filter') for checking query parameters like a middleware function;
    console.log(result);
    const {
      query: { filter, value },
    } = request;
    console.log(filter, value);
    if (!filter && !value) {
      return response.send(mockUsers);
    } else if (filter && value) {
      const users = mockUsers.filter((user) => {
        return user[filter] === value;
      });
      if (users.length < 1) {
        return response
          .status(404)
          .send({ msg: "The search didnt bring about any result" });
      }
      if (users.length > 0) {
        return response.send(users);
      }
    } else if (!filter || !value) {
      return response
        .status(404)
        .send({ msg: "The Query Parameters Are Incomplete" });
    }
  }
);*/

/**
 * productRouter.get("/api/products/productcategory",async (request,response)=>{
  const {query:categoryname} = request;
  const category = categoryname.categoryname;
  if(request.isAuthenticated()){
    const products = await Product.find({
      categories:category
    })
    response.status(200).send({msg:products})
  }
})
 */
export default productRouter;
