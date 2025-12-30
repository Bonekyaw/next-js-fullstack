import { connection } from "next/server";

async function DateShow() {
  await connection();

  const time = new Date().toLocaleTimeString();
  return <div>{time}</div>;
}

export default DateShow;
