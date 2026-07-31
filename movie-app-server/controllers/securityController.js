const speakeasy = require("speakeasy");

const QRCode = require("qrcode");

const { PrismaClient } = require("@prisma/client");



const prisma = new PrismaClient();



const setupTwoFactor = async (req, res) => {

  try {

    const secret = speakeasy.generateSecret({

      name: `CineSync (${req.user.email})`,

      issuer: "CineSync",

      length: 20,

    });



    const qrCode = await QRCode.toDataURL(secret.otpauth_url);



    await prisma.user.update({

      where: {

        id: req.user.id,

      },

      data: {

        twoFactorSecret: secret.base32,

      },

    });



    return res.status(200).json({

      qrCode,

      secret: secret.base32,

    });

  } catch (err) {

    console.error(err);



    return res.status(500).json({

      message: "Unable to generate 2FA setup.",

    });

  }

};



const verifyTwoFactor = async (req, res) => {

  try {

    const { token } = req.body;



    const user = await prisma.user.findUnique({

      where: {

        id: req.user.id,

      },

    });



    if (!user || !user.twoFactorSecret) {

      return res.status(400).json({

        message: "2FA has not been configured.",

      });

    }



    const verified = speakeasy.totp.verify({

      secret: user.twoFactorSecret,

      encoding: "base32",

      token,

      window: 1,

    });



    if (!verified) {

      return res.status(400).json({

        message: "Invalid verification code.",

      });

    }



    await prisma.user.update({

      where: {

        id: req.user.id,

      },

      data: {

        twoFactorEnabled: true,

      },

    });



    return res.status(200).json({

      message: "Two-factor authentication enabled successfully.",

    });

  } catch (err) {

    console.error(err);



    return res.status(500).json({

      message: "Server Error",

    });

  }

};



const disableTwoFactor = async (req, res) => {

  try {

    await prisma.user.update({

      where: {

        id: req.user.id,

      },

      data: {

        twoFactorEnabled: false,

        twoFactorSecret: null,

      },

    });



    return res.status(200).json({

      message: "Two-factor authentication disabled.",

    });

  } catch (err) {

    console.error(err);



    return res.status(500).json({

      message: "Server Error",

    });

  }

};



module.exports = {

  setupTwoFactor,

  verifyTwoFactor,

  disableTwoFactor,

};