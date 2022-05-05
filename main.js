const axios = require("axios")
const { Telegraf, Context } = require("telegraf");

const bot = new Telegraf("5346927809:AAFqMh1RHq9xUFNMfYHUH-0ObLHEYAyQ6Cw");

bot.start((context) => context.reply("Welcome please type /random for a random food"));
bot.help((context) => context.reply("Its a random food generator(for now), type /random to get a random food I dont know how to make it simpler than that. Sorry if you need somethingelse, I suggest you use this greate tool calle google.com to find what your looking for.😅"))

bot.hears("/random", (context) => {
    axios
        .get("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(async res => {
            // let outPutstr = `
            // ${res.data.meals[0].strMealThumb}
            // ${res.data.meals[0].strMeal}
            // Classified as: ${res.data.meals[0].strTags}
            // Origin: ${res.data.meals[0].strArea}
            // Here's how to make it: ${res.data.meals[0].strYoutube}

            // `

            if (res.data.meals[0].strMeal) {
                await context.reply(res.data.meals[0].strMeal)
            }

            if (res.data.meals[0].strTags) {
                await context.reply("Classified as: " + res.data.meals[0].strTags)
            }
            if (res.data.meals[0].strArea) {
                await context.reply("Origin: " + res.data.meals[0].strArea)
            }
            if (res.data.meals[0].strYoutube) {
                await context.reply("Heres how to make it: " + res.data.meals[0].strYoutube)
            }
            if (res.data.meals[0].strMealThumb) {
                await context.reply(res.data.meals[0].strMealThumb)
            }
        })
        
        .catch(err => console.log(err))
});

bot.launch();

process.once("SIGNIT", () => bot.stop("SIGNIT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

