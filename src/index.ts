import "dotenv/config";
import { Bot, GrammyError, HttpError, webhookCallback } from "grammy";
import { hydrate } from "@grammyjs/hydrate";
import mongoose from "mongoose";
import { MyContext } from "./models/Types.js";
import {
  start,
  profile,
  products,
  backToMenu,
  purchase,
  support,
  faq,
  categories,
  balance,
  lowbalance,
  history,
} from "./commands/index.js";

const BOT_API_KEY = process.env.BOT_TOKEN;
if (!BOT_API_KEY) {
  throw new Error("Bot api key is not defined");
}
const bot = new Bot<MyContext>(BOT_API_KEY);
bot.use(hydrate());

bot.command("start", start);

bot.callbackQuery("categories", categories);

bot.callbackQuery("products", products);

bot.callbackQuery("profile", profile);

bot.callbackQuery("support", support);

bot.callbackQuery("faq", faq);

bot.callbackQuery("history", history);

bot.callbackQuery("backToMenu", backToMenu);

bot.callbackQuery("balance", balance);

bot.callbackQuery("lowbalance", lowbalance);

bot.callbackQuery(/^buyProduct-\d+$/, purchase);

bot.callbackQuery(/^categoryid-\d+$/, products);

// Ответ на любое сообщение
/*
bot.on("message:text", (ctx) => {
  ctx.reply(ctx.message.text);
});
*/

// Обработка ошибок согласно документации
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;

  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

// Функция запуска бота
async function startBot() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined!");
  }
  try {
    await mongoose.connect(MONGODB_URI);
    bot.start();
    console.log("Mongo DB connected & bot started");
  } catch (error) {
    console.error("Error in startBot:", error);
  }
}

startBot();
