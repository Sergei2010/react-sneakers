import React from 'react'

import cartService from "../../service/cart.service"
import ordersService from "../../service/orders.service"
import Info from '../../components/Info'
import { useCart } from '../../hooks/useCart'

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [], opened }) {
	const { cartItems, setCartItems, totalPrice } = useCart()
	const [orderId, setOrderId] = React.useState(null)
	const [isOrderComplete, setIsOrderComplete] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			await ordersService
				.post({ items: cartItems })
				.then((res) => setOrderId(res.id))
			setIsOrderComplete(true)
			setCartItems([])

			// 'костыль' для MockApi
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i]
				await cartService.delete(item.id)
				await delay(1000)
			}
		} catch (error) {
			alert('Ошибка при создании заказа :(');
		}
		setIsLoading(false)
	}

	return (
		<div className={ `${styles.overlay} ${opened ? styles.overlayVisible : ''}` }>
			<div className={ styles.drawer }>
				<h2 className="mb-30 d-flex justify-between align-center">
					Корзина <img className={ styles.removeBtn + ' cu-p' } src="/img/btn-remove.svg" alt="Close" onClick={ onClose } />
				</h2>
				{
					items.length > 0 ? (
						<div className="d-flex flex-column flex">
							<div className={ styles.items }>
								{ items.map((obj) => (
									<div key={ obj.id } className={ styles.cartItem + ' d-flex align-center mb-20' }>
										<div style={ { backgroundImage: `url(${obj.imageUrl})` } } className={ styles.cartItemImg }>
										</div>
										<div className="mr-20 flex">
											<p className="mb-5">{ obj.title }</p>
											<b>{ obj.price } руб.</b>
										</div>
										<img onClick={ () => onRemove(obj.id) } className={ styles.removeBtn + ' cu-p' } src="/img/btn-remove.svg" alt="Remove" />
									</div>
								)) }
							</div>
							<div className={ styles.cartTotalBlock }>
								<ul>
									<li>
										<span>Итого:</span>
										<div></div>
										<b>{ totalPrice } руб.</b>
									</li>
									<li>
										<span>Налог 5%:</span>
										<div></div>
										<b>{ Math.round(totalPrice * 5) / 100 } руб.</b>
									</li>
								</ul>
								<button disabled={ isLoading } onClick={ onClickOrder } className={ styles.greenButton }>Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
							</div>
						</div>
					)
						:
						(
							<Info
								title={ isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая' }
								description={ isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан службе курьерской доставки` : 'Добавьте хотя бы одну пару кроссовок' }
								image={ isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg' } />
						)
				}
			</div>
		</div >
	)
}

export default Drawer