Pasos para correr la APP:

-API:

1. Base de datos: MYSQL. Utilice MySQL Workbench para crear una nueva conexion y la base de datos.
   CREATE DATABASE IF NOT EXISTS turingdb; //Este es el comando para crear una nueva base de datos y donde "turingdb" es el nombre de nuestra nueva base de datos
   USE turingdb; //Este es el comando para seleccionar nuestra base de datos

2. ENV: Se necesita crear un archivo .env con las siguientes variables de entorno:
   PORT = 3001 //Se refiere a puerto donde correra nuestra API.
   USER = root //Se refiere al Username de la conexion
   PASSWORD = 15935 //Se refiere a la password de la conexion
   DATABASE_NAME = turingdb //Se refiere al nombre que asignamos a nuestra base de datos

3. Instalar dependencias: npm i

4. Correr la API: npm run start (en primera instancia correra la API y creara las tablas necesarias automaticamente, podran ver si la conexion fue correcta desde la consola)

Nota: La aplicacion correra en localhost. existen errores si se intenta correr en WSL2

-Client:
ENV: Se necesita crear un archivo .env con las siguientes variables de entorno:
API_URL = http://localhost:3001 //se refiere a la url de nuestra API

Instalar dependencias: npm i

Correr Client: npm run android, en caso de no tener un emulador(en mi caso utilice Android Studio), es posible correrlo en pagina web con el comando (npm run web)

Nota1: Es posible crear usuarios nuevos, lo unico que no implemente fueron validaciones de email y contraseña para que sea mas facil acceder y probar la api(en un principio no hay usuarios creados, por eso necesitaran crear uno).
Nota2: Es probable que existan textos(los errores por ej) que esten mal traducidos en ingles.
Nota3: Cualquier duda o problema con respecto al codigo, con gusto pueden escribirme voy a estar pendiente. Muchas gracias por la oportunidad, es mi primera aplicacion con React Native, comprendo que hay muchos errores a mejorar!. Pero me agrado mucho usar React Native, asi que estare probando mas cosas con esta tecnologia.

Alan Joel Cabrera
