import { cookies } from "next/headers";
import { getJwtData } from "./jwtFunctions";
import { query } from "./query";
import { User } from "./schema";

export async function getUserData(userID?: number) {
  if (userID) {
    const rawData = await query(`SELECT * FROM users where id=?`, [userID]);
    const parsedData = User.safeParse(rawData[0]);
    if (parsedData.success === false) throw new Error("Does Not Exist");
    else return parsedData.data;
  } else {
    const token = cookies().get("token");
    if (!token) throw new Error("Unauthorized");
    const jwtData = await getJwtData(token.value);

    const rawData = await query(`SELECT * FROM users where id=?`, [jwtData.id]);
    const parsedData = User.safeParse(rawData[0]);
    if (parsedData.success === false) throw new Error("Unauthorized");
    else return parsedData.data;
  }
}
