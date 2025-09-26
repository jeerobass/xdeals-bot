import { CallbackQueryContext } from "grammy";
import { MyContext } from "../models/Types.js";

export const history = (ctx: CallbackQueryContext<MyContext>) => {
  ctx.answerCallbackQuery("У вас пока не было покупок");
};
