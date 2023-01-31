# Node Services
## Instalacion
1. instalar docker y docker-compose
2. ```bash
    yarn install
   ```
3. Realizar el build y up del docker para `dev`
   ```bash
    docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d --build
   ```
4. Crear la BD SQL `dev`
   - Ingresar al contenedor de servicios
     ```bash
      docker exec -it node-services bash
     ```
   - Crear la BD SQL con el sequelize-cli
     ```bash
      npx sequelize-cli db:create
     ```
   - Generar migraciones de sequelize-cli
     ```bash
      npx sequelize-cli db:migrate
     ```
   - Seed para el primer usuario `super_admin` sequelize-cli
     ```bash
      npx sequelize-cli db:seed:all
     ```
5. Ir `http://localhost:3001/`
