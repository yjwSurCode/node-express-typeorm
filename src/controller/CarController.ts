import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

import db from "../config/db";

export class CarController {
  async addParking(req, res, next) {
    console.log(
      "88888888",
      req.params,
      req.query,
      req.body,
      next,
      "99999999999",
      `${req.body.value.address}` === "",
      `${req.body.value.address}` === " "
    );
    const param = req.body.value;
    console.log(param.address, "param.address");
    const sql = `insert into car (parkingName,villageName,address,price,userId) values('${param.parkingName}',${param.villageName},'${param.address}','66',${param.userId})`;
    // const sql = `insert into car (parkingName,villageName,address,price,userId) values(${param.parkingName},${param.villageName},'广东省广州市海珠区新港中路397号','66',${param.userId})`;
    var promise = new Promise((resolve, reject) => {
      db.query(sql, (err, rows, fields) => {
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

  async carList(req, res, next) {
    console.log("88888888", req.params, req.query, next, req.body);

    var promise = new Promise((resolve, reject) => {
      db.query(
        `select * from car where userId=${req.query.userId}`,
        (err, rows, fields) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        }
      );
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
}
