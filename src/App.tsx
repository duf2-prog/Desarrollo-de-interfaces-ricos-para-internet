import React, { Suspense, useEffect } from 'react';
import { useState } from 'react';
import './styles/App.css'
import type { MenuItem } from './entities/entities'
import FoodOrder from './FoodOrder';
import Cart from './Cart';
import { push, ref } from 'firebase/database';
import { db } from './services/firebase';
import logger from './services/logging';
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
  const [count, setCount] = useState(0);
  useEffect(() => {
    logger.info("Aplicación iniciada");
  }, []);

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
  const [isSending, setIsSending] = useState(false);

  const addItem = async (entry: { item: MenuItem; quantity: number }) => {
    try {
      logger.info(`Guardando pedido en Firebase: ${entry.item.name}, quantity: ${entry.quantity}`);
      const itemsRef = ref(db, "items");
      await push(itemsRef, entry);
      logger.info("Pedido guardado correctamente en Firebase");
    }
    catch (error) {
      logger.error("Error al guardar el pedido en Firebase: " + (error as Error).message);
    }
  };

  return (
    <foodItemsContext.Provider value={{ menuItems, cart, setCart }}>
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
              logger.info("Usuario ha regresado al menú de comida");
            }}
          />
        )}
        {isChooseCartPage && (
          <Cart cartItems={cart} onRemoveItem={(id: number) => {
            logger.warn(`Producto elminado del carrito: ID = ${id}`);
            setCart(cart.filter(entry => entry.item.id !== id));
          }}
            onSendOrder={async () => {
              logger.info(`Enviando el pedido con ${cart.length} productos`);
              setIsSending(true);
              setIsSendOrder(false);

              cart.forEach(entry => {
                const item = menuItems.find(m => m.id === entry.item.id);
                if (item) {
                  item.quantity -= entry.quantity;
                  logger.debug(`Stock actualizado: ${item.name} -> ${item.quantity} unidades`);
                }
              });

              await Promise.all(cart.map(entry => addItem(entry)));
              logger.info("Pedido enviado correctamente");
              setIsSending(false);
              setIsSendOrder(true);
              setCart([]);
            }}
          />
        )}
        {isSending && (<p className='loadingMessage'>Enviando pedido, por favor espere...</p>)}
        {isSendOrder && (<p className='foodSendMessage'>¡Pedido enviado! Recibirá un SMS una vez esté listo para recoger.</p>)}
      </div>
    </foodItemsContext.Provider>
  )
}

export default App
