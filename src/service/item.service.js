import httpService from "./http.service"

const itemsEndPoint = "items/"

const itemService = {
	get: async () => {
		const { data } = await httpService.get(itemsEndPoint);
		return data
	},
}

export default itemService