import httpService from "./http.service";

const favoritesEndPoint = "favorites/"

const favoritesService = {
	post: async (favoriteItem) => {
		const { data } = await httpService.post(
			favoritesEndPoint,
			favoriteItem
		);
		console.log(data)
		return data
	},

	get: async () => {
		const { data } = await httpService.get(favoritesEndPoint)
		return data
	},

	delete: async (id) => {
		const { data } = await httpService.delete(favoritesEndPoint + id)
		console.log(data)
		return data
	},
};

export default favoritesService