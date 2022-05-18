import React from 'react'
import axios from 'axios'

import styles from './Drawer.module.scss'
import Info from '../../components/Info'
import AppContext from '../../context'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [], opened }) {
	const { cartItems, setCartItems } = React.useContext(AppContext)
	const [orderId, setOrderId] = React.useState(null)
	const [isOrderComplete, setIsOrderComplete] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post('https://627cea9fbf2deb7174e3c0c2.mockapi.io/orders', {
				items: cartItems,
			})
			setOrderId(data.id)
			setIsOrderComplete(true)
			setCartItems([])

			// костыль для MockApi
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete('https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart/' + item.id);
				await delay(1000);
			}
		} catch (error) {
			alert('Ошибка при создании заказа :(');
		}
		setIsLoading(false)
	}

	return (
		<div className={ styles.overlay }>
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
										<b>21498 руб.</b>
									</li>
									<li>
										<span>Налог 5%:</span>
										<div></div>
										<b>1074 руб.</b>
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