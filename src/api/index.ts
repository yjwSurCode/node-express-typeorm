import { Router } from "express";
import routes from "../route/index";
import apiroutes from "../route/api";

//白名单
var router = Router();
router.use(routes);

//需要验证
var apiRouter = Router();
apiRouter.use(apiroutes); //!!!

export { router, apiRouter };
