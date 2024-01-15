# ACADEMLO MEALS

Academlo Meals es un sistema integral para facilitar la gestión de usuarios, restaurantes, reseñas, comidas y órdenes. Este proyecto se centra en proporcionar una experiencia sin problemas, desde el registro hasta la creación eficiente de órdenes para la entrega de alimentos.

## Tecnologías Utilizadas

* Node.js y Express: Desarrollado en el entorno de ejecución Node.js y utilizando el marco Express para la construcción del backend de la aplicación.

* Sequelize: Seleccionado como ORM para interactuar con la base de datos relacional PostgreSQL, facilitando las operaciones de base de datos y asegurando una estructura de datos coherente.

* PostgreSQL: Se eligió como sistema de gestión de base de datos relacional para almacenar datos de manera estructurada y eficiente.


## Funcionalidades Principales

* Registro y Autenticación Segura: Implementado con JSON Web Tokens (JWT) para asegurar la autenticación de usuarios.

* Protección de Contraseñas: Utiliza Bcrypt para garantizar la seguridad de las contraseñas almacenadas en la base de datos.

* Gestión de Usuarios: Permite la creación de usuarios, incluyendo información como nombre, correo electrónico y dirección.

* Creación de Restaurantes: Facilita la creación de perfiles de restaurantes con detalles como nombre, ubicación y tipo de cocina.

* Reseñas sobre Restaurantes: Permite a los usuarios agregar reseñas sobre los restaurantes, incluyendo calificaciones y comentarios.

* Creación de Comidas: Ofrece la capacidad de agregar comidas al menú de los restaurantes, con detalles como nombre, descripción y precio.

* Creación de Órdenes: Permite a los usuarios realizar órdenes seleccionando comidas de los restaurantes disponibles.

* Manejo de Errores Efectivo: Incorpora un sistema robusto de manejo de errores para proporcionar mensajes claros y soluciones adecuadas cuando surgen problemas durante la ejecución.

* Validación de Entrada con Zod: Implementa Zod para validar la entrada de datos y asegurar la consistencia y validez de la información proporcionada por los usuarios.

## Pasos para ejecutar este backend

1. Clona el repositorio: git clone [Academlo Meals](https://github.com/Samuel33d/academlo-meals)

2. Instalar dependencias con el siguiente comando:

```
npm install
```

3. Se deberá crear una base de datos, puede crearla de manera local o utilizar https://www.elephantsql.com/

4. Clonar el archivo `.env.template` y renombrarlo a `.env` y agregar los valores de las variables de entorno.

5. ejecutar el comando:

```
npm run start:dev
```
