import React from 'react'

import Card from "../components/Card"

function Home(
	{
		items,
		searchValue,
		setSearchValue,
		onChangeSearchInput,
		onAddToFavorite,
		onAddToCart,
		isLoading
	}
) {
	const renderItems = () => {
		const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
		return (isLoading ? [...Array(10)] : filteredItems).map((item, i) => (
			<Card
				key={ i }
				onFavorite={ (obj) => onAddToFavorite(obj) }
				onPlus={ (obj) => onAddToCart(obj) }
				loading={ isLoading }
				{ ...item }
			/>
		))
	}

	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>
					{ searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки' }
				</h1>
				<div className="searchBlock d-flex">
					<img src="img/search.svg" alt="Search" />
					{ searchValue && <img onClick={ () => setSearchValue('') } className="clear cu-p" src="img/btn-remove.svg" alt="Clear" /> }
					<input type="text" placeholder="Поиск ..." onChange={ onChangeSearchInput } value={ searchValue } />
				</div>
			</div>
			<div className="d-flex flex-wrap mb-30">
				{ renderItems() }
			</div>
		</div>
	)
}

export default Home