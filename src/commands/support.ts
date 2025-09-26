import { MyContext } from "../models/Types.js";
import { CallbackQueryContext, InlineKeyboard } from "grammy";

export const support = async (ctx: CallbackQueryContext<MyContext>) => {
  ctx.answerCallbackQuery();

  const message = `💬 <strong>Связь с поддержкой\n━━━━━━━━━━━━━━━━━━━━\n▪️ Время работы службы поддержки:\n<code>с 12:00 до 19:00 (МСК)</code>\n\n▪️ В указанное время вы получите ответ максимально быстро.\n\n❗️ Если вы отправили запрос в нерабочее время, пожалуйста, будьте готовы к тому, что время ожидания ответа может увеличиться.\n\n▪️ Мы обязательно ответим на все ваши вопросы, как только специалисты поддержки будут доступны.\n\nСпасибо за ваше понимание!</strong> 🙏`;
  return ctx.callbackQuery.message?.editText(
    message,
    {
      reply_markup: new InlineKeyboard().url("📩 Написать в поддержку", "https://t.me/xboxpass_support_bot").row().text("🔙 В меню", "backToMenu"),
      parse_mode: "HTML",
    }
  );
};