import styles from './Drawer.module.scss'

function imgStyle(style) {
	return style + " cu-p"
}
function itemStyle(style) {
	return style + " d-flex align-center mb-20"
}

function Drawer({ onClose, items = [] }) {
	/* 	console.log(props) <- ERROR ?? */
	/* 	console.log(items) <- ERROR ?? */
	return (
		<div className={ styles.overlay }>
			<div className={ styles.drawer }>
				<h2 className="mb-30 d-flex justify-between align-center">
					Корзина <img className={ imgStyle(styles.removeBtn) } src="/img/btn-remove.svg" alt="Close" onClick={ onClose } />
				</h2>
				<div className={ styles.items }>
					{ items.map((obj) => (
						<div className={ itemStyle(styles.cartItem) }>
							<div style={ { backgroundImage: `url(${obj.imageUrl})` } } className={ styles.cartItemImg }>
							</div>
							<div className="mr-20 flex">
								<p className="mb-5">{ obj.title }</p>
								<b>{ obj.price } руб.</b>
							</div>
							<img className={ imgStyle(styles.removeBtn) } src="/img/btn-remove.svg" alt="Remove" />
						</div>
					)) }
					{/* 	<div className={ itemStyle(styles.cartItem) }>
						<div style={ { backgroundImage: 'url(/img/sneakers/1.jpg)' } } className={ styles.cartItemImg }></div>
						<div className="mr-20 flex">
							<p className="mb-5">Мужские кроссовки Nike Blazer Mid Suede</p>
							<b>12999 руб.</b>
						</div>
						<img className={ imgStyle(styles.removeBtn) } src="/img/btn-remove.svg" alt="Remove" />
					</div>
					<div className={ itemStyle(styles.cartItem) }>
						<div style={ { backgroundImage: 'url(/img/sneakers/1.jpg)' } } className={ styles.cartItemImg }></div>
						<div className="mr-20 flex">
							<p className="mb-5">Мужские кроссовки Nike Blazer Mid Suede</p>
							<b>12999 руб.</b>
						</div>
						<img className={ imgStyle(styles.removeBtn) } src="/img/btn-remove.svg" alt="Remove" />
					</div> */}
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
			</div>
		</div >
	)
}

export default Drawer