const userModel = require('../model/userModel');
module.exports = {
    list: async(req,res)=>{
        try {
            const data = await userModel.find({userType:"USER",status:"ACTIVE"});
            if(!data){
                return res.send({ responseCode: 404, responseMessage: "User_Not_Found"})
            }else{
                return res.send({ responseCode: 200, responseMessage: "list show succesfully", responseResult: data })
            }
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "Somethingw went wrong", responseResult: error.message})
        }

    }
}