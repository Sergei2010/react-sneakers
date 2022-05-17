import React from 'react'
import AppContext from '../context'
import Card from '../components/Card'

function Favorites() {
	const { favorites, onAddToFavorite } = React.useContext(AppContext)
	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>
					Мои закладки
				</h1>
			</div>
			<div className="d-flex flex-wrap mb-30">
				{ favorites.length > 0 && favorites.map((item, i) =>
					<Card
						key={ i }
						favorited={ true }
						onFavorite={ onAddToFavorite }
						{ ...item }
					/>) }
			</div>
		</div>
	)
}

export default Favorites