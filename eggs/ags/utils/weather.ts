import { GLib, property, readFile } from "astal";
import { GObject, register } from "astal";
import { execAsync, interval } from "astal";
import options from "../options";

export type weathersProps = {
	city: string,
	country: string,
	main: string,
	desc: string
}

const { weathers } = options;

const apiKey = readFile(`${GLib.get_user_config_dir()}/ags/utils/apikey.txt`).trim()

@register({ GTypeName: "Weather" })
export class Weather extends GObject.Object {
	static instance: Weather
	static get_default() {
		if (!this.instance)
			this.instance = new Weather()
		return this.instance
	}

	#weathers: Array<weathersProps> = []

	@property(Object)
	get weathers() { return this.#weathers }

	constructor() {
		super()

		interval(weathers.update_interval * 60 * 1000, () => {
			this.#weathers = []
			weathers.code.map((w) => {
				execAsync([
					"curl",
					`https://api.openweathermap.org/data/2.5/weather?id=${w}&appid={${apiKey}}&unit=metric`,
				])
					.then((res) => {
						const parseRes = JSON.parse(res);
						this.#weathers.push({
							city: parseRes.name,
							country: parseRes.sys.country,
							main: parseRes.weather[0].main,
							desc: parseRes.weather[0].description,
						})
						this.notify("weathers")
					})
					.catch((err) => console.log(err))
			})
		}

		);

	}

}


