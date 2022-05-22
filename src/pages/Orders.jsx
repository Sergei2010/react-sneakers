import React from 'react'
import axios from 'axios'

import Card from '../components/Card'
//import AppContext from '../context'

function Orders() {
	/* 	const { onAddToFavorite, onAddToCart } = React.useContext(AppContext) */
	const [orders, setOrders] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)
	// асинхронная анонимная ф-ия
	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get('https://627cea9fbf2deb7174e3c0c2.mockapi.io/orders')
				// массив массивов -> один массив
				// console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []))
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
				setIsLoading(false)
			} catch (error) {
				alert('Ошибка призапросе заказов')
				console.error(error)
			}
		})()
	}, []);
	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>
					Мои заказы
				</h1>
			</div>
			<div className="d-flex flex-wrap mb-30">
				{ (isLoading ? [...Array(8)] : orders).map((item, i) =>
					<Card
						key={ i }
						loading={ isLoading }
						{ ...item }
					/>) }
			</div>
		</div>
	)
}

export default Orders