import React from 'react'

import ordersService from '../service/orders.service'
import Card from '../components/Card'

function Orders() {
	const [orders, setOrders] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)
	// асинхронная анонимная ф-ия
	React.useEffect(() => {
		(async () => {
			try {
				await ordersService.get().then((res) => {
					// массив массивов -> один массив
					setOrders(res.reduce((prev, obj) => [...prev, ...obj.items], []))
					setIsLoading(false)
				})
			} catch (error) {
				alert('Ошибка при запросе заказов')
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