import { Router,  response } from "express";
import { Product } from "../../utils/mongooseSchemas/productSchema.mjs";
import {
  matchedData,
  checkSchema,
  validationResult,
  body,query,
} from "express-validator";
import { Shop } from "../../utils/mongooseSchemas/ShopSchema.mjs";
import { Order } from "../../utils/mongooseSchemas/ordersSchema.mjs";

const ordersRouter = Router();

ordersRouter.post("/api/orders/placeorder", async (request,response)=>{
   const {body} = request;
   const placeOrder = await Order.create(body)
})

ordersRouter.get("/api/orders/getshoporders", query('shopid').notEmpty().withMessage("The Shop Id Can Not Be Empty"),async(request, response)=>{
  if(request.isAuthenticated()){
    const filter = `cartItems.seller`;
      const orders = await Order.find(
        {
          "cartItems": {
            $elemMatch: {
              "seller": request.query.shopid
            }
          }
        }
      )
      if(orders){
        response.status(200).send({msg:orders})
      }
  }
})

ordersRouter.get("/api/orders/getcustomerorders", query('customerid').notEmpty().withMessage("The Shop Id Can Not Be Empty"),async(request, response)=>{
  if(request.isAuthenticated()){
    const filter = `cartItems.seller`;
      const orders = await Order.find(
        {
          'customerid':request.query.customerid
        }
      )
      if(orders){
        response.status(200).send({msg:orders})
      }
  }
})

ordersRouter.get("/api/orders/orderdetails", query('orderid').notEmpty().withMessage("The Order Id Can Not Be Empty"),async(request, response)=>{
  if(request.isAuthenticated()){
    const id = request.query.orderid;
      const order = await Order.findById(id)
      if(order){
        response.status(200).send({msg:order})
      }else{response.status(404)}
  }
})

ordersRouter.patch("/api/orders/completeorder",async (request,response)=>{
  if(request.isAuthenticated()){
    const id = request.query.orderid;
    const order = await Order.findOneAndUpdate(
      {_id:id},
      {orderstatus:'completed'},
      { new: true,}
  )
  console.log(id,order)
  response.status(200).send({msg:'OrderCompleted'})

  }
  
})
export default ordersRouter;