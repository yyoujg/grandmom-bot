import "dotenv/config";
import { REST, Routes, SlashCommandBuilder } from "discord.js";

const commands = [
  new SlashCommandBuilder()
    .setName("lunch")
    .setDescription("할매가 점심 하나 골라준다."),

  new SlashCommandBuilder()
    .setName("weather")
    .setDescription("할매가 지금 날씨 알려준다.")
    .addStringOption((o) =>
      o.setName("city").setDescription("도시명 (예: Seoul, Busan) 안 넣으면 기본 도시")
    ),

  new SlashCommandBuilder()
    .setName("game")
    .setDescription("할매가 셋이 같이 되는 게임 시간을 딱 정리해준다.")
    .addStringOption((o) =>
      o
        .setName("mode")
        .setDescription("뭘로 볼래")
        .addChoices(
          { name: "오늘", value: "today" },
          { name: "이번 주", value: "week" }
        )
    ),
].map((c) => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

await rest.put(
  Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
  { body: commands }
);

console.log("✅ 할매 커맨드(/lunch, /weather, /game) 등록 완료");
