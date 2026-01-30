// messages.js
export const MESSAGES = {
  // /go 관련
  go: {
    buttonAccept: "간다",
    buttonDecline: "못 간다",
    proposalTitle: "모일 사람 손 ㅋㅋ",
    askResponse: "가능하면 ‘간다’ 눌러주고, 안 되면 ‘못 간다’ 눌러줘.",
    statusAccept: "간다",
    statusDecline: "못 간다",
    statusPending: "아직이다",
    allAccepted: "오케이 다 된다 ㅋㅋ 그 시간에 ㄱㄱ",
    anyDeclined: "오잉 못 가는 사람 있음. 시간 다시 잡자 ㅠ",
    waitingResponse: "아직 답 안 한 사람 있다 ㅋㅋ 빨리 눌러줘",
    invalidDay:
      "날짜는 ‘오늘/내일’ 아니면 YYYY-MM-DD로 부탁 ㅋㅋ",
    invalidStart:
      "시간은 HH:MM으로 써줘. 24시는 없음! 예) 19:30",
    notRegisteredMember:
      "너 아직 명단에 없는데 ㅋㅋ 관리자한테 등록해달라 해줘",
    proposalNotFound:
      "그 약속은 못 찾겠다 ㅋㅋ 새로 잡자",
  },

  // /lunch 관련
  lunch: {
    noMenu: "메뉴 풀이 비었는데요 ㅋㅋ 뭘 좀 넣어줘",
    menuSuffix: "오늘은 이거 가자:",
    menuEnd: "고민 끝. 그냥 가자 ㅋㅋ",
  },

  // /nonsense 관련
  nonsense: {
    quizTitle: "넌센스 타임 ㅋㅋ 문제 나간다",
    answerInstruction:
      "정답은 /answer로 써줘. 맞혀봐 ㅋㅋ",
    correct: "오 맞았다 ㅋㅋㅋ 인정",
    emptyDb: "문제 DB가 비었음 ㅠ 채워줘",
    questionPosted: "문제 올림 ㅋㅋ 풀어봐",
    questionError: "문제 내다가 터짐 ㅠ 콘솔 확인 부탁",
    noQuestion: "지금 문제 없음 ㅋㅋ /nonsense부터 해줘",
    wrong: (tries) => `아니야 ㅋㅋ (${tries}/2) 다시 생각해봐`,
    revealAnswer: (question, answer) =>
      `두 번 틀림 ㅋㅋ 답 공개\n- 문제: ${question}\n- 정답: ${answer}`,
  },

  // /weather 관련
  weather: {
    question: "날씨 체크 가자 ㅋㅋ",
    error:
      "날씨 API가 삐끗함 ㅠ 도시명 다시 주거나 조금 있다가 해줘",
    morningPrefix: "오늘 날씨다 ㅋㅋ",
    coldWarning: "개춥다. 목도리/장갑 ㄱ",
    chillyWarning: "쌀쌀함. 겉옷 챙겨 ㅋㅋ",
    hotWarning: "덥다. 물 챙겨라 ㅋㅋ",
    humidWarning: "습하다… 머리 부시시 각 ㅋㅋ",
    windyWarning: "바람 세다. 모자 조심 ㅋㅋ",
    normalWarning: "무난무난. 그래도 조심해서 다녀",
  },

  // 근무 관련
  work: {
    start: (name, time) => `${name} 일 시작함 (${time})`,
    end: (name, time) => `${name} 퇴근함 (${time})`,
    scheduleTitle: "오늘 근무표 ㅋㅋ",
    scheduleItem: (name, start, end) => `- ${name}: ${start} ~ ${end}`,
    weatherPrefix: (name) => `${name} 출근 전에 날씨 한 번 보고 가자`,
    weatherTempOnly: (name, temp, feels) =>
      `${name} 30분 뒤 출근 ㅋㅋ 지금 ${temp}도(체감 ${feels}도)`,
  },

  // 콘솔 로그
  console: {
    login: (tag) => `로그인 완료: ${tag}`,
    channelIdNotSet: "CHANNEL_ID 없음. 자동 알림 스킵",
    guildIdNotSet: "GUILD_ID 없음. 근무 기능 스킵",
    workRoleSyncComplete: "근무 역할 초기 동기화 완료",
    workRoleSyncError: "근무 역할 동기화 에러:",
    workRoleToggleError: "근무 역할 토글 에러:",
    scheduleSummaryError: "일정 요약 에러:",
    weatherError: "날씨 알림 에러:",
    nonsenseDbEmpty: "넌센스 DB 비었음",
    nonsenseAutoError: "넌센스 자동 출제 에러:",
    commandRegisterComplete:
      "커맨드 등록 완료: /lunch /nonsense /answer /weather /go /사주",
    clientIdError: "CLIENT_ID 없음 (.env 확인)",
    channelIdError: "CHANNEL_ID 없음 (.env 확인)",
    guildIdError: "GUILD_ID 없음 (.env 확인)",
  },

  // 커맨드 등록 관련
  commands: {
    lunch: {
      name: "lunch",
      description: "점심/저녁/간식 하나 찍어준다 ㅋㅋ",
      typeDescription: "뭐 먹을래? (기본: 점심)",
      typeLunch: "점심",
      typeDinner: "저녁",
      typeSnack: "간식",
    },
    nonsense: {
      name: "nonsense",
      description: "넌센스 문제 하나 낸다 ㅋㅋ",
    },
    answer: {
      name: "answer",
      description: "넌센스 정답 적는 곳",
      textDescription: "정답",
    },
    weather: {
      name: "weather",
      description: "지금 날씨 알려준다 ㅋㅋ",
      cityDescription:
        "도시명 (예: Seoul, Busan). 안 넣으면 기본 도시 사용",
    },
    go: {
      name: "go",
      description: "시간 하나 잡고 수락/거절만 받는다 ㅋㅋ",
      startDescription: "시작시간 (HH:MM) 예: 19:30",
      dayDescription: "오늘/내일/YYYY-MM-DD (안 적으면 오늘)",
    },
    saju: {
      name: "사주",
      description: "사주 한 번 봐준다 ㅋㅋ 생년월시 넣어줘",
      birthDescription:
        "생년월일·시각 (YYYY-MM-DDTHH:mm:ss, 대문자 T 필수) 예: 1990-01-01T01:00:00",
      genderDescription: "성별",
      genderMale: "남성",
      genderFemale: "여성",
      cityDescription: "태어난 도시 (안 넣으면 서울)",
      calendarDescription: "양력/음력 (기본: 양력)",
      calendarSolar: "양력",
      calendarLunar: "음력",
      calendarLeap: "윤달",
      midnightTypeDescription:
        "자시 처리 (0: 야자/조자 분리, 1: 정자시). 기본 0",
      midnightType0: "야자/조자 분리",
      midnightType1: "정자시(23~00:59 익일)",
    },
  },

  // /사주 관련
  saju: {
    invalidBirth:
      "생년월시는 YYYY-MM-DDTHH:mm:ss 형식으로 부탁! (대문자 T 필수)",
    invalidGender: "성별은 남성/여성만 가능",
    apiKeyError:
      "SAJU_API_KEY가 없음 ㅠ .env 확인해줘",
    apiError:
      "사주 API가 응답이 이상함 ㅠ 형식 확인하거나 잠깐 뒤에 다시 해줘",
    sinsalBeta: "신살(베타): 포함",
  },

  // 날짜/시간 관련
  date: {
    today: "오늘",
    tomorrow: "내일",
    dateLabel: "날짜",
    startLabel: "시작",
  },

  // 식사 타입
  meal: {
    lunch: "점심",
    dinner: "저녁",
    snack: "간식",
  },

  // 날씨 상세 + 잔소리 자동 분기
  weatherDetail: {
    weatherInfo: "지금 날씨",
    weatherFormat: (name, desc, temp, feels, hum, wind) => {
      const lines = [];
      lines.push(`${name} 현재 날씨`);
      lines.push(`${desc} / ${temp}도 (체감 ${feels}도)`);
      lines.push(`습도 ${hum}% · 바람 ${wind}m/s`);

      // 톡 말투로 짧게
      if (feels <= 0) lines.push("개춥다 ㅋㅋ 내복 ㄱ");
      else if (feels <= 5) lines.push("춥다… 겉옷 두껍게");
      else if (feels <= 10) lines.push("쌀쌀함. 바람 조심");

      if (temp >= 30) lines.push("덥다. 물 챙겨");
      else if (temp >= 26) lines.push("좀 더움. 시원하게 입자");

      if (hum >= 80) lines.push("습함… 찝찝 각 ㅋㅋ");
      if (wind >= 8) lines.push("바람 미쳤다 조심");
      else if (wind >= 5) lines.push("바람 좀 붐");

      if (lines.length <= 3) lines.push("무난무난. 잘 다녀와 ㅋㅋ");
      return lines.join("\n");
    },
    apiKeyError:
      "WEATHER_API_KEY가 없음 ㅠ .env 확인해줘",
  },

  // 넌센스 퀴즈 관련
  nonsenseDetail: {
    problemLabel: "문제",
    correctPersonLabel: "정답자",
    answerLabel: "정답",
  },
};
