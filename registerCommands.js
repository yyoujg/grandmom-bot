// registerCommands.js
import "dotenv/config";
import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { MESSAGES } from "./messages.js";

const commands = [
  // /lunch
  new SlashCommandBuilder()
    .setName(MESSAGES.commands.lunch.name)
    .setDescription(MESSAGES.commands.lunch.description)
    .addStringOption((o) =>
      o
        .setName("type")
        .setDescription(MESSAGES.commands.lunch.typeDescription)
        .setRequired(false)
        .addChoices(
          { name: MESSAGES.commands.lunch.typeLunch, value: "lunch" },
          { name: MESSAGES.commands.lunch.typeDinner, value: "dinner" },
          { name: MESSAGES.commands.lunch.typeSnack, value: "snack" }
        )
    ),

  // /nonsense
  new SlashCommandBuilder()
    .setName(MESSAGES.commands.nonsense.name)
    .setDescription(MESSAGES.commands.nonsense.description),

  // /answer
  new SlashCommandBuilder()
    .setName(MESSAGES.commands.answer.name)
    .setDescription(MESSAGES.commands.answer.description)
    .addStringOption((o) =>
      o.setName("text").setDescription(MESSAGES.commands.answer.textDescription).setRequired(true)
    ),

  // /weather
  new SlashCommandBuilder()
    .setName(MESSAGES.commands.weather.name)
    .setDescription(MESSAGES.commands.weather.description)
    .addStringOption((o) =>
      o
        .setName("city")
        .setDescription(MESSAGES.commands.weather.cityDescription)
        .setRequired(false)
    ),

  // /go (시작시간만)
  new SlashCommandBuilder()
    .setName(MESSAGES.commands.go.name)
    .setDescription(MESSAGES.commands.go.description)
    // required 먼저
    .addStringOption((o) =>
      o.setName("start").setDescription(MESSAGES.commands.go.startDescription).setRequired(true)
    )
    // optional 나중
    .addStringOption((o) =>
      o.setName("day").setDescription(MESSAGES.commands.go.dayDescription).setRequired(false)
    ),
].map((c) => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

if (!process.env.CLIENT_ID) throw new Error(MESSAGES.console.clientIdError);
if (!process.env.CHANNEL_ID) throw new Error(MESSAGES.console.channelIdError);

await rest.put(
  Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.CHANNEL_ID),
  { body: commands }
);

console.log(MESSAGES.console.commandRegisterComplete);
