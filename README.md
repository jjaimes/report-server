

# Ejecutar en DEV

1. Clonar el repositorio del proyecto
2. Instalar dependencias `npm install
3. Clonar `env template` y renombrar a `env` y completar las variables de entorno en -env
4. Levantar la BD mediante el comando `docket compose up -d`
5. Generar el prisma client mediante la instrucción `npx prisma generate`
6. Ejecutar el proyecto con el comando `npm run start:dev`
