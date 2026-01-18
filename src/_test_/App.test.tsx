import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App.tsx';

describe("Carta inicial", async () => {
    it("muestra cuatro productos con nombre, stock e imagen", async () => {
        render(<App />)
        
        const names = screen.getAllByText(/Hamburguesa de pollo|Hamburguesa vegetariana|Patatas fritas|Helado/i);
        expect(names.length).toBe(4);

        const stocks = screen.getAllByText(/Disponible:/i);
        expect(stocks.length).toBe(4);

        const images = screen.getAllByRole("img");
        expect(images.length).toBe(4);        
    });
})

describe("Pantalla Pedir Comida", async () => {
    it("muestra cuatro productos y algún precio", async () => {
        render(<App />)
        
        const button = screen.getByText("Pedir Comida");
        fireEvent.click(button);

        const images = screen.getAllByRole("img");
        expect(images.length).toBe(4);

        const price = screen.getAllByText(/€/i);
        expect(price.length).toBeTruthy();        
    })
})

describe("Actualización del precio en FoolOrder", async () => {
    it("actualiza el precio al cambiar la cantidad", () => {
        render(<App />)

            fireEvent.click(screen.getByText("Pedir Comida"));
            fireEvent.click(screen.getAllByRole("img")[0]);
            
            const initialPrice = screen.getByText("/€/").textContent;
            const input = screen.getByLabelText("Cantidad");
            
            fireEvent.change(input, { target: { value: '3' } });
            const updatePrice = screen.getByText("/€/").textContent;

            expect(updatePrice).not.toBe(initialPrice);
    });
})