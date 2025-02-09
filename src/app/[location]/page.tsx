import HomeButton from "../components/HomeButton";
import { getForecast } from "../utils/getForecast";

type Props = {
  params: Promise<{
    location: string;
  }>;
  searchParams: Promise<{
    name: string;
  }>;
};

export async function generateMetadata({ searchParams }: Props) {
  const { name } = await searchParams;
  return {
    title: `날씨 앱 - ${name}`,
    description: `${name} 날씨를 알려줍니다.`,
  };
}

export default async function Detail({ params, searchParams }: Props) {
  const { name } = await searchParams;

  const res = await getForecast((await params).location);

  return (
    <>
      <h1>{name}의 3일 예보</h1>
      <ul>
        {res.forecast.forecastday.map((day) => (
          <li key={day.date}>
            {day.date} / {day.day.avgtemp_c}
          </li>
        ))}
      </ul>
      <HomeButton />
    </>
  );
}
