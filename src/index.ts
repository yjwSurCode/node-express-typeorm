// fs path是遵循cjs规范写的
var fs = require("fs");
var path = require("path");
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Car } from "./entity/Car";
import { router, apiRouter } from "./api/index";

// const parseJwt = require("express-jwt");
var { expressjwt: jwt } = require("express-jwt");
const SECRET_KEY = "login2022"; // 与生成token的密钥要一致!

AppDataSource.initialize()
  .then(async () => {
    console.log("create express app");
    const app = express();
    // bodyParser 使用bodyParser 解析post请求传递过来的参数
    app.use(bodyParser.json());
    app.use(express.json({ limit: "2100000kb" }));

    // 跨域配置;
    app.use((req, res, next) => {
      res.append("Access-Control-Allow-Origin", "*");
      res.append("Access-Control-Allow-Origin-Type", "*");
      next();
    });

    // // 使用expressJWT 验证token是否过期
    // app.use(
    //   jwt({
    //     secret: SECRET_KEY, // 签名的密钥 或 PublicKey
    //     algorithms: ["HS256"], // 使用何种加密算法解析
    //   }).unless({
    //     path: ["/getUserInfo", "/setUserInfo"], // 指定路径不经过 Token 解析
    //   })
    // );

    // //处理没有UnauthorizedError
    // app.use(function (err, req, res, next) {
    //   console.log(res, "err11111111111111");
    //   if (err.name === "UnauthorizedError") {
    //     res.json([
    //       { code: 403, msg: "No token provided or token failure ", data: "" },
    //     ]);
    //     return;
    //   }
    //   next();
    // });

    // TODO
    // 白名单
    // app.use("/", router);
    //需要token
    app.use("/api", apiRouter);

    await AppDataSource.manager.create(User); //创建用户表格

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(Car, {
    //     villageName: "香缇美景",
    //     parkimg: "http://rbleiojei.hn-bkt.clouddn.com/%E6%B1%A4%E8%87%A3.png",
    //     parkingName: "二号停车位",
    //     price: "456",
    //     starTime: "2022/5/14 09:00",
    //     endTime: "2023/5/14 09:00",
    //     address: "湖北湖北湖北湖北湖北湖北",
    //   })
    // );

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

    app.listen(3000);
    console.log(
      "Express server has started on port 3000. Open http://localhost:3000 to see results"
    );
  })
  .catch((error) => console.log(error));
