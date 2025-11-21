# round-square-test-server

- `npm install`
- запуск postgres: `docker-compose up`
- создать базу и сконфигурировать доступ для sequelize-cli в файле `sequelize.json`
- выполнить миграцию: `npm run sqlz db:migrate`
- (опционально) 'засидить' базу: `npm run sqlz db:seed:all`
- подготовить `.env` файл (см. `.env.example` и `src/config.ts`)
- запуск: `npm start`
