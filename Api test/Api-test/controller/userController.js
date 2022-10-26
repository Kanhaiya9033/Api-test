const userModel = require('../model/userModel')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = {
    signup: async (req, res, next) => {
        try {
            const {firstName, lastName, mobileNumber,address,email,password, confirmPassword } = req.body

            const user = await userModel.findOne({ email: email, status: "ACTIVE", userType: "USER" })
            if (user) {
                res.send({ responseCode: 404, responseMessage: "User Already exist" })
            } else {
                if (password !== confirmPassword) {
                    return res.send({ responseCode: 401, responseMessage: "password and confirmPassword does not Match" })
                } else {
                    const userSave = await userModel({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        mobileNumber: mobileNumber,
                        password: bcryptjs.hashSync(password),
                        address:address
                    }).save();
                    return res.send({ responseCode: 200, responseMessage: "signUp Succes", responseResult: userSave })
                }
            }
        } catch (error) {
            res.send({ responseCode: 501, responseMessage: "Something went Wrong", responseResult: error.message })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body
                const user = await userModel.findOne({ email: email, userType: "USER" })
                if (user) {
                    const isMatch = await bcryptjs.compareSync(password, user.password)
                    if (isMatch == true) {
                        const token = jwt.sign({ userNameId: user._id }, "Hello", { expiresIn: "1d" })
                        return res.send({ responseCode: 200, responseMessage: "Login Sucess", responseResult: user, token: token })
                    }
                    else {
                        return res.send({ responseCode: 404, responseMessage: "PASSWORD_INVALID", responseResult: [] })
                    }
                }
                else {
                    return res.send({ responseCode: 404, responseMessage: "User_Not_Found", responseResult: [] })
                }
        }
        catch (error) {
            return res.send({ responseCode: 501, responseMessage: "SOMETHING_WRONG", responseResult: error.message })
        }
    }




}