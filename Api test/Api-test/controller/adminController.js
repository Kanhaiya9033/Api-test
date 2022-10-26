const userModel = require('../model/userModel')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports={
    adminLogin: async (req, res) => {
        try {
            const { email, password } = req.body
                const user = await userModel.findOne({ email: email, userType: "ADMIN" })
                if (user) {
                    const isMatch = await bcryptjs.compareSync(password, user.password)
                    if (isMatch == true) {
                        const token = jwt.sign({ userNameId: user._id }, "Hello", { expiresIn: "1d" })
                        return res.send({ responseCode: 200, responseMessage: "Login Sucess", responseResult: user, token: token })
                    }
                    else {
                        return res.send({ responseCode: 401, responseMessage: "PASSWORD_INVALID", responseResult: [] })
                    }
                }
                else {
                    return res.send({ responseCode: 404, responseMessage: "User_Not_Found", responseResult: [] })
                }
        }
        catch (error) {
            return res.send({ responseCode: 501, responseMessage: "SOMETHING_WRONG", responseResult: error.message })
        }
    },
}