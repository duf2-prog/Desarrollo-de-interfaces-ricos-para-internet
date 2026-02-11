import React, { Suspense, useEffect, useState } from 'react';
import './styles/App.css'
import type { MenuItem } from './entities/entities'
import FoodOrder from './FoodOrder';
import Cart from './Cart';
import logger from './services/logging';

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";
import { removeFromCart, clearCart } from "./store/slices/cartSlice";
import { reduceStock } from "./store/slices/menuSlice";
import { sendOrder } from "./store/slices/cartSlice";

const Foods = React.lazy(() => import('./Foods'));

function App() {

  const menuItems = useSelector((state: RootState) => state.menu);
  const cart = useSelector((state: RootState) => state.cart.items);
  const loading = useSelector((state: RootState) => state.cart.loading);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    logger.info("Aplicación iniciada");
  }, []);

  const [isChooseFoodPage, setIsChooseFoodPage] = useState(false);
  const [isChooseOrderPage, setIsChooseOrderPage] = useState(false);
  const [isChooseCartPage, setIsChooseCartPage] = useState(false);
  const [selectedFood, setSelectedFood] = useState<MenuItem>();
  const [isSendOrder, setIsSendOrder] = useState(false);

  return (
    <div className="App">
      <div className="topButtons">
        {!isChooseOrderPage && (
          <button className="togleButton" onClick={() => {
            logger.debug("Usuario ha alternado la vista de disponibilidad/pedir comida");
            setIsChooseFoodPage(!isChooseFoodPage)
            setIsSendOrder(false)
          }}>
            {isChooseFoodPage ? "Disponibilidad" : "Pedir Comida"}
          </button>
        )}

        <button className="cartButton" onClick={() => {
          logger.debug("Usuario ha alternado la vista del carrito");
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
            logger.info(`Comida seleccionada: ${food.name}`);
            setSelectedFood(food)
            setIsChooseOrderPage(true)
            setIsSendOrder(false)
          }}
          />
        </Suspense>
      )}

      {isChooseOrderPage && selectedFood && (
        <FoodOrder food={selectedFood}
          onReturnMenu={() => {
            setIsChooseOrderPage(false)
            logger.info("Usuario ha regresado al menú de comida");
          }}
        />
      )}

      {isChooseCartPage && (
        <Cart cartItems={cart} onRemoveItem={(id: number) => {
          logger.warn(`Producto elminado del carrito: ID = ${id}`);
          dispatch(removeFromCart(id));
        }}
          onSendOrder={async () => {
            logger.info(`Enviando el pedido con ${cart.length} productos`);
            setIsSendOrder(false);

            cart.forEach(entry => {
              dispatch(reduceStock({ id: entry.item.id, quantity: entry.quantity }));
            });

            await dispatch(sendOrder(cart));
            dispatch(clearCart());

            setIsSendOrder(true);
          }}
        />
      )}

      {loading && (<p className='loadingMessage'>Enviando pedido, por favor espere...</p>)}
      {isSendOrder && (<p className='foodSendMessage'>¡Pedido enviado! Recibirá un SMS una vez esté listo para recoger.</p>)}
    </div>
  )
}

export default App;
