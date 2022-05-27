import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

import db from "../config/db";

export class PayController {
  //   private userRepository = getRepository(User);

  //   async all(request: Request, response: Response, next: NextFunction) {
  //     return this.userRepository.find();
  //   }

  //   async remove(request: Request, response: Response, next: NextFunction) {
  //     let userToRemove = await this.userRepository.findOneBy({
  //       id: request.params.id,
  //     });
  //     await this.userRepository.remove(userToRemove);
  //   }

  async addCars(req, res, next) {
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

  async carList(req, res, next) {
    // console.log(req, res);
    var promise = new Promise((resolve, reject) => {
      db.query(`select * from car`, (err, rows, fields) => {
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
}
