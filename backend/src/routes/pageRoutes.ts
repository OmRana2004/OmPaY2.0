import { RequestHandler, Router } from "express";
import signup from "../controllers/authControllers/signup";
import signin from "../controllers/authControllers/signin";
import logout from "../controllers/authControllers/logout";
import authMiddleware from "../middlewares/authMiddleware";


import me from "../controllers/authControllers/me"


const router = Router();
const AuthMiddleware = authMiddleware as unknown as RequestHandler;

// auth
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);



router.get("/me", AuthMiddleware, me);

export default router;
