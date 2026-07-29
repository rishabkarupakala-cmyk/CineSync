const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ================= REGISTER =================

const register = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      isPrivate,
    } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: email.trim().toLowerCase(),
          },
          {
            username: username.trim(),
          },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or username already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        isPrivate: isPrivate ?? false,
      },
    });

    const token = generateToken(user.id);

    console.log("NEW USER:", user.username);

    return res.status(201).json({
      message: "Registration successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        isPrivate: user.isPrivate,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= LOGIN =================

const login = async (req, res) => {
  console.log("LOGIN REQUEST:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (!user) {
      console.log("USER NOT FOUND");

      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      console.log("WRONG PASSWORD");

      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user.id);

    console.log("LOGIN SUCCESS");
    console.log("ID:", user.id);
    console.log("USERNAME:", user.username);
    console.log("EMAIL:", user.email);
    console.log("TOKEN:", token);
        return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        isPrivate: user.isPrivate,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  register,
  login,
};