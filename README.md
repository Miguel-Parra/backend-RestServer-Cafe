# Webserver + RestServer
 <br>

 ## **TECNOLOGIAS**

 <br>
En este Webserver y API Rest se utilizó lo siguiente:
 ### **Express**
 Framework que permitió crear la API y el Webserver. Aqui se implementó:
 - Rutas y controladores
 - Middlewares para servir el directorio público.
 ### **MongoDB Atlas**
 Servicio en la nube de Base de Datos que permitió crear una base de datos documental con MongoDB. 

 ### **Mongoose**
 ODM que permitió:
  - Conectar la aplicación de Node con la base de datos de MongoDB Atlas.
  - Crear los modelos para la DB.
  * Realizar inserciones, lecturas, queries, etc. 

   ### **Heroku**
 Plataforma utilizada para desplegar el proyecto. Aquí se configuró las variables de entorno personalizadas que utiliza la aplicación.
 ### **Bcryptjs**
 Paquete que Node que permitió encriptar la contraseña mediante un hash de una sola vía.
 ### **Express-validator**

 Paquete que Node que contiene una gran colección de Middlewares utilizados para las validaciones, por ejemplo: si es un Momgo ID, si llega vacío algún campo, hacer validaciones personalizadas, etc.
 ### **Dotenv**
 Paquete que Node que permitió crear las variables de entorno utilizadas de manera local en el proyecto. 
 ### **JSON Web Token**
 Utilizado para autenticar y validar al cliente en el backend.
 
  ### **Google Sign-In**
Servicio de autenticación alternativo utilizado para que el cliente pueda autenticarse en la aplicación. Se utilizó junto con el paquete de Node `google-auth-library `
 
 ### **Express-fileupload**
 Paquete que Node que permitió subir archivos a directorios especificos del servidor.
 ### **Cloudinary**
 Servicio en la nube que junto a su SDK nos permitió almacenar ahí las imagenes enviadas por los clientes. Esta alternativa remplazo a la subida directa de archivos al servidor.

<br>

## **DOCUMENTACION DE LA API**

<br>

Cabe señalar que la documentación fue generada usando **la herramienta de documentación de la API de Postman**. 

https://documenter.getpostman.com/view/9987294/UVsSP4Y3

<br>

## **APLICACIÓN HEROKU**

<br>

https://backend-restserver-cafe.herokuapp.com/ 

<br>

## **RECOMENDACIONES**

<br>


Para probarla pueden hacer uso de **Postman**.


Recuerden reconstruir los módulos de Node con:
```
npm install 
```
Y para correr la aplicación con:
```
node app.js







