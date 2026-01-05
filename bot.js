import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import cron from "node-cron";
import { LUNCH, SCHEDULE } from "./data.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ====== [게임 스케줄 유틸] ======
const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const WEEKDAYS_KR = { sun: "일", mon: "월", tue: "화", wed: "수", thu: "목", fri: "금", sat: "토" };

function toMin(t) {
  // "HH:MM" -> minutes
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function fromMin(n) {
  const h = String(Math.floor(n / 60)).padStart(2, "0");
  const m = String(n % 60).padStart(2, "0");
  return `${h}:${m}`;
}

// "24:00" 같은 표현 처리: 1440으로 취급
function normalizeTime(t) {
  return t === "24:00" ? 1440 : toMin(t);
}

function mergeIntervals(intervals) {
  if (!intervals.length) return [];
  const sorted = intervals
    .map(([s, e]) => [normalizeTime(s), normalizeTime(e)])
    .sort((a, b) => a[0] - b[0]);

  const merged = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const [s, e] = sorted[i];
    const last = merged[merged.length - 1];
    if (s <= last[1]) last[1] = Math.max(last[1], e);
    else merged.push([s, e]);
  }
  return merged;
}

function subtractIntervals(base, busy) {
  // base: [[startMin,endMin]] , busy: [[startMin,endMin]]
  const result = [];
  let i = 0;

  for (const [bs, be] of base) {
    let curS = bs;
    while (i < busy.length && busy[i][1] <= curS) i++;

    let j = i;
    while (j < busy.length && busy[j][0] < be) {
      const [xs, xe] = busy[j];
      if (xs > curS) result.push([curS, Math.min(xs, be)]);
      curS = Math.max(curS, xe);
      if (curS >= be) break;
      j++;
    }
    if (curS < be) result.push([curS, be]);
  }
  return result;
}

function intersectIntervals(a, b) {
  const res = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    const s = Math.max(a[i][0], b[j][0]);
    const e = Math.min(a[i][1], b[j][1]);
    if (s < e) res.push([s, e]);
    if (a[i][1] < b[j][1]) i++;
    else j++;
  }
  return res;
}

function formatIntervals(intervals) {
  if (!intervals.length) return "없음";
  return intervals
    .map(([s, e]) => `${fromMin(s)}~${e === 1440 ? "24:00" : fromMin(e)}`)
    .join(", ");
}

function getDailyFree(personKey, weekdayKey) {
  const busyRaw = SCHEDULE[personKey]?.weeklyBusy?.[weekdayKey] ?? [];
  const busy = mergeIntervals(busyRaw);
  const dayBase = [[0, 1440]];
  const free = subtractIntervals(dayBase, busy);
  return { busy, free };
}

function computeCommonFree(weekdayKey) {
  const people = Object.keys(SCHEDULE);
  // 시작은 "하루 전체 가능"에서 시작
  let common = [[0, 1440]];
  for (const p of people) {
    const { free } = getDailyFree(p, weekdayKey);
    common = intersectIntervals(common, free);
    if (!common.length) break;
  }
  return common;
}

// ...위 코드 동일

function buildTodayMessage(date = new Date()) {
  const wd = WEEKDAYS[date.getDay()];
  const wdKr = WEEKDAYS_KR[wd];

  const lines = [];
  lines.push(`📅 오늘(${wdKr}) 게임 시간 보자꾸나`);

  for (const key of Object.keys(SCHEDULE)) {
    const name = SCHEDULE[key].name;
    const { free } = getDailyFree(key, wd);
    lines.push(`- ${name}: ${formatIntervals(free)}`);
  }

  const common = computeCommonFree(wd);
  lines.push(`\n✅ 셋이 같이 되는 시간: ${formatIntervals(common)}`);

  // 공통 시간이 없을 때 한 줄 더
  if (!common.length) {
    lines.push(`할매가 보기엔 오늘은 각자 쉬는 게 낫겠다.`);
  }

  return lines.join("\n");
}

function buildWeekMessage() {
  const lines = [];
  lines.push(`📆 이번 주에 셋이 같이 되는 시간만 추려줄게`);

  for (const wd of ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]) {
    const common = computeCommonFree(wd);
    lines.push(`- ${WEEKDAYS_KR[wd]}: ${formatIntervals(common)}`);
  }

  lines.push(`\n필요하면 “오늘”로 다시 물어봐라. 할매가 딱 정리해준다.`);
  return lines.join("\n");
}

// ...fetchWeather 동일

client.once("ready", () => {
  console.log(`✅ 로그인: ${client.user.tag}`);

  cron.schedule(
    "0 7 * * *",
    async () => {
      try {
        const channelId = process.env.WEATHER_CHANNEL_ID;
        if (!channelId) return console.warn("WEATHER_CHANNEL_ID 미설정");
        const ch = await client.channels.fetch(channelId);

        const msg = await fetchWeather(process.env.WEATHER_DEFAULT_CITY);
        await ch.send(`🌤️ 할매 아침 날씨다\n${msg}\n밖에 나가면 옷 챙겨라.`);
      } catch (e) {
        console.error("날씨 알림 오류:", e);
      }
    },
    { timezone: "Asia/Seoul" }
  );
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "lunch") {
    const menu = pick(LUNCH);
    await interaction.reply(`🍚 점심은 이거 먹어라: **${menu}**\n고민은 여기서 끝.`);
    return;
  }

  if (interaction.commandName === "weather") {
    await interaction.deferReply();
    try {
      const city =
        interaction.options.getString("city") ||
        process.env.WEATHER_DEFAULT_CITY ||
        "Seoul";
      const msg = await fetchWeather(city);
      await interaction.editReply(`🌦️ 날씨 물어봤지?\n${msg}`);
    } catch (e) {
      await interaction.editReply(
        "날씨가 말을 안 듣는다. 도시명을 다시 넣어보거나 잠깐 있다가 해봐라."
      );
    }
    return;
  }

  if (interaction.commandName === "game") {
    const mode = interaction.options.getString("mode") || "today";
    if (mode === "week") {
      await interaction.reply(buildWeekMessage());
      return;
    }
    await interaction.reply(buildTodayMessage());
    return;
  }
});

client.login(process.env.DISCORD_TOKEN);
