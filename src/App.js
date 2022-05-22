import React from 'react'
import axios from 'axios'
import { Routes, Route, useLocation } from 'react-router-dom'

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
  const [favorites, setFavorites] = React.useState([]) // массив закладок
  const [isLoading, setIsLoading] = React.useState(true)

  const findItem = (arr, sub) => {
    return arr.find((item) => Number(item.parentId) === Number(sub.id))
  }
  const location = useLocation()  // для удаления item на странице 'favorites'

  React.useEffect(() => {

    async function fetchData() {
      try {
        const [itemsResponse, cartResponse, favoriteResponse] = await Promise.all(
          [
            axios.get('https://627cea9fbf2deb7174e3c0c2.mockapi.io/items'),
            axios.get('https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart'),
            axios.get('https://627cea9fbf2deb7174e3c0c2.mockapi.io/favorites')
          ])

        setIsLoading(false)
        // обеспечить загрузку всех данных
        setCartItems(cartResponse.data)
        setFavorites(favoriteResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных')
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const res = findItem(cartItems, obj)
      if (res) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart/${res.id}`)
      } else {
        // устанавливаем в state фиктивный obj для ускорения
        // потом меняем данные
        setCartItems(prev => [...prev, obj])
        const { data } = await axios.post('https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart', obj)
        setCartItems(prev => prev.map((item) => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }))
      }
    } catch (error) {
      alert('Ошибка при добавлении в карзину')
      console.error(error)
    }
  }

  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)))
      await axios.delete(`https://627cea9fbf2deb7174e3c0c2.mockapi.io/cart/${id}`)  // удаляю из корзины   mockApi
    } catch (error) {
      alert('Ошибка при удалении из корзины')
      console.error(error)
    }
  }

  const onAddToFavorite = async (obj) => {
    // если находимся на странице 'favorites', то удаляем item по клику
    if (location.pathname === '/favorites') {
      try {
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
        await axios.delete(`https://627cea9fbf2deb7174e3c0c2.mockapi.io/favorites/${obj.id}`)
      } catch (error) {
        alert('Не удалось удалить из фаворитов')
        console.error(error)
      }
    } else {
      try {
        const res = findItem(favorites, obj)
        if (res) {
          setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
          await axios.delete(`https://627cea9fbf2deb7174e3c0c2.mockapi.io/favorites/${res.id}`)
        } else {
          // добавляю в закладки и  mockApi
          // устанавливаем в state фиктивный obj для ускорения
          // потом меняем данные
          setFavorites(prev => [...prev, obj])
          const { data } = await axios.post('https://627cea9fbf2deb7174e3c0c2.mockapi.io/favorites', obj)
          setFavorites(prev => prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id
              }
            }
            return item
          }))
        }
      } catch (error) {
        alert('Не удалось добавить в фавориты')
        console.error(error)
      }
    }
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }

  const isItemFavorited = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={
      {
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemFavorited,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart
      } }>
      <div className="wrapper clear">
        <Drawer
          items={ cartItems }
          onClose={ () => setCartOpened(false) }
          onRemove={ onRemoveItem }
          opened={ cartOpened }
        />
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
