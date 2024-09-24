const { userRegisterError, userLoginError, getUserError, invalidPassword, invalidToken } = require('../constant/errorType')
const { createtUser, UserLogin,Userlist, getUser, changPassword, changToken, updateUserInfo,updateRoleInfo } = require('../services/User')
// 注册
const register = async (ctx, next) => {
    try {
        const { username, password } = ctx.request.body;
        const user = await createtUser(username, password);
        ctx.body = {
            code: 200,
            message: '注册成功',
            result: user
        };
    } catch (error) {
        console.log("注册", error)
        ctx.app.emit('error', userRegisterError, ctx)
    }
}

// 登录
const login = async (ctx, next) => {
    try {
        const { username, password } = ctx.request.body;
        const userinfo = await UserLogin(username, password)
        ctx.body = {
            code: 200,
            message: '登录成功',
            result: userinfo
        }
    } catch (error) {
        console.log("登录", error);
        ctx.app.emit('error', userLoginError, ctx)
    }
}

// 获取用户列表
const getUserList = async (ctx, next) => {
    try {
        const params = ctx.query
        const userList = await Userlist(ctx,params)
        ctx.body = {
            code: 200,
            message: '获取用户列表成功',
            result:userList
        }
    } catch (error) {
        console.log("获取用户信息", error);
        ctx.app.emit('error', getUserError, ctx)
    }
}

// 获取用户信息
const getUserInfo = async (ctx, next) => {
    try {
        const { id } = ctx.request.query;
        const userinfo = await getUser(id)
        ctx.body = {
            code: 200,
            message: '获取用户信息成功',
            result: userinfo
        }
    } catch (error) {
        console.log("获取用户信息", error);
        ctx.app.emit('error', getUserError, ctx)
    }
}

// 修改密码
const updatePassword = async (ctx, next) => {
    try {
        const { id, username, newPassword } = ctx.request.body;
        await changPassword(id, username, newPassword)
        ctx.body = {
            code: 200,
            message: '修改密码成功',
        }
    } catch (error) {
        console.log("修改密码", error);
        ctx.app.emit('error', invalidPassword, ctx)
    }

}

//刷新token
const updateToken = async (ctx, next) => {
    try {
        const { refreshToken } = ctx.request.body;
        const tokenInfo = await changToken(refreshToken)
        ctx.body = {
            code: 200,
            message: '刷新token成功',
            tokenInfo
        }
    } catch (error) {
        console.log("刷新token", error);
        ctx.app.emit('error', invalidToken, ctx)
    }
}

//编辑用户信息
const updataUser = async (ctx, next) => {
    try {
        const { id, username, avatar, address, phone } = ctx.request.body
        const UserInfo = await updateUserInfo(id, { username, avatar, address, phone })
        ctx.body = {
            code: 200,
            message: '修改用户信息成功',
            UserInfo
        }
    } catch (error) {
        console.log("修改用户信息", error);
        ctx.app.emit('error', getUserError, ctx)
    }
}

//修改用户权限
const updateRole = async (ctx, next) => {
    try {
        const { id, role } = ctx.request.body
        const UserInfo = await updateRoleInfo(id, { role })
        ctx.body = {
            code: 200,
            message: '修改用户权限成功',
            UserInfo
        }
    } catch (error) {
        console.log("修改用户权限", error);
        ctx.app.emit('error', getUserError, ctx)
    }
}

module.exports = {
    register,
    login,
    getUserList,
    getUserInfo,
    updatePassword,
    updateToken,
    updataUser,
    updateRole
}