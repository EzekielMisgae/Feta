const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const setAdmin = async (req, res) => {
    const secret = JWT_SECRET;
    const payload = {
        email: req.body.email,
    };

    const token = await jwt.sign(payload, secret);

    const new_admin = new Admin({
        admin_id: token,
        email: req.body.email,
        name: req.body.name,
        pass: req.body.password,
    });

    try {
        await new_admin.save();
        console.log("Saved::New Admin::credentials.");
        res.status(200).send({ msg: "Credentials Added" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Failed to add credentials" });
    }
};

const adminAuth = async (req, res) => {
    const Email = req.body.email;
    const Pass = req.body.password;

    try {
        const admin = await Admin.findOne({ email: Email });
        if (!admin) {
            return res.status(400).send({ msg: "Admin access denied" });
        } else if (Pass === admin.pass) {
            res.status(200).send({
                msg: "Success",
                admin_token: admin.admin_id,
            });
        } else {
            return res.status(400).send({ msg: "Email or Password is wrong" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Failed to authenticate admin" });
    }
};

const adminDetails = async (req, res) => {
    const admin_token = req.body.admin_id;

    try {
        const admin = await Admin.findOne({ admin_id: admin_token });
        if (!admin) {
            return res.status(400).send({ msg: "No such admin exists" });
        } else {
            res.status(200).send(admin);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Failed to fetch admin details" });
    }
};

module.exports = {
    setAdmin,
    adminAuth,
    adminDetails,
};
