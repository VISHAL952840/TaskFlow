// import jwt from "jsonwebtoken";
// import User from "../model/user.model.js";

// const protect = async(req, res, next) => {

//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({
//                 message: "Not Authorized, No Token",
//             });
//         }

//         // Extract token
//         const token = authHeader.split(" ")[1];
//         console.log(process.env.JWT_SECRET_KEY);

//         // Verify JWT
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//         // Find user
//         const user = await User.findById(decoded.id).select("-password");

//         if (!user) {
//             return res.status(401).json({
//                 message: "Invalid Token",
//             });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             message: "Not Authorized Token Failed",
//             error: error.message,
//         });
//     }
// };

// export default protect;
// // import jwt from "jsonwebtoken";
// // import User from "../model/user.model.js";

// // const protect = async(req, res, next) => {
// //     try {
// //         console.log("========== AUTH DEBUG ==========");
// //         console.log("Headers:", req.headers);
// //         console.log("Authorization:", req.headers.authorization);

// //         const authHeader = req.headers.authorization;

// //         if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //             return res.status(401).json({
// //                 message: "Not Authorized, No Token"
// //             });
// //         }

// //         // const token = authHeader.split(" ")[1];
// //         const token = authHeader.replace("Bearer ", "").trim();
// //         console.log("Token:", token);

// //         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
// //         console.log("Decoded:", decoded);

// //         const user = await User.findById(decoded.id).select("-password");

// //         if (!user) {
// //             return res.status(401).json({
// //                 message: "User not found"
// //             });
// //         }

// //         req.user = user;
// //         next();
// //     } catch (err) {
// //         console.log(err);

// //         res.status(401).json({
// //             message: "Not Authorized Token Failed",
// //             error: err.message
// //         });
// //     }
// // };

// // export default protect;
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protect = async(req, res, next) => {
    try {
        console.log("========== AUTH DEBUG ==========");
        console.log("Headers:", req.headers);

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not Authorized, No Token",
            });
        }

        const token = authHeader.replace("Bearer ", "").trim();

        console.log("TOKEN =", token);
        console.log("SECRET =", process.env.JWT_SECRET_KEY);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        console.log("DECODED =", decoded);

        const user = await User.findById(decoded.id).select("-password");
        console.log("USER =", user);

        if (!user) {
            return res.status(401).json({
                message: "Invalid Token - User Not Found",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("AUTH ERROR =", error);

        return res.status(401).json({
            message: "Not Authorized Token Failed",
            error: error.message,
        });
    }
};

export default protect;