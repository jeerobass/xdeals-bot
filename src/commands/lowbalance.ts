import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { MyContext } from "../models/Types.js";

export const lowbalance = (ctx: CallbackQueryContext<MyContext>) => {
  ctx.answerCallbackQuery();

  const messageText = `🔴 <strong>Недостаточно средств на балансе для покупки.\n\nПожалуйста, пополните баланс ЛК на необходимую сумму.</strong>`;

  const keyboard = new InlineKeyboard()
    .text("💰 Пополнить", "balance")
    .row()
    .text("🔙 В меню", "backToMenu");

  ctx.callbackQuery.message?.editText(messageText, {
    reply_markup: keyboard,
    parse_mode: "HTML",
    link_preview_options: {
      is_disabled: true,
    },
  });
};
