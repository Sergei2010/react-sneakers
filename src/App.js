import React from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'

import AppContext from './context'
import Header from './components/Header'
import Drawer from './components/Drawer'

import Home from './pages/Home';
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])  // корзина
  const [searchValue, setSearchValue] = React.useState('') // поиск
  const [cartOpened, setCartOpened] = React.useState(false) // открытие корзины
  const [favorites, setFavorites] = React.useState(false) // массив закладок
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    /* setIsLoading(true) */

    async function fetchData() {
      const itemsResponse = await axios.get('https://627cea9fbf2deb7174e3c0c2.mockapi.io/items')
      const cartResponse = await axios.get('https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart')
      const favoriteResponse = await axios.get('https://627cea9fbf2deb7174e3c0c2.mockapi.io/favorites')

      setIsLoading(false)
      // обеспечить загрузку всех данных
      setCartItems(cartResponse.data)
      setFavorites(favoriteResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    //axios.post('https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart', obj)  // добавляю в корзину  mockApi
    //setCartItems((prev) => [...prev, obj])
    //console.log('obj--in--App:', obj)
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart/${obj.id}`)
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
    } else {
      axios.post('https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart', obj)
      setCartItems(prev => [...prev, obj])
    }
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
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
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

  /*  const isItemAdded = (id) => {
     return cartItems.some((obj) => Number(obj.id) === Number(id))
   } */

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider value={
      {
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart
      } }>
      <div className="wrapper clear">
        { cartOpened && <Drawer items={ cartItems } onClose={ () => setCartOpened(false) } onRemove={ onRemoveItem } /> }
        <Header onClickCart={ () => setCartOpened(true) } />
        <Routes>
          <Route path="/" exact element={
            <Home
              items={ items }
              cartItems={ cartItems }
              searchValue={ searchValue }
              setSearchValue={ setSearchValue }
              onChangeSearchInput={ onChangeSearchInput }
              onAddToFavorite={ onAddToFavorite }
              onAddToCart={ onAddToCart }
              isLoading={ isLoading }
            /> }
          />
          <Route path="/favorites" exact element={
            <Favorites /> }
          />
          <Route path="/orders" exact element={
            <Orders /> }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App;
