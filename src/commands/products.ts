import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { MyContext } from "../models/Types.js";
import { allproducts } from "../consts/allproducts.js";
import { allcategories } from "../consts/allcategories.js";

export const products = (ctx: CallbackQueryContext<MyContext>) => {
  ctx.answerCallbackQuery();

  const categoryId = ctx.callbackQuery.data.split("-")[1];

  const category = allcategories.find(
    (category) => category.id === parseInt(categoryId)
  );

  if (!category) {
    return ctx.callbackQuery.message?.editText("Что-то пошло не так");
  }

  if (category.id === 2) {
    const messageText = `<strong>Регистрация НОВОГО аккаунта XBOX</strong>\n\nЦена: 150 руб.`;
    const keyboard = new InlineKeyboard()
      .text("💳 Купить", "lowbalance")
      .row()
      .text("🔙 Назад", "categories");
    ctx.callbackQuery.message?.editText(messageText, {
      reply_markup: keyboard,
      parse_mode: "HTML",
      link_preview_options: {
        is_disabled: true,
      },
    });
  } else {
    const messageText = `🎁 <strong>Выберите товар:</strong>\n`;
    const keyboardButtonRows = allproducts
      .filter((cat) => cat.category_id === category.id)
      .map((product) => {
        return [
          InlineKeyboard.text(
            `${product.name} | ${product.fixed_price ? "от" : ""} ${
              product.price
            } руб.`,
            `buyProduct-${product.id}`
          ),
        ];
      });

    keyboardButtonRows.push([InlineKeyboard.text("🔙 Назад", "categories")]);
    const keyboard = InlineKeyboard.from(keyboardButtonRows);
    ctx.callbackQuery.message?.editText(messageText, {
      reply_markup: keyboard,
      parse_mode: "HTML",
      link_preview_options: {
        is_disabled: true,
      },
    });
  }
};
