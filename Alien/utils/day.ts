import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
// 只能选择比今天之前的日期
export const disabledLessthan = (current: Dayjs) => {
  return current && current > dayjs().subtract(1, "day");
};
// 只能选择比今天之后的日期
export const disabledMorethan = (current: Dayjs) => {
  return current && current < dayjs().startOf("day");
};

export default {
  Less: disabledLessthan,
  More: disabledMorethan,
};

//根据小时，问候语

export const Hour = dayjs().hour();

export const WereCom = () => {
  if (6 < Hour && Hour < 11) {
    return "早上好";
  } else if (11 <= Hour && Hour < 15) {
    return "中午好";
  } else if (15 <= Hour && Hour < 18) {
    return "下午好";
  } else {
    return "晚上好";
  }
};
