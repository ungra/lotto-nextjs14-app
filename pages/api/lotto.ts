import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { drwNo } = req.query;
  if (!drwNo) {
    res.status(400).json({ error: "Missing required parameter: drwNo" });
    return;
  }
  try {
    const response = await fetch(
      `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`
    );
    if (!response.ok) {
      throw new Error(`Fail to fetch lotto data for the round: ${drwNo}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
