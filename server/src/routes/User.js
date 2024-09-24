const Router = require("koa-router"); //

const router = new Router({ prefix: "/user" });

const {checkEmpty,checkUser,crpytPassword,checkLogin,auth,checkRole } = require("../middleware/User");

const {register,login,getUserList,getUserInfo,updatePassword,updateToken,updataUser,updateRole} = require("../controllers/User");

// 注册
router.post("/register",checkEmpty,checkUser,crpytPassword,register)

// 登录
router.post("/login",checkEmpty,checkLogin,login);

// 获取会员列表
router.get("/userList", auth, checkRole(['admin','user']), getUserList);

// 获取会员信息
router.get("/getUserInfo",auth,getUserInfo);

// 修改密码
router.put("/updatePassword",auth,checkLogin, updatePassword);

// 刷新token
router.post("/refreshToken",updateToken);

// 编辑用户信息
router.post('/uodataUser', auth, updataUser)

// 修改用户权限
router.post('/updateRole', auth, checkRole(['admin']), updateRole)
module.exports = router;