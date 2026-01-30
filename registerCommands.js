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

  // /사주
  new SlashCommandBuilder()
    .setName(MESSAGES.commands.saju.name)
    .setDescription(MESSAGES.commands.saju.description)
    .addStringOption((o) =>
      o
        .setName("birth")
        .setDescription(MESSAGES.commands.saju.birthDescription)
        .setRequired(true)
    )
    .addStringOption((o) =>
      o
        .setName("gender")
        .setDescription(MESSAGES.commands.saju.genderDescription)
        .setRequired(true)
        .addChoices(
          { name: MESSAGES.commands.saju.genderMale, value: "male" },
          { name: MESSAGES.commands.saju.genderFemale, value: "female" }
        )
    )
    .addStringOption((o) =>
      o
        .setName("city")
        .setDescription(MESSAGES.commands.saju.cityDescription)
        .setRequired(false)
    )
    .addStringOption((o) =>
      o
        .setName("calendar")
        .setDescription(MESSAGES.commands.saju.calendarDescription)
        .setRequired(false)
        .addChoices(
          { name: MESSAGES.commands.saju.calendarSolar, value: "solar" },
          { name: MESSAGES.commands.saju.calendarLunar, value: "lunar" },
          { name: MESSAGES.commands.saju.calendarLeap, value: "leap" }
        )
    )
    .addIntegerOption((o) =>
      o
        .setName("midnighttype")
        .setDescription(MESSAGES.commands.saju.midnightTypeDescription)
        .setRequired(false)
        .addChoices(
          { name: MESSAGES.commands.saju.midnightType0, value: 0 },
          { name: MESSAGES.commands.saju.midnightType1, value: 1 }
        )
    ),
].map((c) => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

if (!process.env.CLIENT_ID) throw new Error(MESSAGES.console.clientIdError);
if (!process.env.GUILD_ID) throw new Error(MESSAGES.console.guildIdError);

await rest.put(
  Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
  { body: commands }
);

console.log(MESSAGES.console.commandRegisterComplete);
