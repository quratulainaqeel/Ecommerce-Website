require('dotenv').config()
const User = require('./Schema')
const { connect } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const Signup = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            console.log("Signup DB connected")

            const userExist = await User.exists({ email: email })
            if (userExist) {
                res.json({
                    Message: "User already exist"
                })
            }
            else {
                await User.create({ username, email, password: await hash(password, 12) })

                console.log(" User Created")

                res.status(201).json(
                    {
                        Message: "SignUP SucessFully"
                    }
                )
            }

        } catch (error) {
            res.status(404).json(
                {
                    message: error.messaage
                }
            )
        }
    }


}

const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            console.log("Login DB connected")

            const checkuserExist = await User.findOne({ email: email })

            if (!checkuserExist) {
                res.status(404).json(
                    {
                        Message: "User Does not Exist"
                    }
                )
            }
            else {
                const decrypPassword = await compare(password, checkuserExist.password)
                console.log(decrypPassword)

                if (email == checkuserExist.email && decrypPassword) {

                    const token = sign(
                        {
                            id: checkuserExist._id,
                            username: checkuserExist.username,
                            email: checkuserExist.email,
                            role: checkuserExist.role,
                            profile_pic: checkuserExist.profile_pic,
                            joiningDate: checkuserExist.joiningDate
                        }
                        ,
                        process.env.JWT_SECRET
                    )
                    res.status(200).json(
                        {
                            Message: "Sucessfully Login",
                            token: token
                        }
                    )
                }
                else {
                    res.status(401).json(
                        {
                            Message: "Invalid Credentials"
                        }
                    )
                }
            }
        }

        catch (error) {
            res.status(404).json(
                {
                    message: error.messaage
                }
            )
        }
    }



}

const getAllUser = async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)
        console.log(" getAllUser DB connected")
        const alluser = await User.find()
        res.json(
            {
                User: alluser
            }
        )
    }

    catch (error) {
        res.status(404).json(
            {
                message: error.messaage
            }
        )
    }
}

const getUserById = async (req, res) => {

    const { _id } = req.query

    try {
        await connect(process.env.MONGO_URI)
        console.log("getUserById DB connected")

        const userbyid = await User.findOne({ _id })

        res.json(
            {
                User: userbyid
            }
        )

    } catch (error) {
        res.status(404).json(
            {
                message: error.messaage
            }
        )
    }
}

const getuserbyEmail = async (req, res) => {
    const { email } = req.query

    try {
        await connect(process.env.MONGO_URI)
        console.log("getuserbyEmail DB connected")

        const userbyemail = await User.findOne({ email })

        res.json(
            {
                User: userbyemail
            }
        )

    } catch (error) {
        res.status(404).json(
            {
                message: error.messaage
            }
        )
    }
}

const UpdateUser = async (req, res) => {

    const { _id, username, profile_pic } = req.body
    if (!_id) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        const filter = { _id };
        const update = { username, profile_pic };

        try {

            await connect(process.env.MONGO_URI)
            console.log("UpdateUser DB connected")

            const updateuser = await User.findOneAndUpdate(filter, update, {
                new: true
            });

            // const updateuser = await User.find()

            res.json({
                message: "Info Update Sucessfully",
                User: updateuser
            })
        }
        catch (error) {
            res.status(404).json(
                {
                    message: error.messaage
                }
            )

        }
    }




}

const DeleteUser = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            console.log(" DeleteUser DB connected")

            await User.deleteOne({ _id })
            const user = await User.find()

            res.status(200).json(
                {
                    message: "Delete Sucessfully",
                    User: user
                }
            )

        } catch (error) {
            res.status(404).json(
                {
                    message: error.messaage
                }
            )
        }
    }


}
module.exports = { Login, Signup, getAllUser, getUserById, getuserbyEmail, DeleteUser, UpdateUser }