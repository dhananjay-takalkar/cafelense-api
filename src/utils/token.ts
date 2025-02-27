import jwt from "jsonwebtoken";

const generateToken = (data: any, expiresIn: any = "1h") => {
  try {
    return jwt.sign(data, (process.env.JWT_SECRET as jwt.Secret) || "test", {
      expiresIn,
    });
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

const verifyToken = (token: any) => {
  try {
    return jwt.verify(token, (process.env.JWT_SECRET as jwt.Secret) || "test");
  } catch (error: any) {
    return null;
  }
};

export { generateToken, verifyToken };
