import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { MyContext } from "../models/Types.js";
import { mainkeyboard } from "../consts/mainkeyboard.js";
import { maintext } from "../consts/maintext.js";

export const backToMenu = (ctx: CallbackQueryContext<MyContext>) => {
  ctx.answerCallbackQuery();
  ctx.callbackQuery.message?.editText(maintext, {
    reply_markup: mainkeyboard,
    parse_mode: "HTML",
    link_preview_options: {
      is_disabled: true,
    },
  });
};
