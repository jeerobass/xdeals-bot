import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { MyContext } from "../models/Types.js";

export const balance = (ctx: CallbackQueryContext<MyContext>) => {
  ctx.answerCallbackQuery();

  const messageText = `<strong>❕ В данный момент пополнение баланса происходит в ручном режиме.\n\n✅ Воспользуйтесь кнопкой "Написать нам", чтобы сообщить оператору, на какую сумму Вы хотите пополнить баланс личного кабинета, и мы выдадим Вам реквизиты для оплаты.</strong>`;

  const keyboard = new InlineKeyboard().text("💬 Написать нам", "support").row().text("🔙 В меню", "backToMenu");

  ctx.callbackQuery.message?.editText(messageText, {
    reply_markup: keyboard,
    parse_mode: "HTML",
  });
};