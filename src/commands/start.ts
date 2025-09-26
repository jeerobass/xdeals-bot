import { User } from "../models/User.js";
import { MyContext } from "../models/Types.js";
import { mainkeyboard } from "../consts/mainkeyboard.js";
import { maintext } from "../consts/maintext.js";

export const start = async (ctx: MyContext) => {
  if (!ctx.from) {
    return ctx.reply("User info is not available");
  }
  const { id, first_name, username } = ctx.from;

  try {
    const existingUser = await User.findOne({ telegramId: id });
    if (!existingUser) {
      const newUser = new User({
        telegramId: id,
        firstName: first_name,
        username,
      });
      newUser.save();
    }

    return ctx.reply(maintext, {
      reply_markup: mainkeyboard,
      parse_mode: "HTML",
      link_preview_options: {
        is_disabled: true,
      },
    });
  } catch (error) {
    console.error("Ошибка при регистрации пользователя", error);
    ctx.reply("Произошла ошибка, попробуйте позже");
  }
};
