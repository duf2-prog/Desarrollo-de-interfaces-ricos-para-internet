import type { MenuItem } from "./entities/entities";
import "./styles/Cart.css";

interface CartProps {
    cartItems: { item: MenuItem; quantity: number }[];
    onRemoveItem(id: number): void;
    onSendOrder(): void;
}

function Cart(props: CartProps) {
    const total = props.cartItems.reduce(
        (sum, entry) => sum + entry.item.price * entry.quantity, 0
    );
    return (
        <div className="cart">
            <h3>Carrito</h3>

            {props.cartItems.length === 0 && <p className="emptyCartMessage">El carrito está vacío</p>}

            <ul>
                {props.cartItems.map((entry) => (
                    <li key={entry.item.id} className="cartItem">
                        <p className="cartItemName">{entry.item.name} x {entry.quantity}</p>
                        <p className="cartItemPrice">{entry.item.price * entry.quantity} €</p>
                        <button className="removeItemButton" onClick={() => props.onRemoveItem(entry.item.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            <h4>Total: {total} €</h4>
            <button className="sendOrderButton" onClick={props.onSendOrder}>Enviar pedido</button>
        </div>
    );
}

export default Cart;
