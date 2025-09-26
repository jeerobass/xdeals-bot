import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { MyContext } from "../models/Types.js";
import { allcategories } from "../consts/allcategories.js";

export const categories = (ctx: CallbackQueryContext<MyContext>) => {
  ctx.answerCallbackQuery();

  const messageText = `<strong>Выберите категорию товаров 👇</strong>\n`;

  const keyboardButtonRows = allcategories.map((category) => {
    return [InlineKeyboard.text(category.name, `categoryid-${category.id}`)];
  });

  keyboardButtonRows.push([InlineKeyboard.text("🔙 Назад", "backToMenu")]);

  const keyboard = InlineKeyboard.from(keyboardButtonRows);

  ctx.callbackQuery.message?.editText(messageText, {
    reply_markup: keyboard,
    parse_mode: "HTML",
    link_preview_options: {
      is_disabled: true,
    },
  });
};
