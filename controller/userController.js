import userSchema from "../schema/userSchema.js";
import { OAuth2Client } from "google-auth-library";
import { createError } from "../util/error.js";
import { createToken } from "../middleware/tokenMiddleware.js";
import bookSchema from "../schema/bookSchema.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);

//personal list
export const addWishlist = async (req, res, next) => {
  try {
    let id = req.params.id;
    const { title } = req.body;
    await userSchema.findByIdAndUpdate(id, { $push: { wishlist: title } });
    res.status(201).json("success");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//getting user deteils
export const getUserDeteils = async (req, res, next) => {
  try {
    let id = req.params.id;
    const deteils = await userSchema.findById(id);
    const { name, books } = deteils;
    res.status(201).json({ name, books });
  } catch (error) {
    next(error);
  }
};

//google login
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token, "token");
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENTID,
    });
    console.log(ticket, "ticket");
    if (!ticket) return next(createError(401, "Invalid token"));
    const { name, email, id } = ticket.getPayload();
    const jsontoken = await createToken(email, id);
    await userSchema.create({ name, email });
    res
      .cookie("access_token", jsontoken, {
        httpOnly: true,
      })
      .status(201)
      .json("success");
  } catch (error) {
    next(error);
  }
};

//replacing books OR what ever
export const replacingData = async(req,res,next) =>{
   try {
      console.log(req.body);
      const {oldId,title} = req.body
      const id = req.params
     const newData = await bookSchema.findOneAndUpdate(oldId,{$set:{title}})
      res.status(201).json(newData)
   } catch (error) {
      next(error)
   }
}