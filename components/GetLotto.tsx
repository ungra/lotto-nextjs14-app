export default async function GetLotto(round: string) {
  try {
    const response = await fetch(
      `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${round}`
    );
    const json = await response.json();
    return json;
    if (!response.ok) {
      throw new Error(`Fail to fetch a lotto data for the round: ${round}`);
    }
  } catch (error) {
    console.log(error);
  }
}
