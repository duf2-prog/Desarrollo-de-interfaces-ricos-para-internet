
// Tipo de dato a usar en el modelo

export interface Item {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
}

// Modelo de datos

export const items: Item[] = [
  { 
    id: 1, 
    nombre: "Cafetera Express", 
    descripcion: "Café intenso al instante", 
    precio: 79.99,
    categoria: "Cocina"
  },
  { 
    id: 2, 
    nombre: "Zapatillas Running", 
    descripcion: "Amortiguación ligera y cómoda", 
    precio: 59.90,
    categoria: "Deportes"
  },
  { 
    id: 3, 
    nombre: "Silla Ergonómica", 
    descripcion: "Soporte lumbar ajustable", 
    precio: 129.00,
    categoria: "Oficina"
  },
];