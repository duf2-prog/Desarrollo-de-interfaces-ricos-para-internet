import { useState, type MouseEventHandler } from "react";
import type { MenuItem } from "../entities/entities";
import "../styles/FoodOrder.css";
import logger from "../services/logging";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

interface FoodOrderProps {
    food: MenuItem;
    onReturnMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}

function FoodOrder(props: FoodOrderProps) {
    const [totalAmount, setTotalAmount] = useState(props.food.price);
    const [quantity, setQuantity] = useState<number>(1);
    const [isOrdered, setIsOrdered] = useState(false);

    const dispatch = useDispatch();

    const handleClick = () => {
        logger.info(`Añadido al carrito: ${props.food.name} x ${quantity}`);
        setIsOrdered(true);
        dispatch(addToCart({ item: props.food, quantity }));
    }

    return (
        <div className="foodOrder">
            <h3>{props.food.name}</h3>

            <img
                className="foodOrderImg"
                src={`${import.meta.env.BASE_URL}images/${props.food.image}`}
                alt={props.food.name}
            />

            <div className="foodOrderDetails">
                <p>{props.food.desc}</p>

                <div className="foodOrderInputs">
                    <div>
                        <label className="foodOrderLabel">Cantidad</label>
                        <input type="number"
                            min="1" max={props.food.quantity}
                            value={quantity}
                            onChange={e => {
                                setQuantity(Number(e.target.value))
                                setTotalAmount(props.food.price * Number(e.target.value))
                            }}
                        />
                    </div>

                    <input type="text" placeholder="Nombre" />
                    <input type="text" placeholder="Teléfono" />
                </div>

                <p className="foodOrderTotal">
                    {totalAmount} €
                </p>
            </div>

            <div className="foodOrderButtons">
                <button
                    className="sendButton"
                    onClick={() => handleClick()}
                >
                    Añadir al carrito
                </button>

                <button
                    className="returnButton"
                    onClick={props.onReturnMenu}
                >
                    Volver a la carta
                </button>
            </div>
            {isOrdered && (<p className='foodAddMessage'>¡Producto añadido al carrito! Revise su carro antes de enviar.</p>)}
        </div>
    );
}

export default FoodOrder;
