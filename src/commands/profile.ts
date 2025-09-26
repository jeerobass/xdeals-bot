import { MyContext } from "../models/Types.js";
import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { User } from "../models/User.js";

export const profile = async (ctx: CallbackQueryContext<MyContext>) => {
  ctx.answerCallbackQuery();

  const user = await User.findOne({
    telegramId: ctx.from.id,
  });

  if (!user) {
    return ctx.callbackQuery.message?.editText(
      "Для доступа к профилю необходимо зарегистрироваться, используя команду /start"
    );
  }

  const registrationDate = user.createdAt.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const balance = 0;
  const productsAmount = 0;

  return ctx.callbackQuery.message?.editText(
    `👤 <strong>Профиль пользователя</strong>\n\n👤 <strong>Основная информация:</strong>\n🆔 ID: <code>${user.telegramId}</code>\n💳 Баланс: <code>${balance} руб.</code>\n📦 Куплено товаров: <code>${productsAmount} шт</code>\n\n📅 Дата регистрации: <code>${registrationDate}</code>`,
    {
      reply_markup: new InlineKeyboard().text("💰 Пополнить", "balance").text("🎁 Мои покупки", "history").row().text("🔙 Назад", "backToMenu"),
      parse_mode: "HTML",
    }
  );
};