import jwt from "jsonwebtoken";

export const verifToken = (req, res, next) => {
  //get the jwt from the cookie and check if it exists
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ succes: false, message: "Unauthorized - no token provided" });
  try {
    //decode the token and vefied with the ur secret
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode)
      return res
        .status(401)
        .json({ succes: false, message: "Unauthorized - no token provided" });

    // add the id to the request
    req.userId = decode.id;

    //move to the next function
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ succes: false, message: "Server error" });
  }
};
