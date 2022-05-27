import { Router } from "express";
import { CarController } from "../controller/CarController";
import { UserController } from "../controller/UserController";
import query from "./query";
var router = Router();

let Car = new CarController();
let User = new UserController();

router.get("/list", Car.carList);
router.post("/addParking", Car.addParking);
router.post("/getUserInfo", User.getUserInfo);

//seckill
// router.post("/login", query.login);
// router.post("/register", query.register);
// let _seckill = new query.Seckill("Jack");

export default router;
