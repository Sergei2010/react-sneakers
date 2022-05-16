import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Drawer from './components/Drawer'

import Home from './pages/Home';
import Favorites from './pages/Favorites'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])  // корзина
  const [searchValue, setSearchValue] = React.useState('') // поиск
  const [cartOpened, setCartOpened] = React.useState(false) // открытие корзины
  const [favorites, setFavorites] = React.useState(false) // массив закладок

  React.useEffect(() => {
    /* fetch('https://627cea9fbf2deb7174e3c0c2.mockapi.io/items')
      .then((res) => { return res.json() })
      .then((json) => setItems(json)) */
    axios.get('https://627cea9fbf2deb7174e3c0c2.mockapi.io/items')
      .then((res) => setItems(res.data))
    axios.get('https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart')
      .then((res) => setCartItems(res.data))
    axios.get('https://627cea9fbf2deb7174e3c0c2.mockapi.io/favorites')
      .then((res) => setFavorites(res.data))
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart', obj)  // добавляю в корзину  mockApi
    setCartItems((prev) => [...prev, obj])
  }
  /*  console.log(cartItems) */

  const onRemoveItem = (id) => {
    /* console.log(id) */
    axios.delete(`https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart/${id}`)  // удаляю из корзины   mockApi
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://627cea9fbf2deb7174e3c0c2.mockapi.io/favorites/${obj.id}`)
        /* setFavorites((prev) => prev.filter((item) => item.id !== obj.id)) */
      } else {
        const { data } = await axios.post('https://627cea9fbf2deb7174e3c0c2.mockapi.io/favorites', obj)  // добавляю в корзину  mockApi
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
    }
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="wrapper clear">
      { cartOpened && <Drawer items={ cartItems } onClose={ () => setCartOpened(false) } onRemove={ onRemoveItem } /> }
      <Header onClickCart={ () => setCartOpened(true) } />
      <Routes>
        <Route path="/" exact element={
          <Home
            items={ items }
            searchValue={ searchValue }
            setSearchValue={ setSearchValue }
            onChangeSearchInput={ onChangeSearchInput }
            onAddToFavorite={ onAddToFavorite }
            onAddToCart={ onAddToCart }
          /> }
        />
        <Route path="/favorites" exact element={
          <Favorites items={ favorites } onAddToFavorite={ onAddToFavorite } /> }
        />
      </Routes>
    </div>
  );
}

export default App;
