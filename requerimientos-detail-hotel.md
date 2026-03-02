- La vista de booking detail debe tener un container que tenga 965x637px y debe estar centrado en la pantalla ademas 
- debemos importar el font Rubik
- el texto del Detalle de la reserva tener el font Rubik con un weight de 500 y 32px de size
- debemos tener un rectangulo de color #CDA349 de 1.5px de borde y un radius de 10px ese rectangulo debe tener una medida de 485x72px y debe estar centrado en el container en ese rectangulo pondremos la fecha de llegada y la fecha de salida las dos deben tener sus respectivos iconos y decir fecha de llegada y fecha de salida que si por ejemplo dice 2026-03-01T08:00:00.000Z que sea 01 de marzo de 2026 y la fecha de salida igual en el mock salen como startDate, endDate 

- Tendremos un rectangulo que sera el container de promociones que sera de 351x140px donde pondremos las promociones aplicadas en nuestro caso pondremos:
```html
<div class="promo-card">
          <h3>Promociones Disponibles</h3>
          <ul>
            <li>Carnaval</li>
            <li>Familias de 8 integrantes</li>
            <li>Niños menores de 5 años no pagan estadía</li>
            <li>Desayuno incluido</li>
          </ul>
        </div>
```
esas seran las promociones aplicadas deberan estar en el container de promociones de 351x140px la letra del texto h3 de promociones debe tener Encode Sans Semi Condensed con un weight de 500 y size de 20px y un color de #1E3D58 y la lista li debe tener Encode Sans Semi Condensed con un weight de 275 y size de 18px y style ExtraLight  y un color black y este contenedor de promociones debe estar a 93px de distancia hacia la izquierda del container padre

- Costo de la reserva debe tener un container el cual debe tener 228x140px y debe estar a 190px de distancia hacia la izquierda del container de promociones, el texto h3 debe tener el font Rubik con un weight de 500 y size de 20px y un color #CDA349 y ahi pondremos el costo total de la reserva, descuento y el precio final 

- Habitaciones seleccionadas simplemente es un Rubik de weight 500 y size 20px y un color #CDA349 y debe tener las rooms que estan en el mock

y las politicas de reserva deben ser: - Las reservas se pueden cancelar hasta tres días antes de la fecha de reserva.
- Si intenta cancelar una reserva existente y la fecha de cancelación ha expirado, la transacción será rechazada y se le obligará a cubrir todos los pagos.

abajo deberan aparecer dos botones en la parte inferior derecha del container las cuales seran 
- cancelar (texto negro y color de fondo #515151)
- COnfirmar Reserva (texto blanco y color de fondo #CDA349) debe tener un icono


