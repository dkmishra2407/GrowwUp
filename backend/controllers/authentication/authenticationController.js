const User = require('../../models/User');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const Order = require('../../models/Order');
const Position = require('../../models/Position');
const en = require("nanoid-good/locale/en");
const customAlphabet = require("nanoid-good").customAlphabet(en);
const nodemailer = require('nodemailer');

const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const idLength = 6;



module.exports.signup_user = async (req, res) => {
    try {
        const { fullName, mobile, email, password } = req.body;

        // Validation checks for required fields
        if (!fullName || !email || !password || !mobile) {
            return res.status(400).json({
                status: 400,
                message: "Please provide all required fields to register as a new user."
            });
        }

        // Check if email or mobile already exists in the database
        const isEmailExists = await User.findOne({ email });
        const isMobileExists = await User.findOne({ mobile });

        if (isEmailExists) {
            return res.status(400).json({
                status: 400,
                message: "A user with this email address already exists, please try again with a different email."
            });
        }

        if (isMobileExists) {
            return res.status(400).json({
                status: 400,
                message: "A user with this mobile number already exists, please try again with a different mobile number."
            });
        }

        // Hash the password before saving it to the database
        const hashPassword = await bcrypt.hash(password, 10);

        // Generate unique user ID
        const generateId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
        const userId = generateId();

        // Create a new user instance
        const user = new User({
            userId: userId,
            fullName: fullName,
            email: email,
            mobile: mobile,
            password: hashPassword
        });

        // Save the user to the database
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, userId, fullName, email },
            process.env.TOKEN_KEY || 'default_secret_key'
        );

        // Send success response with token and user ID
        return res.status(200).json({
            success: true,
            data: {
                message: 'Registered successfully',
                userid: user._id,
                myuserid:userId,
                token,
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ 
            status: 500, 
            message: e.message 
        });
    }
}

module.exports.signin_user = async (req, res) => {

    try {

        const { userId, password } = req.body

        if (!userId || !password) {
            return res.status(400).json({ 
                status: 400, 
                message: "User ID and password is required to login." 
            });
        }

        let user = await User.findOne({ userId });

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "This user id you have entered is not available."
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                status: 400,
                message: "Invalid user id and password"
            });
        }

        const fullName = user.fullName;
        const email = user.email;

        let token = jwt.sign(
            { id: user._id, userId, fullName, email },
            process.env.TOKEN_KEY || 'default_secret_key', // Use a default value if TOKEN_KEY is not available
        );
        

        return res.status(200).json({
            success: true,
            data: {
                message: 'Login successful',
                userid: user._id,
                myuserid:userId,
                token,
            }
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({ status: 500, message: e.message });
    }
}

module.exports.get_trader_by_userId = async (req, res) => {
    const { userId } = req.query;
    try {
        const trader = await User.findOne({ _id: userId }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
        return res.status(200).json({
            success: true,
            data: {
                trader: trader
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            message: err.message
        });
    }
}

module.exports.reset_user_funds = async (req, res) => {
    const { userId } = req.query;
    console.log(userId)
    try {
        await Order.deleteMany({ userId: userId });
        await Position.deleteMany({ userId: userId });
        await User.findOneAndUpdate({ userId: userId }, {
            availableFunds: 100000
        });

        return res.status(200).json({
            success: true,
            message: 'Reset Successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: err.message
        });
    }
}