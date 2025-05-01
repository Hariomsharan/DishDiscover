const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { jwtSecretKey } = require("../model/keys").url;
const nodemailer = require("nodemailer");

/**POST /user homepage controller*/
exports.homepageRoute = (req, res, next) => {
  res.status(200).json({ message: "hello from DishDiscover" });
};

/**POST /user/signup signup controller*/
exports.signupRoute = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(406).json(errors.errors);

  const { username, name, password, email } = req.body;
  const newUser = new User({ username, name, password, email });

  User.findOne({ username })
    .then((user) => {
      if (user) return res.status(302).json({ message: "user already exists" });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) =>
              res.status(201).json({ message: "New User Created", user })
            )
            .catch((err) =>
              res
                .status(500)
                .json({ message: "Internal Server Problem", error: err })
            );
        });
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "Internal Server Problem", error: err })
    );
};

/**POST /user/signin signin controller*/
exports.signinRoute = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) return res.status(401).json({ message: "user not found" });

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(401).json({ message: "Incorrect Password" });

        const token = jwt.sign({ user }, jwtSecretKey, { expiresIn: 3600 });
        req.header("auth-token", token);
        res
          .status(200)
          .json({ message: "successfully Signed in", token, user });
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "Internal Server Problem", error: err })
    );
};

/**POST /user/editProfile editProfile controller*/
exports.editProfileRoute = (req, res, next) => {
  const { username, name, email } = req.body;
  const updatedUser = { username, name, email };

  User.findOneAndUpdate(
    { username: req.user.username },
    { $set: updatedUser },
    { new: true, useFindAndModify: false }
  )
    .then((revisedUser) => {
      res
        .status(200)
        .json({ message: "User Profile Updated", user: revisedUser });
    })
    .catch((err) =>
      res.status(500).json({ message: "Internal Server Problem", error: err })
    );
};

/**POST /user/resetpassword reset password controller*/
exports.resetPasswordRoute = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(406).json(errors.errors);

  const { newpassword, oldpassword } = req.body;

  User.findOne({ username: req.user.username })
    .then((user) => {
      if (!user) return res.status(401).json({ message: "user not found" });

      bcrypt.compare(oldpassword, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(203).json({ message: "Incorrect Password" });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newpassword, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save();
            res
              .status(201)
              .json({ message: "Password Successfully Changed", user });
          });
        });
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "Internal Server Problem", error: err })
    );
};

/**POST /user/forgetpassword forgetpassword controller */
exports.forgetpasswordRoute = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(406).json(errors.errors);

  // let password = String(Math.floor(Math.random() * (999999999 - 100000) + 100000));
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = generatePassword(9);
  function generatePassword(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) return res.status(401).json({ message: "User not found" });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sharanhariom2771@gmail.com",
          pass: "oeie lqup gkxe tdjy",
        },
      });

      const mailOptions = {
        from: '"DishDiscover Inc." <DishDiscover.Inc@gmail.com>',
        to: req.body.email.trim(),
        subject: "Auto Generated Password",
        text: `Your Password is: "${password}".`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error)
          res.status(500).json({ message: "Internal server problem", error });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save();
            res.status(201).json({
              message: "Password recovered successfully, check your email",
            });
          });
        });
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "Internal server problem", error: err })
    );
};
