import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req,res, next,() => {            
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

//after  res, next was there due to which it was  reirecting the next() of the user route ka  res.send(" you are logged in and can delete account")

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res,next, () => {
    if(req.user.isAdmin){
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

//same there was a next()  redirecting the user route ka  res.send(" hello user you are admin and can delete accounts")