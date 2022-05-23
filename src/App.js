import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import cartService from './service/cart.service'
import itemService from './service/item.service'
import favoritesService from './service/favorites.service'
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
        await itemService.get().then((res) => setItems(res));
        await cartService.get().then((res) => setCartItems(res));
        await favoritesService.get().then((res) => setFavorites(res));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе данных ;(");
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const res = findItem(cartItems, obj)
      if (res) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        const { id } = res
        await cartService.delete(id)
      } else {
        // устанавливаем в state фиктивный obj для ускорения
        // потом меняем данные
        setCartItems(prev => [...prev, obj])
        await cartService.post(obj).then((res) => {
          setCartItems(prev => prev.map((item) => {
            if (item.parentId === res.parentId) {
              return {
                ...item,
                id: res.id
              }
            }
            return item
          }))
        })
      }
    } catch (error) {
      alert('Ошибка при добавлении в карзину')
      console.error(error)
    }
  }

  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)))
      // удаляю из корзины   mockApi
      await cartService.delete(id)
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
        await favoritesService.delete(obj.id)
      } catch (error) {
        alert('Не удалось удалить из фаворитов')
        console.error(error)
      }
    } else {
      try {
        const res = findItem(favorites, obj)
        if (res) {
          setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(res.id)))
          await favoritesService.delete(res.id)
        } else {
          // добавляю в закладки и  mockApi
          // устанавливаем в state фиктивный obj для ускорения
          // потом меняем данные
          setFavorites(prev => [...prev, obj])
          await await favoritesService.post(obj).then((res) => {
            setFavorites(prev => prev.map((item) => {
              if (item.parentId === res.parentId) {
                return {
                  ...item,
                  id: res.id
                }
              }
              return item
            }))
          })
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
          <Route path="/favorites" exact element={ <Favorites /> } />
          <Route path="/orders" exact element={ <Orders /> } />
          {/*  <Route index path="/favourites" element={ <Favorites /> } />
          <Route index path="/orders" element={ <Orders /> } /> */}
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App;
