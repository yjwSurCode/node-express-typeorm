var redis = require("redis");
var fs = require("fs");

var skill_config = {
  skill: {
    skillType: "SMOK", //秒杀类型
    quota_num: 10, //当前秒杀活动名额数量
  },
  connect: {
    port: 3306,
    host: "106.12.154.161",
  },
};

var client = redis.createClient(
  skill_config.connect.port,
  skill_config.connect.host
);
var Quota_all_num = skill_config.skill.quota_num; //10
var skill_type = skill_config.skill.skillType; //SMOK
var hshkey = "skill" + skill_type;

// var start_seckill_time = skill_config.skill.start_seckill_time;

// var end_seckill_time = skill_config.skill.end_seckill_time;

import db from "../config/db";
export class OrderController {
  async seckill(req, res, next) {
    const parma = req.body;
    function dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    }
    var promise = new Promise((resolve, reject) => {
      // 查询用户当天是否抢购成功
      var ifScill = new Promise((solve, ject) => {
        db.query(
          `select * FROM user where time='${dateFormat(
            "YYYY-mm-dd",
            new Date()
          )}'`,
          (err, rows, fields) => {
            if (err) {
              ject(err);
            }
            console.log(88888888, rows, rows.length);
            if (rows.length != 0) {
              res.json([
                { code: 200, msg: "今日已抢购，请明日再来", data: rows },
              ]);
              return;
            } else {
              solve(rows);
            }
          }
        );
      });

      ifScill.then(
        (rows) => {
          //2222222222222222222222222222222222222
          // TODO id=99 暂时固定
          db.query(`select * FROM car where id='99'`, (err, rows, fields) => {
            if (err) {
              console.log("ERR", err);
              res.json([{ code: 500, msg: err }]);
              reject(err);
            }
            //TODO  rows[0].goods      注意回滚
            console.log("333333333333333", rows[0].goods, rows[0].goods - 1); //TODO  更改用户数据失败要返回回滚
            if (rows[0].goods > 0) {
              const nums = rows[0].goods - 1;
              db.query(
                `update car set goods='${nums}' where id='99'`,
                (err, rows, fields) => {
                  if (err) {
                    console.log("ERR", err);
                    res.json([{ code: 500, msg: err }]);
                    reject(err);
                  }
                  console.log("4444444444444444", req.body.userId, rows);
                  resolve(req.body.userId);
                }
              );
            } else {
              res.json([{ code: 200, msg: "已抢光!", data: "" }]);
            }
          });
        },
        (error) => {
          if (error) throw error;
        }
      );
    });

    promise.then(
      (value) => {
        console.log("555555", value, dateFormat("YYYY-mm-dd", new Date()));
        if (value == "") {
          console.log("666666666666");
          return;
        }
        db.query(
          `update user set time='${dateFormat(
            "YYYY-mm-dd",
            new Date()
          )}',goods='1' where userId='${req.body.userId}'`,
          // `update user set goods=1 where userId='${req.body.userId}'`,
          (err, rows, fields) => {
            if (err) {
              console.log("ERR", err);
              res.json([{ code: 500, msg: err }]);
            }
            db.query(
              `insert into record (userId,time,status) values('${value}','${dateFormat(
                "YYYY-mm-dd",
                new Date()
              )}','抢购成功')`,
              (err, rows, fields) => {
                if (err) {
                  console.log("ERR", err);
                  res.json([{ code: 500, msg: err }]);
                }
              }
            );
            res.json([{ code: 200, msg: "抢购成功", data: value }]);
          }
        );
      },
      (error) => {
        if (error) throw error;
      }
    );
  }

  async seckillList(req, res, next) {
    console.log("req---------------seckillList");
  }

  async orderList(req, res, next) {
    console.log("req---------------orderList");
    var promise = new Promise((resolve, reject) => {
      db.query(`select * FROM car`, (err, rows, fields) => {
        if (err) {
          console.log("errerrerr", err);
          res.json([{ code: 500, msg: err }]);
          reject(err);
        }
        res.json({ code: 200, msg: "抢购列表", data: rows });
      });
    });
  }

  async recordList(req, res, next) {
    var promise = new Promise((resolve, reject) => {
      db.query(
        `select * FROM record where userId='${req.body.userId}'`,
        (err, rows, fields) => {
          if (err) {
            console.log("errerrerr", err);
            res.json([{ code: 500, msg: err }]);
            reject(err);
          }
          res.json({ code: 200, msg: "抢购记录列表", data: rows });
        }
      );
    });
  }

  // async seckill(req, res, next) {
  //   console.log("redisredisredisredis111");
  //   client
  //     .on("error", (err) =>
  //       console.log("------ Redis connection failed ------" + err)
  //     )
  //     .on("connect", () =>
  //       console.log("------ Redis connection succeed ------")
  //     );
  //   //hlen
  //   client.on(hshkey, function (err, data) {
  //     if (err) {
  //       return res.json({ msg: "connect redis fail", con: 0 });
  //     }
  //     var existing_uota_num = data;
  //     console.log("existing_uota_num", existing_uota_num);
  //     if (data >= Quota_all_num) {
  //       console.log("名额已抢完，敬请期待下一轮活动吧。");
  //       return res.json({ msg: "faill", con: 0 });
  //     } else {
  //       //计算剩余名额
  //       var surplus_quota_num = Quota_all_num - existing_uota_num;
  //       var user_id = req.body.uid;
  //       var rondom_num = parseInt((Math.random() * 100).toFixed(0));
  //       var action_uid = parseInt(user_id) + rondom_num;
  //       if (action_uid % 3 == 0) {
  //         //自定义用户抢夺成功规则。
  //         fs.appendFileSync(
  //           "D:/v3_log/cache_log/quota_log.txt",
  //           "成功抢到的用户id:" +
  //             user_id +
  //             ",加的随机数为:" +
  //             rondom_num +
  //             ",处理之后的用户id:" +
  //             action_uid +
  //             "\r\n"
  //         );
  //         client.HSET(
  //           hshkey,
  //           hshkey + "_" + user_id,
  //           JSON.stringify({ userid: user_id }),
  //           function (err, data) {
  //             if (err) {
  //               return res.json({ msg: "connect redis fail", con: 0 });
  //             }
  //             console.log(`抢夺成功，还剩下${surplus_quota_num - 1} 个名额.`);
  //             return res.json({ msg: "success", con: surplus_quota_num - 1 });
  //           }
  //         );
  //       } else {
  //         console.log("未抢到");
  //         fs.appendFileSync(
  //           "D:/v3_log/cache_log/quota_log.txt",
  //           "未抢到的用户id:" +
  //             user_id +
  //             ",加的随机数为:" +
  //             rondom_num +
  //             ",处理之后的用户id:" +
  //             action_uid +
  //             "\r\n"
  //         );
  //         return res.json({ msg: "很遗憾，您未抢到本次资格" });
  //       }
  //     }
  //   });
  // }

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
}
