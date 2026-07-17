import bcryptjs from "bcryptjs";
import clientsModal from "../models/clients.js";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "../../config.js";

const clientController = {};

clientController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await clientsModal.findOne({ email });

    if (!userFound) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (userFound.timeout && userFound.timeout > Date.now()) {
      return res.status(403).json({ message: "Client blocked" });
    }

    const isMatch = await bcryptjs.compare(password, userFound.password);

    if (!isMatch) {
      userFound.loginAttempts = (userFound.loginAttempts || 0) + 1;
      if (userFound.loginAttempts > 6) {
        userFound.timeout = Date.now() + 15 * 60 * 1000;
        userFound.loginAttempts = 0;

        await userFound.save();
        return res.status(403).json({ message: "Account blocked" });
      }
      await userFound.save();
      return res.status(403).json({ message: "Incorrect Password" });
    }

    userFound.loginAttempts = 0;
    userFound.timeout = null;
    await userFound.save();

    const token = jsonwebtoken.sign(
      { id: userFound._id, userType: "Client" },
      config.jwt.secret,
      { expiresIn: "10d" },
    );

    res.cookie("auth", token);

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

clientController.logout = async (req, res) => {
  try {
    res.clearCookie("auth");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

clientController.register = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      isVerified,
      loginAttempts,
      timeout,
    } = req.body;

    const clientExists = await clientsModal.findOne({ email });

    if (clientExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newClient = new clientsModal({
      name,
      lastName,
      email,
      password: passwordHash,
      isVerified,
      loginAttempts,
      timeout,
    });

    await newClient.save();

    const verificationCode = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign(
      { email, verificationCode },
      config.jwt.secret,
      { expiresIn: "30m" },
    );

    res.cookie("verification", token, 30 * 60 * 1000);

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.user.email,
        pass: config.user.pass,
      },
    });

    transport.sendMail({
        from: config.user.email,
        to: email,
        subject: "Verificacion de cuenta",
        text: `El codigo para verificar la cuenta es: ${verificationCode}`,
      },(error) => {
        if (error)
          return res.status(500).json({ message: "Internal Server Error" });
      });
    return res.status(200).json({message:"Client created successfully, check your inbox emails for the verification code"})
  } catch (error) {
    console.log("Error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

clientController.verify = async (req, res) => {
  try {
    const { verify } = req.body;
    const token = req.cookies.verification;
    const decoded = jsonwebtoken.verify(token, config.jwt.secret);
    const { email, verificationCode: storedCode } = decoded;

    if (verify !== storedCode) {
      return res.status(400).json({ message: "Invalid Code" });
    }

    const client = await clientsModal.findOne({ email });
    client.isVerified = true;
    await client.save();

    res.clearCookie("verification");

    res.json({ message: "Email verified" });
  } catch (error) {
    console.log("Error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default clientController;
