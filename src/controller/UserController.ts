import { getRepository } from "typeorm";
// const axios = require('axios')
import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { GetUserInfoResult } from "./interface";

const chalk = require("chalk");
const https = require("https");
import db from "../config/db";

const jwt = require("jsonwebtoken");
const SECRET_KEY = "login2022";

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
    if (!req.body.jsCode) {
      res.json([{ code: 405, msg: "参数不正确" }]);
      return;
    }
    const APPID = "wx21850caa5b1a9a71";
    const SECRET = "bc4e43ff002e9a8d0cbcfb7488af9670";
    const JSCODE = req.body.jsCode;
    let getUserInfoResult: GetUserInfoResult = {};
    await axios
      .get(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`
      )
      .then((res) => {
        console.log(`状态码: ${res.status}`);
        console.log(res.data);
        getUserInfoResult = { data: res.data };
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("2222222222222222");
    var promise = new Promise((resolve, reject) => {
      if (!getUserInfoResult.data) {
        res.json([{ code: 500, msg: "接口错误" }]);
        return;
      }
      const parma = req.body;
      console.log("333333333333333333");
      res.json([{ code: 200, msg: "ok", data: getUserInfoResult.data }]);
      return;
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

  async setUserInfo(req, res, next) {
    var promise = new Promise((resolve, reject) => {
      const parma = req.body;
      db.query(
        `select * FROM user where userId='${parma.userInfo}' `,
        (err, rows, fields) => {
          if (err) {
            console.log("errerrerr", err);
            res.json([{ code: 500, msg: err }]);
            reject(err);
          }
          console.log("11111111111", err, rows, fields);
          if (rows.length == 0) {
            //注册登录
            db.query(
              `insert into user (userId,phone,userName) values('${parma.userInfo}','${parma.phone}','CODE')`,
              (err, rows, fields) => {
                if (err) {
                  console.log("errerrerr", err);
                  res.json([{ code: 500, msg: err }]);
                  reject(err);
                }
                resolve(parma.userInfo);
              }
            );
          } else {
            //直接登录
            const token = jwt.sign({ user: parma.userInfo }, SECRET_KEY, {
              expiresIn: "3h",
            });
            res.json([
              { code: 200, msg: "用户已存在", token, data: parma.userInfo },
            ]);
            return;
          }
        }
      );
    });

    promise.then(
      (value) => {
        // 校验密码....(此处省略), 如果校验成功, 生成jwt
        // 参数1: 生成到token中的信息
        // 参数2: 密钥
        // 参数3: token的有效时间: 60, "2 days", "10h", "7d"
        const token = jwt.sign({ user: value }, SECRET_KEY, {
          expiresIn: "3h",
        });
        console.log("🚀 → token", token);
        res.json([{ code: 200, msg: "success", token, data: value }]);
      },
      (error) => {
        if (error) throw error;
      }
    );
  }
}
