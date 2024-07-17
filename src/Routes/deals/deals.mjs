import { Router, query, response } from "express";
import { Deal } from "../../utils/mongooseSchemas/superdeals.mjs";
import {
  matchedData,
  checkSchema,
  validationResult,
  body,
} from "express-validator";

const dealRouter = Router();

dealRouter.post("/api/deals/", async (request, response) => {
  if (request.isAuthenticated()) {
    const {
      query: { categoryname, dealname },
    } = request;

    const dealExist = await Deal.findOne({ category: categoryname });

    const imgs = {
      Women: {
        img: "https://i5.walmartimages.com/asr/a2474c37-b022-4776-9a2c-3172e98ceede.f670f36d692b76e84cd792ee8837ce25.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      },
      Electronics: {
        img: "https://www.shift4shop.com/2015/images/sell-online/electronics/selling-charge-up.jpg",
      },
      Men: {
        img: "https://i.pinimg.com/736x/4b/ea/c1/4beac1a2ceb6ff197cd14c57547d5356.jpg",
      },
      Beauty: {
        img: "https://r.lvmh-static.com/uploads/2018/03/regard-944x1270-1-944x1270.jpg",
      },
      Laungerie: {
        img: "https://hips.hearstapps.com/hmg-prod/images/all-lp-area02-cw1123-jlo-01-int-64ba6d4e3dfc2.jpg",
      },
      Kids: {img:"https://imageio.forbes.com/specials-images/imageserve/6176d978c7aaed7d34cc15c8/0x0.jpg?format=jpg&crop=1200,900,x80,y2,safe&height=900&width=1600&fit=bounds"},
      ["Sports & Outdoor"]: {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-9QWskmgg_W4CQRpxV9JEib2EJInmiiqcng&s",
      },
      ["Shoes and Bags"]: {
        img: "https://m.media-amazon.com/images/I/81il1icHCwL._AC_UY1000_.jpg",
      },
      ["Accesories  & Jewellery"]: {
        img: "https://img.fruugo.com/product/6/68/657505686_max.jpg",
      },
      Bicycles: {
        img: "https://d1ji822ivo7sve.cloudfront.net/parksidevictoria.com-1977027077/cms/cache/v2/64cbed2d404b9.png/1920x864/fit;c:0,216,1921,1080/80/9605fd4770f1cc1e8e7f0b668c3c10aa.jpg",
      },
    };
    if (!dealExist) {
      const deal = await Deal.create({
        category: categoryname,
        img: imgs[categoryname].img || "",
        dealname: dealname,
      });
      if (deal) {
        response.send({ msg: "Resource Created" });
      }
    } else {
      response.sendStatus(201);
    }
  } else {
    response.sendStatus(401);
  }
});

dealRouter.delete("/api/deals/deletecategory", async (request, response) => {
  console.log("Running fromd delete");
  if (request.isAuthenticated()) {
    const {
      query: { categoryname },
    } = request;

    const deal = await Deal.findOneAndDelete({
      category: categoryname,
    });
    response.send({ msg: deal });
  } else {
    response.sendStatus(401);
  }
});

dealRouter.get(
  "/api/deals/gettrendingcategories",
  async (request, response) => {
    if (request.isAuthenticated()) {
      const deals = await Deal.find({});
      response.send({ msg: deals });
    } else {
      response.sendStatus(401);
    }
  }
);
export default dealRouter;
