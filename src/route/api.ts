import { Router } from "express";
import { UserController } from "../controller/UserController";
import { OrderController } from "../controller/OrderController";
var router = Router();

let Order = new OrderController();

router.post("/seckill", Order.seckill);
router.post("/seckillList", Order.seckillList);

export default router;
