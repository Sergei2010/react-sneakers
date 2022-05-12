import React from 'react';
import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

const arr = [
  { title: 'Мужские кроссовки Nike Blazer Mid Suede', price: 12999, imageUrl: '/img/sneakers/1.jpg' },
  { title: 'Мужские кроссовки Nike Air Max 270', price: 15600, imageUrl: '/img/sneakers/2.jpg' },
  { title: 'Мужские кроссовки Nike Blazer Mid Suede', price: 8499, imageUrl: '/img/sneakers/3.jpg' },
  { title: 'Мужские кроссовки Puma X Aka Boku', price: 8999, imageUrl: '/img/sneakers/4.jpg' },
]

function App() {
  const [cartOpened, setCartOpened] = React.useState(false)
  return (
    <div className="wrapper clear">
      { cartOpened && <Drawer onClose={ () => setCartOpened(false) } /> }
      <Header onClickCart={ () => setCartOpened(true) } />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск ..." />
          </div>
        </div>
        <div className="d-flex">
          { arr.map((item) =>
            <Card
              title={ item.title }
              price={ item.price }
              imageUrl={ item.imageUrl }
              onFavorite={ () => console.log('Добавил в закладки') }
              onPlus={ () => console.log('Нажал плюс') } />) }
        </div>
      </div>
    </div>
  );
}

export default App;
