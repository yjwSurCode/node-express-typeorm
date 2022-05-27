import db from "../config/db";

//seckill
// import  moment  from "moment";
// const moment = require("moment");
// import redis from "redis";

const gradeOne = (req, res, next) => {
  console.log(1);
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
};

const select = (req, res, next) => {
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
};

const paySuccess = (req, res, next) => {
  //三个参数有什么方法和属性

  console.log("1232131231");
  // let id = req.query.id;
  // res.cookie("rememberme", "true", {
  //   signed: true,
  //   maxAge: 900000,
  //   httpOnly: true,
  // });

  // db.query(
  //   `insert into USER(firstName,lastName) values('123123213','5555')`, //[1], // `insert into person (name,sex) values ('${req.body.name}','${req.body.sex}')` // `UPDATE orders SET orderSataus=? WHERE orderId='${id}'`,
  //   function (err, rows, fields) {
  //     if (err) {
  //       res.json(err);
  //       throw err;
  //     }

  //     res.json("success");

  //     // sql语句注意点：
  //     var sql = `select * from person where name='${req.body.name}'`; //类型不要出错
  //     var sql = `insert into person (name,sex) values ('${req.body.name}','${req.body.sex}')`;
  //     // var sql = `select * from score order by degree` //limit 0,1      //首先得是int类型

  //     // db.query(
  //     //   `DELETE FROM orders WHERE orderSataus=? AND phone='${req.query.uers}'`,
  //     //   [0],
  //     //   function (err, rows, fields) {
  //     //     if (err) {
  //     //       throw err;
  //     //     }
  //     //     let data: any = {};
  //     //     data.status = true;
  //     //     data.result = rows;
  //     //     res.json(data);
  //     //   }
  //     // );
  //   }
  // );
};

// class Seckill {
//   public SECKILL_GOOD: any = "SECKILL_GOOD_";

// constructor(SECKILL_GOOD, LOCK_KEY = "lockby") {
//   (this as any).SECKILL_GOOD = SECKILL_GOOD;
//   (this as any).LOCK_KEY = LOCK_KEY;
// }

const seckill = (req, res, next) => {
  const goodId = req.params.good_id;
  // 判断此产品是否加入了抢购
  console.log("判断此产品是否加入了抢购", this, req, res, next);
  // const key = `${this.SECKILL_GOOD}${goodId}`;
  // const seckill = await redis.hgetall(key);

  // // 判单是否开始、结束
  // if (moment().isBefore(moment(seckill.start_time))) {
  //   // return ctx.throwException(30004, "该抢购活动还未开始！");
  // }
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
};

export default { gradeOne, paySuccess, select, seckill };
