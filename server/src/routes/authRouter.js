const router = require("express").Router();
const authController = require("../controllers/authController");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
// const AuthService = require("../services/authService");
// const jwtConfig = require("../config/jwtConfig");
// const { User } = require('../../db/models');
// const nodemailer = require('nodemailer');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const generateTokens = require('../config/generateTokens'); 

// const { JWT_EMAIL_SECRET, FRONTEND_URL, MAIL_USER, MAIL_PASS } = process.env;

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: MAIL_USER,
//     pass: MAIL_PASS,
//   }
// });

// router.post('/signup', async (req, res, next) => {
//   try {
//     const { name, lastName, email, password, phoneNumber } = req.body;
//     if (!name || !lastName || !email || !password || !phoneNumber) {
//       const err = new Error('Введите все данные при регистрации');
//       err.status = 400;
//       throw err;
//     }

//     // хэшируем пароль
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // пытаемся создать пользователя
//     const [user, created] = await User.findOrCreate({
//       where: { email },
//       defaults: { name, lastName, password: hashedPassword, phoneNumber },
//     });

//     if (!created) {
//       const err = new Error('Пользователь с таким email уже существует');
//       err.status = 409;
//       throw err;
//     }

//     // готовим полезные данные
//     const userData = user.get();
//     delete userData.password;
//     delete userData.createdAt;
//     delete userData.updatedAt;

//     // генерируем access+refresh
//     const { accessToken, refreshToken } = generateTokens(userData);

//     // генерируем JWT для подтверждения email
//     const emailToken = jwt.sign(
//       { sub: userData.id, email: userData.email },
//       JWT_EMAIL_SECRET,
//       { expiresIn: '24h' }
//     );
//     const verifyLink = `${FRONTEND_URL}/verify-email?token=${emailToken}`;

//     // отправляем письмо
//     transporter.sendMail({
//       to: userData.email,
//       from: MAIL_USER,
//       subject: 'Подтвердите ваш email',
//       html: `
//         <p>Здравствуйте, ${userData.name}!</p>
//         <p>Чтобы подтвердить вашу почту, перейдите по 
//           <a href="${verifyLink}">этой ссылке</a>.
//         </p>
//       `
//     }).catch(mailErr => {
//       console.error('Ошибка при отправке письма:', mailErr);
//       // не бросаем — регистрация считается успешной, даже если письмо не ушло
//     });

//     // возвращаем токены и данные
//     res
//       .cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         maxAge: jwtConfig.refreshToken.expireIn,
//       })
//       .status(201)
//       .json({ user: userData, accessToken });
//   } catch (err) {
//     next(err);
//   }
// });

// // GET /api/auth/verify-email?token=...
// router.get('/verify-email', async (req, res, next) => {
//   try {
//     const token = req.query.token;
//     if (!token) return res.status(400).send('Токен не передан');

//     let payload;
//     try {
//       payload = jwt.verify(token, JWT_EMAIL_SECRET);
//     } catch {
//       return res.status(400).send('Токен недействителен или просрочен');
//     }

//     const user = await User.findByPk(payload.sub);
//     if (!user) return res.status(404).send('Пользователь не найден');

//     user.isVerified = true;
//     await user.save();

//     // после подтверждения можно редиректить на фронт
//     res.redirect(`${FRONTEND_URL}/verified-success`);
//   } catch (err) {
//     next(err);
//   }
// });

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/current", verifyAccessToken, authController.protectedRoute);
// router.get("/verify-email", authController.verifyEmail);

module.exports = router;
