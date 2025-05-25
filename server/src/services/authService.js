const bcrypt = require("bcrypt");
const { User } = require("../../db/models");
const generateTokens = require("../config/generateTokens");  
const jwtConfig = require("../config/jwtConfig");            

class AuthService {
  static async signup({ name, lastName, email, password, phoneNumber }) {
    if (!name || !lastName || !email || !password || !phoneNumber) {
      const err = new Error("Введите все данные при регистрации");
      err.status = 400;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        lastName,
        password: hashedPassword,
        phoneNumber,
      },
    });

    if (!created) {
      const err = new Error("Пользователь с таким email уже существует");
      err.status = 409;
      throw err;
    }

    // Убираем лишние поля перед отдачей в токены
    const userData = newUser.get();
    delete userData.password;
    delete userData.createdAt;
    delete userData.updatedAt;

    const { accessToken, refreshToken } = generateTokens(userData);

    return { userData, accessToken, refreshToken };
  }

  static async login({ email, password }) {
    if (!email || !password) {
      const err = new Error("Email и пароль обязательны");
      err.status = 400;
      throw err;
    }

    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) {
      const err = new Error("Неверный email или пользователь не найден");
      err.status = 401;
      throw err;
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      const err = new Error("Неверный пароль");
      err.status = 401;
      throw err;
    }

    const userData = foundUser.get();
    delete userData.password;
    delete userData.createdAt;
    delete userData.updatedAt;

    const { accessToken, refreshToken } = generateTokens(userData);
    return { userData, accessToken, refreshToken };
  }
}

module.exports = AuthService;
