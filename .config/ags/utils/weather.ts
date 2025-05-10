import { execAsync, interval, Variable } from "astal";

export const weatherApi = Variable({
  city: "",
  country: "",
  main: "",
  desc: "",
});

interval(1800 * 1000, () =>
  execAsync([
    "curl",
    "http://api.openweathermap.org/data/2.5/weather?id=1850147&appid={2348cf874fa8d95bc293b85af4209286}",
  ])
    .then((res) => {
      const parseRes = JSON.parse(res);
      weatherApi.set({
        city: parseRes.name,
        country: parseRes.sys.country,
        main: parseRes.weather[0].main,
        desc: parseRes.weather[0].description,
      });
    })
    .catch((err) => console.log(err)),
);
