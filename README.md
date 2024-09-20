## Sistema de Hotelería

## 🚀 Descripción
Una aplicación de escritorio, para la gestion de hoteleria, con esta herramienta se mejora el control de reservaciones y estadias, registrando los clientes, servicios y transacciones.

## 💻 Tecnologias
* Electron.js
* mySQL

## ⚙️ Configuracion del Proyecto
Para configurar y ejecutar este proyecto en tu entorno de desarrollo:
1. Clona el repositorio:
    ```bash
    git clone https://github.com/robertrz1008/hotel-system.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd hotel-system
    ```
3. Instala las dependencias:
```bash
npm install
```
4. crear una base de datos llamado "hoteldb".

5. En el archivo  **query.sql** dentro de la carpeta **db** copiar todo el script y pegarlo en su cliente de postgres, que conformara todas las tabla de la base de datos.

6. Modifica el codigo del archivo **conectiondb.js** segun la configuracion de gestor de su base de datos postgres
```ts
const connectdb = mysql.createPool({
    host: "localhost",
    port: "3300",
    user: "root",
    password: "*******",
    database: "hoteldb"
})
```

5. Ejecuta la aplicación escribiendo en tu teminal:
```bash
npm start