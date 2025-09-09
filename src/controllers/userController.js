import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dot_env_conf from "../config/dotenv.js";

export const register = async (data) => {
 
  if (!data.name || !data.email || !data.nickname || !data.password) throw new Error('MISSING_DATA')

  const email_exist = await User.findOne({ email: data.email })
  const nickname_exist = await User.findOne({ nickname: data.nickname })

  if (email_exist || nickname_exist) throw new Error('ALLREADY_EXIST')

  try {
    const saltRounds = parseInt(dot_env_conf.LOOPDB*dot_env_conf.LOOOPDB*dot_env_conf.LOOOOPDB);
    data.password = bcrypt.hashSync(data.password, saltRounds);
    
      data.role = "user"
      data.is_active = true
      data.confirmed = false
      data.isSeeded = false

    await new User(data).save()

    return {
      succes: true,
      message: "Gracias por Registrarte",
    };
  } catch (error) {
    throw new Error('BAD_REQUEST')
}
}

export const login = async (data) => {
  const user_exist = await User.findOne({ $or: [{ email: data.email }, { nickname: data.nickname }] });
  if (!user_exist) throw new Error('EMAIL_PASSWORD')
  if (user_exist.is_active === false) throw new Error('DELETED')
  try {
      const compare_password = bcrypt.compareSync(data.password, user_exist.password)
      if (!compare_password) throw new Error('EMAIL_PASSWORD')

      const token = jwt.sign({ user: user_exist }, CONFIDENCE.SECRETDB, { expiresIn: '12h' });
      return {
          succes: true,
          data: user_exist,
          token: token
      }
  } catch (error) {
      throw new Error('BAD_REQUEST')
  }
}
