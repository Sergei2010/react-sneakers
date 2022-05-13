import React from 'react';
import axios from 'axios';
import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])  // корзина
  const [searchValue, setSearchValue] = React.useState('') // поиск
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    /* fetch('https://627cea9fbf2deb7174e3c0c2.mockapi.io/items')
      .then((res) => { return res.json() })
      .then((json) => setItems(json)) */
    axios.get('https://627cea9fbf2deb7174e3c0c2.mockapi.io/items')
      .then((res) => setItems(res.data))
    axios.get('https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart')
      .then((res) => setCartItems(res.data))
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart', obj)  // добавляю в корзину  mockApi
    setCartItems((prev) => [...prev, obj])
  }
  /*  console.log(cartItems) */

  const onRemoveItem = (id) => {
    /* console.log(id) */
    /* axios.delete(`https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart/${id}`) */  // удаляю из корзины   mockApi
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="wrapper clear">
      { cartOpened && <Drawer items={ cartItems } onClose={ () => setCartOpened(false) } onRemove={ onRemoveItem } /> }
      <Header onClickCart={ () => setCartOpened(true) } />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{ searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки' }</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            { searchValue && <img onClick={ () => setSearchValue('') } className="clear cu-p" src="/img/btn-remove.svg" alt="Clear" /> }
            <input type="text" placeholder="Поиск ..." onChange={ onChangeSearchInput } value={ searchValue } />
          </div>
        </div>
        <div className="d-flex flex-wrap mb-30">
          { items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, i) =>
            <Card
              key={ i }
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
