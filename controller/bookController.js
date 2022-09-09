import bookSchema from "../schema/bookSchema.js";
import userSchema from "../schema/userSchema.js";
import { createError } from "../util/error.js";

//searching books
export const searchBooks = async (req, res, next) => {
  try {
    const title = req.params.id;
    const findBook = await bookSchema.findOne({ title });
    if (!findBook) return next(createError(401, "book not found"));
    res.status(200).json(findBook);
  } catch (error) {
    next(error);
  }
};

//creating books
export const createBook = async (req, res, next) => {
  try {
    const author = req.params.id;
    const { title } = req.body;
    const ifExist = await bookSchema.findOne({ title });
    if (ifExist) return next(createError(401, "title already taken"));
    const newBook = await bookSchema.create({ author, title });
    await userSchema.findByIdAndUpdate(author, {
      $push: { books: newBook._id },
    });
    res.status(201).json("success");
  } catch (error) {
    next(error);
  }
};
