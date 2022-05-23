import React from 'react'

import { useCart } from '../../hooks/useCart'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'

function Header(props) {
	const { totalPrice } = useCart()
	return (
		<header className={ styles.header + ' d-flex justify-between align-center p-40 + styles' } >
			<div className="d-flex align-center">
				<Link to="/">
					<div className="d-flex align-center">
						<img width={ 40 } height={ 40 } src="img/logo.png" alt="Logotype" />
						<div>
							<h3 className="text-uppercase">React Sneakers</h3>
							<p className="opacity-5">Магазин лучших кроссовок</p>
						</div>
					</div>
				</Link>
			</div>
			<ul className="d-flex">
				<li className="mr-30 cu-p" onClick={ props.onClickCart }>
					<img width={ 18 } heigth={ 18 } src="img/cart.svg" alt="Cart" />
					<span>{ totalPrice } руб.</span>
				</li>
				<li>
					<Link to="/favorites">
						<img width={ 18 } height={ 18 } src="img/heart.svg" alt="Закладки" />
					</Link>
				</li>
				<li>
					<Link to="/orders">
						<img width={ 18 } heigth={ 18 } src="img/user.svg" alt="User" />
					</Link>
				</li>
			</ul>
		</header >)
}

export default Header;