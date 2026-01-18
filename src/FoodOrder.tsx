import { useState, type MouseEventHandler } from "react";
import type { MenuItem } from "./entities/entities";
import "./styles/FoodOrder.css";

interface FoodOrderProps {
    food: MenuItem;
    onQuantityUpdate(id: number, quantity: number): void;
    onReturnMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}

function FoodOrder(props: FoodOrderProps) {
    const [quantity, setQuantity] = useState<number>(1);

    return (
        <div className="foodOrder">
            <h3>{props.food.name}</h3>

            <img
                className="foodOrderImg"
                src={`/images/${props.food.image}`}
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
                            onChange={e => setQuantity(Number(e.target.value))}
                        />
                    </div>

                    <input type="text" placeholder="Nombre" />
                    <input type="text" placeholder="Teléfono" />
                </div>

                <p className="foodOrderTotal">
                    {props.food.price * quantity} €
                </p>
            </div>

            <div className="foodOrderButtons">
                <button
                    className="sendButton"
                    onClick={() => props.onQuantityUpdate(props.food.id, quantity)}
                >
                    Enviar pedido
                </button>

                <button
                    className="returnButton"
                    onClick={props.onReturnMenu}
                >
                    Volver a la carta
                </button>
            </div>
        </div>
    );
}

export default FoodOrder;
