// fs path是遵循cjs规范写的
var fs = require("fs");
var path = require("path");
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Car } from "./entity/Car";
import api from "./api/index";

AppDataSource.initialize()
  .then(async () => {
    console.log("create express app");
    const app = express();
    app.use(express.json({ limit: "2100000kb" }));
    app.use(bodyParser.json());

    // TODO
    //需要token
    app.use("/api", api);
    // 白名单
    // app.use("/", api);

    await AppDataSource.manager.create(User); //创建用户表格

    await AppDataSource.manager.save(
      AppDataSource.manager.create(Car, {
        villageName: "香缇美景",
        parkimg: "http://rbleiojei.hn-bkt.clouddn.com/%E6%B1%A4%E8%87%A3.png",
        parkingName: "二号停车位",
        price: "456",
        starTime: "2022/5/14 09:00",
        endTime: "2023/5/14 09:00",
        address: "湖北湖北湖北湖北湖北湖北",
      })
    );

    // app.on("request", function (req, res) {
    //   //都会触发
    //   console.log("111111111111111111111111111111");
    //   if (req.url === "/index") {
    //     // 通过响应头来实现服务端重定向
    //     res.writeHead(302, {
    //       Location: "http://127.0.0.1:3000/login",
    //     });

    //     res.end();
    //   } else if (req.url === "/login") {
    //     fs.readFile(path.join(__dirname, "login.html"), function (err, data) {
    //       if (err) {
    //         throw err;
    //       }
    //       res.end(data);
    //     });
    //   }
    // });

    // register express routes from defined application routes
    // Routes.forEach((route) => {
    //   (app as any)[route.method](
    //     route.route,
    //     (req: Request, res: Response, next: Function) => {
    //       const result = new (route.controller as any)()[route.action](
    //         req,
    //         res,
    //         next
    //       );
    //       if (result instanceof Promise) {
    //         result.then((result) =>
    //           result !== null && result !== undefined
    //             ? res.send(result)
    //             : undefined
    //         );
    //       } else if (result !== null && result !== undefined) {
    //         res.json(result);
    //       }
    //     }
    //   );
    // });

    app.listen(3000);
    console.log(
      "Express server has started on port 3000. Open http://localhost:3000 to see results"
    );
  })
  .catch((error) => console.log(error));
