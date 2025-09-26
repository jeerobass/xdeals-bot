import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { allproducts } from "../consts/allproducts.js";
import { MyContext } from "../models/Types.js";

export const purchase = (ctx: CallbackQueryContext<MyContext>) => {
  ctx.answerCallbackQuery();
  const productId = ctx.callbackQuery.data.split("-")[1];

  const product = allproducts.find(
    (product) => product.id === parseInt(productId)
  );

  if (!product) {
    return ctx.callbackQuery.message?.editText("Что-то пошло не так");
  }

  const keyboard = new InlineKeyboard()
    .text("💳 Купить", "lowbalance")
    .row()
    .text("🔙 Назад", `categoryid-${product.category_id}`);

  ctx.callbackQuery.message?.editText(`${product.description}`, {
    reply_markup: keyboard,
    parse_mode: "HTML",
    link_preview_options: {
      is_disabled: true,
    },
  });
};
