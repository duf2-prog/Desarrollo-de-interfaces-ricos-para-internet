import type { MenuItem } from "./entities/entities";
import './styles/Food.css';

interface FoodsProps {
    foodItems: MenuItem[];
    onFoodClick(food: MenuItem): void;
}

function Foods(props: FoodsProps) {
    return (
        <>
            <h4 className="foodTitle">Carta</h4>
            <p className="foodSubtitle">Pulsa sobre cada producto para añadirlo</p>
            <ul className="ulFoods">
                {props.foodItems.map((item) => {
                    return (
                        <li key={item.id}
                            className="liFoods"
                            onClick={() => props.onFoodClick(item)}>
                            <img className="foodImg"
                                src={`${import.meta.env.BASE_URL}images/${item.image}`}
                                alt={item.name}
                            />
                            <div className="foodItem">
                                <p className="foodDesc">{item.desc}</p>
                                <p className="foodPrice">{item.price}€</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Foods;