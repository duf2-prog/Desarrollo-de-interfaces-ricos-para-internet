import React, { Suspense } from 'react';
import { useState } from 'react';
import './styles/App.css'
import type { MenuItem } from './entities/entities'
import FoodOrder from './FoodOrder';
import Cart from './Cart';
const Foods = React.lazy(() => import('./Foods'));

export const foodItemsContext = React.createContext<{
  menuItems: MenuItem[];
  cart: { item: MenuItem; quantity: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ item: MenuItem; quantity: number }[]>>;
}>({
  menuItems: [],
  cart: [],
  setCart: () => { }
});

function App() {
  const [menuItems] = useState<MenuItem[]>([
    {
      "id": 1,
      "name": "Hamburguesa de pollo",
      "quantity": 40,
      "desc": "Hamburguesa de pollo frito y mayonesa",
      "price": 24,
      "image": "cb.jpg"
    },
    {
      "id": 2,
      "name": "Hamburguesa vegetariana",
      "quantity": 30,
      "desc": "Hamburguesa vegetariana con aguacate",
      "price": 22,
      "image": "vb.jpg"
    },
    {
      "id": 3,
      "name": "Patatas fritas",
      "quantity": 50,
      "desc": "Patatas fritas crujientes con ketchup",
      "price": 20,
      "image": "chips.jpg"
    },
    {
      "id": 4,
      "name": "Helado",
      "quantity": 30,
      "desc": "Helado de vainilla cremoso",
      "price": 15,
      "image": "ic.jpg"
    }
  ]);
  const [isChooseFoodPage, setIsChooseFoodPage] = useState(false);
  const [isChooseOrderPage, setIsChooseOrderPage] = useState(false);
  const [isChooseCartPage, setIsChooseCartPage] = useState(false);
  const [selectedFood, setSelectedFood] = useState<MenuItem>();
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [isSendOrder, setIsSendOrder] = useState(false);

  return (
    <foodItemsContext.Provider value={{ menuItems, cart, setCart }}>
      <div className="App">
        <div className="topButtons">
          {!isChooseOrderPage && (
            <button className="togleButton" onClick={() => {
              setIsChooseFoodPage(!isChooseFoodPage)
              setIsSendOrder(false)
            }}>
              {isChooseFoodPage ? "Disponibilidad" : "Pedir Comida"}
            </button>
          )}

          <button className="cartButton" onClick={() => {
            setIsChooseCartPage(!isChooseCartPage)
            setIsSendOrder(false)
          }}>
            {isChooseCartPage ? "Cerrar Carrito" : `Ver carrito: ${cart.length} añadidos`}
          </button>
        </div>

        <h3 className="title">Comida Rápida Online</h3>
        {!isChooseFoodPage && (
          <>
            <h4 className="subTitle">Menús</h4>
            <ul className="ulApp">
              {menuItems.map((item) => {
                return (
                  <li key={item.id} className="liApp">
                    <p className="itemName">{item.name}</p>
                    <p className="itemQty">Disponible: {item.quantity}</p>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {isChooseFoodPage && !isChooseOrderPage && (
          <Suspense fallback={<div> Cargando detalles...</div>}>
            <Foods foodItems={menuItems} onFoodClick={(food: MenuItem) => {
              setSelectedFood(food)
              setIsChooseOrderPage(!isChooseOrderPage)
              setIsSendOrder(false)
            }}
            />
          </Suspense>
        )}
        {isChooseOrderPage && selectedFood && (
          <FoodOrder food={selectedFood}
            onReturnMenu={() => {
              setIsChooseOrderPage(!isChooseOrderPage)
            }}
          />
        )}
        {isChooseCartPage && (
          <Cart cartItems={cart} onRemoveItem={(id: number) => {
            setCart(cart.filter(entry => entry.item.id !== id));
          }}
            onSendOrder={() => {
              setIsSendOrder(true);
              setCart([]);
            }}
          />
        )}
        {isSendOrder && (<p className='foodSendMessage'>¡Pedido enviado! Recibirá un SMS una vez esté listo para recoger.</p>)}
      </div>
    </foodItemsContext.Provider>
  )
}

export default App
