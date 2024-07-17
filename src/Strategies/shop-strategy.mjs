import passport from 'passport';
import { Strategy } from 'passport-local';
import { Shop } from '../utils/mongooseSchemas/ShopSchema.mjs';

passport.serializeUser((user, done) => {
  console.log(`inside serializing shop`);
  console.log(user);
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  console.log(`Outside deserializing shop`);

  if (email.includes('shop')) {
    console.log(`inside deserializing shop`);
    console.log(`${email}`);

    try {
      const findshop = await Shop.findOne({ email });
      if (!findshop) { 
        done(null, null); 
        throw new Error("Shop Not Found inside deserializing shop");
      } else {
        done(null, findshop);
      }
    } catch (err) {
      done(err, null);
    }
  } else {
    done(null, null);
  }
});

passport.use('local-shop',
  new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    console.log(email);
    console.log(password);
    try {
      const findshop = await Shop.findOne({ email });
      if (!findshop) {
        throw new Error("Shop Not Found");
      }
      if (findshop.password !== password) {
        throw new Error("Bad Credentials");
      }
      done(null, findshop);
    } catch (err) {
      done(err, null);
    }
  })
);

export default passport;
