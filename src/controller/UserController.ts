import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

const chalk = require("chalk");
const https = require("https");
import db from "../config/db";

export class UserController {
  async gradeOne(req, res, next) {
    var promise = new Promise((resolve, reject) => {
      db.query(`select * from user`, (err, rows, fields) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
    promise.then(
      (rows) => {
        res.json(rows);
      },
      (error) => {
        if (error) throw error;
      }
    );
  }

  async getUserInfo(req, res, next) {
    console.log("88888888", req.params, req.query, req.body, next);

    https
      .get("https://api.juejin.cn/tag_api/v1/query_category_briefs", (res) => {
        let list = [];
        res.on("data", (chunk) => {
          list.push(chunk);
        });
        res.on("end", () => {
          console.log(list, " list");
        });
      })
      .on("error", (err) => {
        console.log("Error: ", err.message);
      });

    var promise = new Promise((resolve, reject) => {
      // INSERT [INTO] 表名 [(字段列表)] VALUES (值列表)[, (值列表), ...]
      // INSERT [INTO] 表名 SET 字段名=值
      // insert into 表名 (sno,sname,enterdate) values(10,'李四','2021-1-1')
      const parma = req.body;
      if (!parma.userId) {
        res.json([{ code: 405, msg: "参数不正确" }]);
        return;
      }

      db.query(
        `insert into user (userId,phone) values(${parma.userId},'${parma.phone}')`,
        (err, rows, fields) => {
          if (err) {
            console.log("errerrerr", err);
            res.json([{ code: 500, msg: err }]);
            reject(err);
          }
          console.log("fields", err, rows, fields);
          resolve(rows);
        }
      );
    });

    promise.then(
      (rows) => {
        res.json([{ code: 200, msg: "success", data: rows }]);
      },
      (error) => {
        if (error) throw error;
      }
    );
  }
}
