// import jwt from "jsonwebtoken";

// const generateToken = (userId) => {
//     return jwt.sign({ id: userId },
//         process.env.JWT_SECRET_KEY, {
//             expiresIn: "7d"
//         }
//     );
// };

// export default generateToken;
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

export default generateToken;