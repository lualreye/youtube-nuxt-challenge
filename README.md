# Proyecto Nuxt 3

Este es un proyecto de ejemplo que utiliza Nuxt 3 y TypeScript.

## Tabla de Contenidos

- [Variables](#variables)
- [Instalación](#instalación)
- [Desarrollo](#desarrollo)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Pruebas](#pruebas)

## Variables

Por default el proyecto tiene un base url que apunta a localhost:8000 que es el ambiente de desarrollo del backend
Sin embargo es posible apuntar directamente a produccion del backend con la siguiente variable de entorno

`VITE_BASE_URL=https://youtube-express-challenge.vercel.app/api`

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
npm install
```

## Desarrollo

Para iniciar el servidor de desarrollo, ejecute el siguiente comando:

```bash
npm run dev
```

el servidor de desarrollo se iniciará en http://localhost:3000

## Estructura del proyecto

- app.vue: Componente principal de la aplicación.
- components/: Aquí se encuentran todos los componentes Vue de la aplicación.
- composables/: Aquí se encuentran los composables de Vue.
- firebaseConfig.ts: Configuración de Firebase.
- interface/: Aquí se encuentran las interfaces de TypeScript utilizadas en el proyecto.
- layouts/: Aquí se encuentran los layouts de Nuxt.
- main.scss: Estilos globales de la aplicación.
- nuxt.config.ts: Configuración de Nuxt.
- pages/: Aquí se encuentran las páginas de Nuxt.
- public/: Aquí se encuentran los archivos estáticos del proyecto.
- server/: Aquí se encuentra el código del servidor.
- services/: Aquí se encuentran los servicios que interactúan con APIs externas.
- store/: Aquí se encuentra el store de Vuex.
- styles/: Aquí se encuentran los estilos globales del proyecto.
- tests/: Aquí se encuentran las pruebas del proyecto.
- utils/: Aquí se encuentran las funciones de utilidad.
- vitest.config.ts: Configuración de Vitest.

## Pruebas

Para ejecutar las pruebas del proyecto ejecuta el siguiente comando:

```bash
npm run test
```
