import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // ✅ Use 'token' header instead of 'Authorization'
    const token = req.headers.token;

    if (!token || typeof token !== "string") {
      return res.json({ success: false, message: "Unauthorized Access - Missing Token" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token matches admin credentials
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Unauthorized Access - Invalid Admin Token" });
    }

    next(); // token valid, continue
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth;
