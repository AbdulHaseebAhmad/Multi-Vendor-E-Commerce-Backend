import { Router } from "express";
import {
  checkSchema,
  matchedData,
  validationResult,
  body,
} from "express-validator";
import userLoginValidationSchema from "../../utils/validationSchemas/userLoginValidationSchema.mjs";
import passport from "passport";
import "../../Strategies/user-strategy.mjs";
import { Shop } from "../../utils/mongooseSchemas/ShopSchema.mjs";
import { Product } from "../../utils/mongooseSchemas/productSchema.mjs";
import shopSignupValidationSchema from "../../utils/validationSchemas/shopSignupValidationSchema.mjs";
const shopRouter = Router();

shopRouter.post(
  "/api/shop/auth/login",
  checkSchema(userLoginValidationSchema),
  (request, response, next) => {
    console.log(request.body);

    if (request.user) {
      console.log(request.user, "Already Loggged In");
      response
        .status(401)
        .send({ msg: `${request.user.displayname} is Alredy logged in` });
    } else {
      next();
    }
  },
  (request, response, next) => {
    const routeValidationResult = validationResult(request);
    const routeValidatedData = matchedData(request);
    if (routeValidationResult.errors.length === 0) {
      next();
    } else {
      response.status(401).send(
        routeValidationResult.errors.map((error) => {
          return { msg: error.msg };
        })
      );
    }
  },
  passport.authenticate("local"),
  (request, response) => {
    console.log(request.session.passport);
    // This callback function is only called if authentication was successful

    response.status(200).send({ msg: `${request.user.shopname} is logged in` });
  }
);

shopRouter.post(
  "/api/shop/auth/signup",
  checkSchema(shopSignupValidationSchema),
  (request, response, next) => {
    console.log(request.body);

    if (request.user || request.isAuthenticated()) {
      response.status(401).send({ msg: "Already LoggedIn" });
    } else {
      next();
    }
  },
  async (request, response) => {
    const routeValidationResult = validationResult(request);
    const routeValidatedData = matchedData(request);
    if (routeValidationResult.errors.length === 0) {
      
      const newShop = new Shop(routeValidatedData);
      try {
        const savedShop = await newShop.save();
        response.status(201).send({ msg: "Shop Created" });
      } catch (err) {
        console.log(err);
        response.status(400).send({ msg: err.errors._message });
      }
    } else {
      console.log(routeValidationResult.errors);
      response.status(401).send(
        routeValidationResult.errors.map((error) => {
          return { msg: error.msg };
        })
      );
    }
  }
);

shopRouter.get("/api/shop/auth/status", (request, response) => {
  //console.log("This is from auth check status", request.session, request.user);
  const { user } = request;
  console.log(user);
  if (!user || !user.email.includes("@shop")) {
    console.log({ msg: "Shop Not Logged In" });
    return response.status(401).send({ msg: "Not Logged In" });
  }
  return response.status(200).send({
    msg: `${request.user.shopname}  Already Logged In Redirecting To Shop`,
    user: request.user,
  });
});

shopRouter.patch(
  "/api/shop/updateuser",
  body("id").notEmpty().withMessage("The user  id can not be empty"),
  body("fieldname").notEmpty().withMessage("The fieldname can not be empty"),
  body("fieldvalue").notEmpty().withMessage("The fieldvalue can not be empty"),
  async (request, response) => {
    const {
      body: { id, fieldname, fieldvalue },
    } = request;
    console.log(request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty() && !request.isAuthenticated()) {
      console.log(errors);
      response.status(400).send({ msg: errors.array() });
    } else {
      if (
        fieldname !== "password" &&
        fieldname !== "email" &&
        fieldname !== "phone"
      ) {
        const updateUser = await Shop.findOneAndUpdate(
          { _id: id }, // Filter criteria
          { $set: { [fieldname]: fieldvalue } } // Update operatio
        );
        response
          .status(200)
          .send({ msg: `${updateUser.id} has been succefully Updated` });
      }
    }
  }
);

shopRouter.patch(
  "/api/shop/updatesecurity",
  body("id").notEmpty().withMessage("The user  id can not be empty"),
  body("fieldname").notEmpty().withMessage("The fieldname can not be empty"),
  body("fieldvalue").notEmpty().withMessage("The fieldvalue can not be empty"),
  async (request, response) => {
    const {
      body: { id, fieldname, fieldvalue },
    } = request;
    console.log(request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty() && !request.isAuthenticated()) {
      console.log(errors);
      response.status(400).send({ msg: errors.array() });
    } else {
      if (fieldname === "password") {
        const confirmPass = request.body.confirmPassword;
        if (fieldvalue === confirmPass) {
          const updateUser = await Shop.findOneAndUpdate(
            { _id: id }, // Filter criteria
            { $set: { [fieldname]: fieldvalue } } // Update operatio
          );
          response
            .status(200)
            .send({ msg: `${updateUser.id} has been succefully Updated` });
        } else {
          response.status(401).send({ msg: "The Passwords Done Match" });
        }
      } else {
        const updateUser = await Shop.findOneAndUpdate(
          { _id: id }, // Filter criteria
          { $set: { [fieldname]: fieldvalue } } // Update operatio
        );
        response
          .status(200)
          .send({ msg: `${updateUser.id} has been succefully Updated` });
      }
    }
  }
);

export default shopRouter;
