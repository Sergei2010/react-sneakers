import React from 'react';
import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    fetch('https://627cea9fbf2deb7174e3c0c2.mockapi.io/items')
      .then((res) => { return res.json() })
      .then((json) => setItems(json))
  }, [])

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj])
  }
  console.log(cartItems)
  return (
    <div className="wrapper clear">
      { cartOpened && <Drawer items={ cartItems } onClose={ () => setCartOpened(false) } /> }
      <Header onClickCart={ () => setCartOpened(true) } />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск ..." />
          </div>
        </div>
        <div className="d-flex flex-wrap mb-30">
          { items.map((item) =>
            <Card
              title={ item.title }
              price={ item.price }
              imageUrl={ item.imageUrl }
              onFavorite={ () => console.log('Добавил в закладки') }
              onPlus={ (obj) => onAddToCart(obj) } />) }
        </div>
      </div>
    </div>
  );
}

export default App;
