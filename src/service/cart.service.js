import httpService from "./http.service"

const cartEndPoint = "cart/"

const cartService = {
	get: async () => {
		const { data } = await httpService.get(cartEndPoint)
		return data
	},
	post: async (item) => {
		const { data } = await httpService.post(cartEndPoint, item)

		return data
	},
	delete: async (id) => {
		const { data } = await httpService.delete(cartEndPoint + id)
		return data
	},
};

export default cartService