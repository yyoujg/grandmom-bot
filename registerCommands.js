// registerCommands.js
import "dotenv/config";
import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { USERS, USER_KEYS } from "./data.js";

const userChoices = USER_KEYS.map((k) => ({ name: USERS[k].name, value: k }));

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

  // /busy
  new SlashCommandBuilder()
    .setName("busy")
    .setDescription("안 되는 시간(스케줄) 관리한다.")
    .addSubcommand((sc) =>
      sc
        .setName("add")
        .setDescription("안 되는 시간을 추가한다(본인만).")
        .addStringOption((o) =>
          o.setName("date").setDescription("날짜 (YYYY-MM-DD)").setRequired(true)
        )
        .addStringOption((o) =>
          o.setName("start").setDescription("시작 (HH:MM)").setRequired(true)
        )
        .addStringOption((o) =>
          o.setName("end").setDescription("끝 (HH:MM)").setRequired(true)
        )
        .addStringOption((o) =>
          o.setName("reason").setDescription("사유(선택)")
        )
        // user는 기본적으로 숨기고 싶으면 빼도 되지만, MVP에선 선택으로 둡니다.
        .addStringOption((o) =>
          o
            .setName("user")
            .setDescription("누구 스케줄인지(선택, 기본=본인)")
            .addChoices(...userChoices)
        )
    )
    .addSubcommand((sc) =>
      sc
        .setName("list")
        .setDescription("안 되는 시간 목록을 본다.")
        .addStringOption((o) =>
          o
            .setName("user")
            .setDescription("누구 목록인지(선택, 기본=본인)")
            .addChoices(...userChoices)
        )
    )
    .addSubcommand((sc) =>
      sc
        .setName("remove")
        .setDescription("항목 1개를 삭제한다(본인만).")
        .addStringOption((o) => o.setName("id").setDescription("항목 id").setRequired(true))
    )
    .addSubcommand((sc) =>
      sc
        .setName("clear")
        .setDescription("본인 스케줄을 전부 삭제한다(본인만).")
    ),

  // /go
  new SlashCommandBuilder()
    .setName("go")
    .setDescription("몇 시에 할 건지 제안하고 수락/거절 받는다.")
    .addStringOption((o) =>
      o.setName("date").setDescription("날짜 (YYYY-MM-DD)").setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("time").setDescription("시작 (HH:MM)").setRequired(true)
    )
    .addIntegerOption((o) =>
      o.setName("duration").setDescription("몇 분 할지(기본 120분)")
    ),
].map((c) => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

await rest.put(
  Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
  { body: commands }
);

console.log("✅ /lunch, /weather, /busy, /go 등록 완료");
