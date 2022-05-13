import styles from './Drawer.module.scss'

function imgStyle(style) {
	return style + " cu-p"
}
function itemStyle(style) {
	return style + " d-flex align-center mb-20"
}

function Drawer({ onClose, onRemove, items = [] }) {
	/* 	console.log(props) <- ERROR ?? */
	/* 	console.log(items) <- ERROR ?? */
	return (
		<div className={ styles.overlay }>
			<div className={ styles.drawer }>
				<h2 className="mb-30 d-flex justify-between align-center">
					Корзина <img className={ imgStyle(styles.removeBtn) } src="/img/btn-remove.svg" alt="Close" onClick={ onClose } />
				</h2>

				{
					items.length > 0 ? (
						<>
							<div className={ styles.items }>
								{ items.map((obj) => (
									<div key={ obj.id } className={ itemStyle(styles.cartItem) }>
										<div style={ { backgroundImage: `url(${obj.imageUrl})` } } className={ styles.cartItemImg }>
										</div>
										<div className="mr-20 flex">
											<p className="mb-5">{ obj.title }</p>
											<b>{ obj.price } руб.</b>
										</div>
										<img onClick={ () => onRemove(obj.id) } className={ imgStyle(styles.removeBtn) } src="/img/btn-remove.svg" alt="Remove" />
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
								<button className="green-button">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
							</div>
						</>
					)
						:
						(
							<div className="cartEmpty d-flex align-center justify-center flex-column flex">
								<img className="mb-20" width="120px" src='/img/empty-cart.jpg' alt="Empty" />
								<h2>Корзина пустая</h2>
								<p className="opacity-6">Добавьте хотя бы одну пару кроссовок</p>
								<button className="green-button">
									<img src="img/arrow.svg" alt="Arrow" />
									Вернуться назад
								</button>
							</div>
						)
				}

				{/* 	<div className="cartEmpty d-flex align-center justify-center flex-column flex">
					<img className="mb-20" width="120px" src='/img/empty-cart.jpg' alt="Empty" />
					<h2>Корзина пустая</h2>
					<p className="opacity-6">Добавьте хотя бы одну пару кроссовок</p>
					<button className="green-button">
						<img src="img/arrow.svg" alt="Arrow" />
						Вернуться назад
					</button>
				</div> */}

				{/* <div className={ styles.items }>
					{ items.map((obj) => (
						<div className={ itemStyle(styles.cartItem) } key={ obj.id }>
							<div style={ { backgroundImage: `url(${obj.imageUrl})` } } className={ styles.cartItemImg }>
							</div>
							<div className="mr-20 flex">
								<p className="mb-5">{ obj.title }</p>
								<b>{ obj.price } руб.</b>
							</div>
							<img className={ imgStyle(styles.removeBtn) } src="/img/btn-remove.svg" alt="Remove" />
						</div>
					)) }
				</div> */}
				{/* 	<div className={ styles.cartTotalBlock }>
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
					<button className="green-button">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
				</div> */}
			</div>
		</div >
	)
}

export default Drawer