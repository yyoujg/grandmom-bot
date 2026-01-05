import "dotenv/config";
import { REST, Routes, SlashCommandBuilder } from "discord.js";

const commands = [
  new SlashCommandBuilder()
    .setName("lunch")
    .setDescription("점심 메뉴를 랜덤으로 추천합니다."),
  new SlashCommandBuilder()
    .setName("weather")
    .setDescription("현재 날씨를 조회합니다.")
    .addStringOption((o) =>
      o.setName("city").setDescription("도시명 (예: Seoul, Busan) 미입력 시 기본 도시")
    ),

  // ====== [추가] /game ======
  new SlashCommandBuilder()
    .setName("game")
    .setDescription("유정/영진/명재 공통 게임 가능 시간을 확인합니다.")
    .addStringOption((o) =>
      o
        .setName("mode")
        .setDescription("조회 모드")
        .addChoices(
          { name: "오늘", value: "today" },
          { name: "이번 주", value: "week" }
        )
    ),
].map((c) => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
  body: commands,
});

console.log("✅ /lunch, /weather, /game 등록 완료");
