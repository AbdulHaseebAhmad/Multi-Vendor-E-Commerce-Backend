import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../utils/mongooseSchemas/userSignupSchema.mjs";
import { Shop } from "../utils/mongooseSchemas/ShopSchema.mjs";
passport.serializeUser((user,done)=>{
    console.log(`inside serializing user`);
    console.log(user)
    done(null, {email:user.email, type:user.email.includes('shop') ? 'shop' : 'user'})
})

passport.deserializeUser(async (Obj, done)=>{
    
    if(Obj.type === 'user'){
        console.log(`inside deserializing user`);
        console.log(`${Obj.email}`)   
        try{
            const findUser = await User.findOne({email:Obj.email});
            if(!findUser){ done(null,null); throw new Error("User Not Found");}
            else{done(null, findUser)}
        }
        catch (err){
            done(err,null)
        }
        return;

    }
    if (Obj.type === 'shop') {
        console.log(`inside deserializing shop`);
        console.log(`${Obj.email}`);
    
        try {
          const findshop = await Shop.findOne({ email:Obj.email });
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

})
export default passport.use(
    new Strategy({usernameField:'email'} , async (email,password,done) => {
        console.log(email);
        console.log(password);
        if(!email.includes('shop')){
            try {
                const findUser = await User.findOne({email});
                 if(!findUser){throw new Error("User Not Found")};
                 if(findUser.password !== password){throw new Error("Bad Credentials")}
                 done(null, findUser)
             } catch (err) {
                 done(err, null)
             }
        }
        else {
            try {
                const findUser = await Shop.findOne({email});
                 if(!findUser){throw new Error("User Not Found")};
                 if(findUser.password !== password){throw new Error("Bad Credentials")}
                 done(null, findUser)
             } catch (err) {
                 done(err, null)
             }
        }
    })
)

/**import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../utils/mongooseSchemas/userSignupSchema.mjs";

passport.serializeUser((user,done)=>{
    console.log(`inside serializing user`);
    console.log(user)
    done(null, user.email)
})

passport.deserializeUser(async (email, done)=>{
    
    if(!email.includes('shop')){
        console.log(`inside deserializing user`);
        console.log(`${email}`)   
        try{
            const findUser = await User.findOne({email});
            if(!findUser){ done(null,null); throw new Error("User Not Found");}
            else{done(null, findUser)}
        }
        catch (err){
            done(err,null)
        }
    }
    else {done(null,null)}

})
export default passport.use('local-users',
    new Strategy({usernameField:'email'} , async (email,password,done) => {
        console.log(email);
        console.log(password);
        try {
           const findUser = await User.findOne({email});
            if(!findUser){throw new Error("User Not Found")};
            if(findUser.password !== password){throw new Error("Bad Credentials")}
            done(null, findUser)
        } catch (err) {
            done(err, null)
        }
    })
) */