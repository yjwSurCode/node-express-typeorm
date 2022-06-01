npx typeorm init --name MyProject --database mysql --express

MyProject
├── src // TypeScript 代码
│ ├── entity // 存储实体（数据库模型）的位置
│ │ └── User.ts // 示例 entity
│ ├── migration // 存储迁移的目录
│ └── index.ts // 程序执行主文件
├── .gitignore // gitignore 文件
├── ormconfig.json // ORM 和数据库连接配置
├── package.json // node module 依赖
├── README.md // 简单的 readme 文件
└── tsconfig.json // TypeScript 编译选项

    Migration 数据迁移，用来对数据库进行写入或回撤。Entity 实体，用类和对象来操作数据表和数据行。Connection 连接，与数据库连接，默认最多 10 个。Manager / repo，两种 API 封装风格，用于操作 Entity。

"type": "mysql",
"host": "localhost",
"port": 3306,
"username": "test",
"password": "test",
"database": "test",
"synchronize": true,
"logging": false,
"entities": [
"src/entity/**/*.ts"
],
"migrations": [
"src/migration/**/*.ts"
],
"subscribers": [
"src/subscriber/**/*.ts"
],
"cli": {
"entitiesDir": "src/entity",
"migrationsDir": "src/migration",
"subscribersDir": "src/subscriber"
}

var moment = require('moment');
console.log(moment().format("YYYY-MM-DD HH:mm:ss")); //当前时间 （24 小时制）

console.log(moment().add(1, "hours").format("YYYY-MM-DD HH:mm:ss")); //当前时间增加 1 小时
console.log(moment().add(1, "months").format("YYYY-MM-DD HH:mm:ss")); //当前时间增加 1 个月

console.log(moment().subtract(10, "days").format("YYYY-MM-DD HH:mm:ss")); //当前时间的前 10 天时间
console.log(moment().subtract(1, "years").format"YYYY-MM-DD HH:mm:ss")); //当前时间的前 1 年时间
console.log(moment().subtract(3, "months").format("YYYY-MM-DD HH:mm:ss")); //当前时间的前 3 个月时间
console.log(moment().subtract(1, "weeks").format("YYYY-MM-DD HH:mm:ss")); //当前时间的前一个星期时间

moment(req.body.renewStartTime).startOf('month').format("YYYY-MM-DD")+" 00:00:00"; //获取月的开始时间
moment(req.body.renewEndTime).endOf('month').format("YYYY-MM-DD")+" 23:59:59"; //获取月的结束时间

select \* from userinfo where id=1;

sudo pm2 start ts-node ./src/index.ts --name app -i 5 --interpreter ./node_modules/.bin/ts-node

pm2 start pm2.json --env production

ps -ef|grep pm2

pm2 start ecosystem.config.js

npm i --save-dev @types/body-parser
npm i --save-dev @types/express



// INSERT [INTO] 表名 [(字段列表)] VALUES (值列表)[, (值列表), ...]
// INSERT [INTO] 表名 SET 字段名=值
// insert into 表名 (sno,sname,enterdate) values(10,'李四','2021-1-1')



怎么处理请求方式不对？？？

# 启动进程/应用

pm2 start bin/www

# 重命名进程/应用

pm2 start app.js --name wb123、

# 添加进程/应用

pm2 start bin/www

# 结束进程/应用

pm2 stop www

# 结束所有进程/应用

pm2 stop all

# 删除进程/应用 pm2

pm2 delete www

# 删除所有进程/应用

pm2 delete all

# 列出所有进程/应用

pm2 list

# 查看某个进程/应用具体情况

pm2 describe www

# 查看进程/应用的资源消耗情况

pm2 monit

# 查看 pm2 的日志

pm2 logs 序号/名称

# 若要查看某个进程/应用的日志,使用

pm2 logs www

# 重新启动进程/应用

pm2 restart www

# 重新启动所有进程/应用

pm2 restart all

11111111111 Error: ER_CANT_AGGREGATE_2COLLATIONS: Illegal mix of collations (utf8mb4_bin,IMPLICIT) and (utf8_general_ci,COERCIBLE) for operation '='
自己改动数据库

用户名带字符串
fields Error: ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: Incorrect string value: '\xF0\x9F\x87\xA8\xF0\x9F...' for column 'userName' at row 1

JWT 通常由三部分组成，分别是 Header（头部）、Payload（有效荷载）、Signature（签名）。

npm i jsonwebtoken express-jwt

jsonwebtoken 用于生成 JWT 字符串
express-jwt 用于将 JWT 字符串解析还原成 JSON 对象





抢购：：：：：：
