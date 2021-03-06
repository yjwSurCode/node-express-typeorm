import { Router } from "express";
import { UserController } from "../controller/UserController";
import { OrderController } from "../controller/OrderController";
var router = Router();

let User = new UserController();

router.post("/getUserInfo", User.getUserInfo);
router.post("/setUserInfo", User.setUserInfo);

export default router;
