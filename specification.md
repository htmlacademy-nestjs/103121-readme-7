# Инструкции для запуска проекта

В каждом сервисе есть файл с расширением `.env.example`.
На основе него нужно сделать файл с расширением `.env` и заполнить необходимыми данными.

Далее для каждого сервиса нужно сделать команду, которая сгенерирует контейнер (вместо podman может быть docker):

```bash
podman-compose --file ./apps/notify/docker-compose.dev.yml --project-name "readme-notify" --env-file ./apps/notify/notify.env up -d
```

Для запуска сервиса нужно сделать команду типа

```bash
npx nx run blog:serve
```
