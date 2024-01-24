
# Sistema de Gestión de Gastos

## Descripción

Este proyecto es un sistema de gestión de gastos personales y grupales que permite a los usuarios registrar y consultar gastos, categorías, grupos y realizar autenticación de usuarios. Ofrece funcionalidades para la creación de categorías de gastos, grupos, registro y autenticación de usuarios, así como la gestión y visualización de gastos individuales y grupales.

## Requisitos

- Node.js
- MySQL
- Paquetes de Node.js: express, mysql2, bcrypt, jsonwebtoken, dotenv

## Configuración

### Base de Datos

Configura tu base de datos MySQL creando las tablas necesarias según el esquema proporcionado en el proyecto.

### Variables de Entorno

Crea un archivo `.env` en el directorio raíz del proyecto con las siguientes variables:
```
DB_HOST=tu_host
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=tu_nombre_de_base_de_datos
SECRET_KEY=tu_clave_secreta_para_jwt
PORT=3000
```

## Instalación

Instala las dependencias del proyecto ejecutando:
```
npm install
```

## Ejecución

Ejecuta el proyecto con:
```
node index.js
```

## Estructura del Proyecto

- `index.js`: Punto de entrada del servidor.
- `routes`: Rutas de la API para usuarios, gastos, grupos y categorías.
- `controllers`: Lógica de negocio para manejar solicitudes de la API.
- `models`: Modelos para entidades como Usuario, Gasto, Grupo y Categoría.
- `middleware`: Middleware para funciones como la verificación de JWT.
- `config`: Configuración de la base de datos.

## Contribuir

Para contribuir al proyecto, por favor envía un pull request o abre un issue para discutir los cambios propuestos.

## Licencia

Este proyecto está bajo una licencia MIT.
