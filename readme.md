[ideas]: documents/ideas.md

## TODO

[x] type orm setup

[x] Design entities

[x] build entitities

[x] endpoints user

[x] endpoint product

[x] configurar express y archivos estaticos

[x] acomodar pool que su llave primaria no se repita

[x] emplear los middlewares para el frontend

[x] emplear jwt

[x] encriptar la contraseña de los usuarios

[x] manejador de archivos

[ ] rutas para paypal

[ ] verificar email (node mailer)

[ ]

## Endpoints

### Registrar el usuario

- un usuario puede registrar sus datos sin haber registrado credenciales

  - nombre
  - correo
  - un cuestionario
  - hay dos tipos de usuario

    - El que solo ha comprado un suscripcion
      por ahora solo se puede registrar

      - Para enterarse de los desafios
      - Recibir promociones
      - Reclamar su premio

    - El que se ha registrado desde el dashboard
      un usuario puede tener un admin solo registrando sus credenciales(cuando este exista) [mas aqui][ideas]

## Elaborar una encuesta

Al ser los formularios reutilizables los formatos se crean anteriormente

### **Endpoints**

- para crear un formulario
  - Estos se guardan despues de que el usuario se ha creado y validado sus datos
- para pedir un formulario
- El backend le debe decir al frontend tambien el tipo de validaciones
  que va ha tener

## pagos y productos

la primera version solo require la creacion de productos preestablecidos
que se verifiquen los pagos y que se guarden los metadatos

### **Endpoints**

- realizar un pago
- paypal configuration
- crear un producto
- traer productos

### questions

las preguntas pertenecena a un formulario , este campo es obligatorio

### criterios de búsqueda

- ○ asc o desc (fecha de creacion)
- por formulario
- por nombre de pregunta
- por cantidad
