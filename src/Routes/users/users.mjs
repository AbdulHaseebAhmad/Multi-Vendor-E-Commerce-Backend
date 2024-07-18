import { Router } from "express";
import {
  checkSchema,
  matchedData,
  validationResult,
  body,
} from "express-validator";
import userLoginValidationSchema from "../../utils/validationSchemas/userLoginValidationSchema.mjs";
import userSignupValidationSchema from "../../utils/validationSchemas/userSignupValidationSchema.mjs";
import passport from "passport";
import { User } from "../../utils/mongooseSchemas/userSignupSchema.mjs";
import "../../Strategies/user-strategy.mjs";

const userRouter = Router();

userRouter.post(
  "/api/users/auth/login",
  checkSchema(userLoginValidationSchema),
  (request, response, next) => {
    if (request.user) {
      //console.log(request.user, "Already Loggged In");
      response
        .status(401)
        .send({ msg: `${request.user._id} is Alredy logged in` });
    } else {
      next();
    }
  },
  (request, response, next) => {
    const routeValidationResult = validationResult(request);
    const routeValidatedData = matchedData(request);
    if (routeValidationResult.errors.length === 0 && !request.body.email.includes('@shop')) {
      next();
    } else {
      response.status(401).send(
        routeValidationResult.errors.map((error) => {
          return { msg: error.msg };
        })
      );
    }
  },
  passport.authenticate('local'),
  (request, response) => {
    //console.log(request)
    // This callback function is only called if authentication was successful
    response
      .status(200)
      .send({ msg: `${request.user.displayname} is logged in` });
  }
);

userRouter.post(
  "/api/users/auth/signup",
  checkSchema(userSignupValidationSchema),
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
      const newUser = new User(routeValidatedData);
      try {
        const savedUser = await newUser.save();
        response.status(201).send({ msg: "User Created" });
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

userRouter.get("/api/users/auth/status", (request, response) => {
  //console.log("This is from auth check status", request.session, request.user);
  res.header("Access-Control-Allow-Origin", "https://multivendorecommerce-00.web.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  const { user } = request;
  if (!user || user.email.includes('@shop'))  {
    return response.status(401).send({ msg: "Not Logged In" });
  }
  return response.status(200).send({
    msg: `${request.user.displayname}  Already Logged In Redirecting To Home Page`,
    user: request.user,
  });
});

userRouter.patch(
  "/api/users/updateuser",
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
        const updateUser = await User.findOneAndUpdate(
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

userRouter.patch(
  "/api/users/updatesecurity",
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
          const updateUser = await User.findOneAndUpdate(
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
        const updateUser = await User.findOneAndUpdate(
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

userRouter.patch(
  "/api/users/updatepaymentmethod",
  async (request, response) => {
    console.log("This is From UpdatePayment", request.session.passport.user);
    const loggedInUser = request.session.passport.user;
    const {
      body: { email, editingCard, id },
    } = request;
    const methodToUpdate = `paymentoptions.${editingCard.key}`;

    console.log(request.body);
    const updatepayment = await User.findOneAndUpdate(
      { _id: id },
      { $set: { [methodToUpdate]: editingCard } }
    );
    console.log(updatepayment);
    response.sendStatus(200);
  }
);

userRouter.post("/api/users/addnewpayment", async (request, response) => {
  const {
    body: { id, type, details },
    session: { passport: user },
  } = request;
  console.log(user.user);
  
  const key = details.Main ? "Main" : "Secondary";
  const methodToUpdate = `paymentoptions.${key}`;
  delete details[key];
  if (request.isAuthenticated()) {
    const addPayment = await User.findOneAndUpdate(
      { email: user.user },
      { $set: { [methodToUpdate]: { id, type, details } } }
    );
    console.log(addPayment);
    response.status(200).send({ msg: "Payment Method Added" });
  }
});

userRouter.post("/api/users/auth/logout", (request, response) => {
  // console.log(request.user)
  if (!request.user) {
    response.status(401).send({ msgg: "You are already logout" });
  } else {
    request.logout((err) => {
      if (err) response.sendStatus(400);
      response.sendStatus(200);
    });
  }
});

export default userRouter;
