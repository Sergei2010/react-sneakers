import Card from './components/Card'
import Header from './components/Header'

function App() {
  return (
    <div className="wrapper clear">
      <div className="overlay" style={ { display: "none" } }>
        <div className="drawer">
          <h2 className="mb-30 d-flex justify-between align-center">Корзина <img className="cu-p remove-btn" src="/img/btn-remove.svg" alt="Remove" /></h2>
          <div className="items">
            <div className="cart-item d-flex align-center mb-20">
              <div style={ { backgroundImage: 'url(/img/sneakers/1.jpg)' } } className="cart-item-img"></div>
              <div className="mr-20 flex">
                <p className="mb-5">Мужские кроссовки Nike Blazer Mid Suede</p>
                <b>12999 руб.</b>
              </div>
              <img className="remove-btn" src="/img/btn-remove.svg" alt="Remove" />
            </div>
            <div className="cart-item d-flex align-center mb-20">
              <div style={ { backgroundImage: 'url(/img/sneakers/1.jpg)' } } className="cart-item-img"></div>
              <div className="mr-20 flex">
                <p className="mb-5">Мужские кроссовки Nike Blazer Mid Suede</p>
                <b>12999 руб.</b>
              </div>
              <img className="remove-btn" src="/img/btn-remove.svg" alt="Remove" />
            </div>
          </div>
          <div className="cart-total-block">
            <ul>
              <li>
                <span>Итого:</span>
                <div></div>
                <b>21498 руб.</b>
              </li>
              <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>1074 руб.</b>
              </li>
            </ul>
            <button className="green-button">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
          </div>
        </div>
      </div>
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск ..." />
          </div>
        </div>
        <div className="d-flex">
          <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
