# Analytic 

Сервис на Go для сбора аналитики с лендиногов и экспорта в CSV

Main: Chi + pgx 

WEB UI: Vue.js 

## Запуск 

`go run cmd/analytic/main.go` 

Доступные флаги для запуска: 

```
"a", ":8084", "address and port to run server"      (env "ADDRESS")
"d", "postgres://postgres:postgres@localhost:5432/analytics?sslmode=disable", "database dsn"        (env "DATABASE_DSN")
```

## Запуск web ui 

```
cd ui
npm install
npm run serve
```

# Эндпоинт для обработки отчетов

```
POST /report
{
  "header": {
    "landing": "land_name",
    "user_id": "user_1"
  },
  "result": [
    {
      "id": 1,
      "text": "res_1"
    },
    {
      "id": 2,
      "text": "res_2"
    }
  ]
}
```

## Возможные ответы

```
200 OK: Запрос успешно обработан.
400 Bad Request: Неверный запрос. Поля в заголовке обязательны.
500 Internal Server Error: Ошибка на сервере.
```