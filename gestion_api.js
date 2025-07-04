const URL = 'http://localhost:3000/Products'; // Se genera una url que queda como constante para no repetir codigo y que sea mas facil de leer

async function obtenerProductos() { // Se usan funciones asincronas ya que nos permite que el codigo se ejecute sin bloquear la ejecucuion inicial
  try {
    const res = await fetch(URL); // usamos res como variable ya que es el objeto de respuesta que retorna la funcion fetch
    if (!res.ok) throw new Error('Error al obtener productos'); // entonces si res es okay(que significa que todo esta bien devolviendo true). throw en javascript nos permite registrar un error manualmente
    // entonces estamos diciendo: ""Si la respuesta del servidor NO fue exitosa (res.ok === false), entonces lanza un error personalizado con ese mensaje.""
    const data = await res.json(); // aqui vemos como la constante data que acabamos de crear le decimos que pare la ejecucion hasta que termine de convertir los datos, guardandose todo en data que es el objeto con los productos
    console.table(data); // imprimimos el mensaje en pantalla
  } catch (err) { // capturamos y prevenimos errores 
    console.error(err.message);
  }
}

async function crearProducto(nombre, precio) {  // en este caso en esta funcion asincrona vemos como la nombramos y espera recibir argumentos como lo son el nombre y el precio
  if (!nombre || isNaN(precio)) { // dicho eso entonces !nombre se asegura de que  el nombre no este vacio y isNaN revisa si el valor del precio no es un numero valido
    console.error('Producto inválido'); // se imprime en caso de error
    return;// se detiene la ejecucion de la funcion y asi no se deja crear otro producto
  }

  const nuevo = { name: nombre, price: Number(precio) }; // se crea un objeto con las propiedades de name y price que sera enviado al servidor

  try {
    const res = await fetch(URL, { // Envia la peticion post al servidor 
      method: 'POST', // await espera que la solicitud termine
      headers: { 'Content-Type': 'application/json' }, // nos dice que esta enviando json
      body: JSON.stringify(nuevo) // convierte el objeto nuevo a json
    });

    if (!res.ok) throw new Error('Error al crear producto'); // verifica si nuestra respuesta fue correcta, en dado caso de ser exitosa se lanza el error manualmente

    const data = await res.json(); // convierte la respuesta a objeto jacascript
    console.log('Producto creado:', data); // imprime 
  } catch (err) {
    console.error(err.message);
  }
}

async function actualizarProducto(id, nuevoNombre, nuevoPrecio) {
  if (!id || !nuevoNombre || isNaN(nuevoPrecio)) {
    console.error(' Datos inválidos');
    return;
  }

  const actualizado = { id, name: nuevoNombre, price: Number(nuevoPrecio) };

  try {
    const res = await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizado)
    });

    if (!res.ok) throw new Error('Error al actualizar');

    const data = await res.json();
    console.log(' Producto actualizado:', data);
  } catch (err) {
    console.error( error.message);
  }
}

async function eliminarProducto(id) {
  if (!id) {
    console.error('ID inválido');
    return;
  }

  try {
    const res = await fetch(`${URL}/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error('No se pudo eliminar');

    console.log(` Producto con ID ${id} eliminado`);
  } catch (err) {
    console.error(err.message);
  }
}



obtenerProductos();
//await crearProducto("Bolso", 45000);
//await actualizarProducto(3, "Bolso de cuero", 48000);
//await eliminarProducto(3);
