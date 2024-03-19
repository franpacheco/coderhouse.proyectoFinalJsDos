// Objeto que contiene los productos y sus precios
const productos = [
    { nombre: "Camisa", precio: 50 },
    { nombre: "Remera", precio: 15 },
    { nombre: "Zapatillas", precio: 40 },
    { nombre: "Pantalón", precio: 30 }
];

// Función para mostrar opciones de compra y el total actual del carrito
function mostrarOpciones(carrito) {
    let opcionesPrompt = `Opciones de compra (Total actual: $${calcularTotal(carrito)}):\n`;
    productos.forEach((producto, index) => {
        opcionesPrompt += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
    });
    console.log(opcionesPrompt);
    return opcionesPrompt;
}

// Función para calcular el total actual del carrito
function calcularTotal(carrito) {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

// Función para agregar un producto al carrito
function agregarAlCarrito(seleccion, carrito) {
    const productoSeleccionado = productos[seleccion - 1];
    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        console.log(`Agregado al carrito: ${seleccion}. ${productoSeleccionado.nombre}, con un importe de $${productoSeleccionado.precio}`);
    } else {
        throw new Error("Selección inválida. Por favor, elija un número válido.");
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(carrito) {
    mostrarCarrito(carrito);
    const seleccion = parseInt(prompt("Seleccione el número del producto que desea eliminar:"));
    if (!isNaN(seleccion) && seleccion >= 1 && seleccion <= carrito.length) {
        const productoEliminado = carrito.splice(seleccion - 1, 1);
        console.log(`Producto eliminado del carrito: ${seleccion}. ${productoEliminado[0].nombre}`);
    } else {
        console.log("Selección inválida. Por favor, elija un número válido.");
    }
}

// Función para mostrar el contenido actual del carrito
function mostrarCarrito(carrito) {
    console.log("Contenido actual del carrito:");
    carrito.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
}

// Función para calcular recargo según las cuotas
function calcularRecargo(cantidadCuotas) {
    if (cantidadCuotas === 1) {
        return 0;
    } else if (cantidadCuotas === 2) {
        return 0.1;
    } else if (cantidadCuotas === 3) {
        return 0.15;
    } else {
        throw new Error("Cantidad de cuotas no válida.");
    }
}

// Ejecuta el carrito de compras
function carritoDeCompras() {
    let totalApagar = 0;
    const carrito = [];
    let seleccion;

    console.log("Bienvenido al carrito de compras");

    do {
        const opcionesPrompt = mostrarOpciones(carrito);

        try {
            seleccion = parseInt(prompt(
                opcionesPrompt + 
                "(Presione 0 para finalizar)"
            ));
            if (isNaN(seleccion)) {
                throw new Error("Por favor, ingrese un número.");
            }
        } catch (error) {
            console.log(error.message);
            continue;
        }

        try {
            if (seleccion >= 1 && seleccion <= productos.length) {
                agregarAlCarrito(seleccion, carrito);
                totalApagar += productos[seleccion - 1].precio;
                console.log("Total actual en el carrito: $" + totalApagar.toFixed(2));
            } else if (seleccion === 0) {
                let eliminar = prompt("¿Desea eliminar algún producto del carrito? s-Si n-No").toLowerCase();
                if (eliminar === "s") {
                    eliminarDelCarrito(carrito);
                }

                let respuesta = prompt(`¿Desea pagar en cuotas? s-Si n-No (Total a pagar: $${totalApagar.toFixed(2)})`).toLowerCase();
                if (respuesta === "s") {
                    let cantidadCuotas;
                    do {
                        cantidadCuotas = parseInt(prompt(`Ingrese el número de cuotas para pagar el total:
                        1 cuota - no tiene recargo
                        2 cuotas - un 10% de recargo
                        3 cuotas - un 15% de recargo`));
                        if (isNaN(cantidadCuotas) || cantidadCuotas < 1 || cantidadCuotas > 3) {
                            console.log("Número de cuotas inválido. Por favor, ingrese un número válido.");
                        }
                    } while (isNaN(cantidadCuotas) || cantidadCuotas < 1 || cantidadCuotas > 3);

                    const recargo = calcularRecargo(cantidadCuotas);
                    const totalConRecargo = totalApagar * (1 + recargo);
                    console.log(`El total de la compra es de: $${totalApagar.toFixed(2)}.`);
                    console.log(`Aplicando recargo del ${recargo * 100}%, el total con recargo es de: $${totalConRecargo.toFixed(2)}.`);
                } else if (respuesta === "n") {
                    console.log(`El total de la compra es: $${totalApagar.toFixed(2)}`);
                } else {
                    console.log("Respuesta inválida. Mostrando total sin división");
                    console.log(`El total de la compra es: $${totalApagar.toFixed(2)}`);
                }

                console.log("Gracias por tu compra");
            } else {
                throw new Error("Selección inválida. Por favor, elija un número válido.");
            }
        } catch (error) {
            console.log(error.message);
        }
    } while (seleccion !== 0);
}

// Llamado a función para que se ejecute
carritoDeCompras();
