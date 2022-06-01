var redis = require("redis");
var fs = require("fs");

// var skill_config = {
//   skill: {
//     skillType: "SMOK", //秒杀类型
//     quota_num: 10, //当前秒杀活动名额数量
//   },
//   connect: {
//     port: 3306,
//     host: "106.12.154.161",
//   },
// };

// var client = redis.createClient(
//   skill_config.connect.port,
//   skill_config.connect.host
// );
// var Quota_all_num = skill_config.skill.quota_num; //10
// var skill_type = skill_config.skill.skillType; //SMOK
// var hshkey = "skill" + skill_type;

// var start_seckill_time = skill_config.skill.start_seckill_time;

// var end_seckill_time = skill_config.skill.end_seckill_time;

import db from "../config/db";
export class OrderController {
  async seckill(req, res, next) {
    console.log("redisredisredisredis");

    res.json({ msg: "faill", con: 0 });
    // client.hlen(hshkey, function (err, data) {
    //   if (err) {
    //     return res.json({ msg: "connect redis fail", con: 0 });
    //   }
    //   var existing_uota_num = data;
    //   if (data >= Quota_all_num) {
    //     console.log("名额已抢完，敬请期待下一轮活动吧。");
    //     return res.json({ msg: "faill", con: 0 });
    //   } else {
    //     //计算剩余名额
    //     var surplus_quota_num = Quota_all_num - existing_uota_num;
    //     var user_id = req.body.uid;
    //     var rondom_num = parseInt((Math.random() * 100).toFixed(0));
    //     var action_uid = parseInt(user_id) + rondom_num;
    //     if (action_uid % 3 == 0) {
    //       //自定义用户抢夺成功规则。
    //       fs.appendFileSync(
    //         "D:/v3_log/cache_log/quota_log.txt",
    //         "成功抢到的用户id:" +
    //           user_id +
    //           ",加的随机数为:" +
    //           rondom_num +
    //           ",处理之后的用户id:" +
    //           action_uid +
    //           "\r\n"
    //       );
    //       client.HSET(
    //         hshkey,
    //         hshkey + "_" + user_id,
    //         JSON.stringify({ userid: user_id }),
    //         function (err, data) {
    //           if (err) {
    //             return res.json({ msg: "connect redis fail", con: 0 });
    //           }
    //           console.log(`抢夺成功，还剩下${surplus_quota_num - 1} 个名额.`);
    //           return res.json({ msg: "success", con: surplus_quota_num - 1 });
    //         }
    //       );
    //     } else {
    //       console.log("未抢到");
    //       fs.appendFileSync(
    //         "D:/v3_log/cache_log/quota_log.txt",
    //         "未抢到的用户id:" +
    //           user_id +
    //           ",加的随机数为:" +
    //           rondom_num +
    //           ",处理之后的用户id:" +
    //           action_uid +
    //           "\r\n"
    //       );
    //       return res.json({ msg: "很遗憾，您未抢到本次资格" });
    //     }
    //   }
    // });
  }

  async seckillList(req, res, next) {
    console.log("reqreqreq111---------------seckillList");
  }

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
