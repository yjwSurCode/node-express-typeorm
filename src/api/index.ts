import { Router } from "express";
import routes from "../route/index";

var router = Router();
router.use(routes);

export default router;
