# Дипломный проект на курсе Fullstack-разработчик на JavaScript»

## Cайт-агрегатор просмотра и бронирования гостиниц

### Цель проекта

Цель дипломного проекта - разработать фронтенд- и бэкенд-части для сайта-агрегатора с реализацией возможности бронирования гостиниц на диапазон дат.

-----

### Содержание

- [Чеклист готовности к работе над проектом](#чеклист-готовности-к-работе-над-проектом)
- [Инструкция к работе над проектом](#инструкция-к-работе-над-проектом)
- [Общие требования к интерфейсу приложения](#общие-требования-к-интерфейсу-приложения)
- [Инструменты и дополнительные материалы для выполнения задания](#Инструменты-и-дополнительные-материалы-для-выполнения-задания)
- [Роадмап](#роадмап)
- [Рекомендации по работе над дипломом](#рекомендации-по-работе-над-дипломом)
- [Правила сдачи работы](#правила-сдачи-работы)
- [Критерии оценки](#критерии-оценки)
- [1. Описание базовых модулей](#1-описание-базовых-модулей)
- [1.1. Модуль «Пользователи»](#11-модуль-пользователи)
- [1.2. Модуль «Гостиницы»](#12-модуль-гостиницы)
- [1.3. Модуль «Брони»](#13-модуль-брони)
- [1.4. Модуль «Чат техподдержки»](#14-модуль-чат-техподдержки)
- [2. Описание модулей WEB API](#2-описание-модулей-web-api)
- [2.1.1. Поиск номеров](#211-поиск-номеров)
- [2.1.2. Информация о конкретном номере](#212-информация-о-конкретном-номере)
- [2.1.3. Добавление гостиницы](#213-добавление-гостиницы)
- [2.1.4. Получение списка гостиниц](#214-получение-списка-гостиниц)
- [2.1.5. Изменение описания гостиницы](#215-изменение-описания-гостиницы)
- [2.1.6. Добавление номера](#216-добавление-номера)
- [2.1.7. Изменение описания номера](#217-изменение-описания-номера)
- [2.2. API Модуля «Бронирование»](#22-api-модуля-бронирование)
- [2.2.1. Бронирование номера клиентом](#221-бронирование-номера-клиентом)
- [2.2.2. Список броней текущего пользователя](#222-список-броней-текущего-пользователя)
- [2.2.3. Отмена бронирования клиентом](#223-отмена-бронирования-клиентом)
- [2.2.4. Список броней конкретного пользователя](#224-список-броней-конкретного-пользователя)
- [2.2.5. Отмена бронирования менеджером](#225-отмена-бронирования-менеджером)
- [2.3. API Модуля «Аутентификация и авторизация»](#23-api-модуля-аутентификация-и-авторизация)
- [2.3.1. Вход](#231-вход)
- [2.3.2. Выход](#232-выход)
- [2.3.3. Регистрация](#233-регистрация)
- [2.3.4. Получение пользователя](#234-получение-пользователя)
- [2.4. API Модуля «Управление пользователями»](#24-api-модуля-управление-пользователями)
- [2.4.1. Создание пользователя](#241-создание-пользователя)
- [2.4.2. Получение списка пользователей](#242-получение-списка-пользователей)
- [2.5. API модуля «Чат с техподдержкой»](#25-api-модуля-чат-с-техподдержкой)
- [2.5.1. Создание обращения в поддержку](#251-создание-обращения-в-поддержку)
- [2.5.2. Получение списка обращений в поддержку для клиента](#252-получение-списка-обращений-в-поддержку-для-клиента)
- [2.5.3. Получение списка обращений в поддержку для менеджера](#253-получение-списка-обращений-в-поддержку-для-менеджера)
- [2.5.4. Получение истории сообщений из обращения в техподдержку](#254-получение-истории-сообщений-из-обращения-в-техподдержку)
- [2.5.5. Отправка сообщения](#255-отправка-сообщения)
- [2.5.6. Отправка события, что сообщения прочитаны](#256-отправка-события-что-сообщения-прочитаны)
- [2.5.7. Подписка на сообщения из чата техподдержки](#257-подписка-на-сообщения-из-чата-техподдержки)
- [2.5.8. Закрытие обращения в техподдержку](#258-закрытие-обращения-в-техподдержку)
- [Запуск приложения](#запуск-приложения)

-----
## 1. Описание базовых модулей

### 1.1. Модуль «Пользователи»

Модуль «Пользователи» предназначен для создания, хранения и поиска профилей пользователей.

Модуль «Пользователи» используется функциональными модулями для регистрации и аутентификации.

Данные пользователя хранят в MongoDB.

Модуль реализован в виде NestJS-модуля `UserModule`

Модель данных `User` пользователя содержит поля:

| Название     |    Тип     | Обязательное | Уникальное | По умолчанию |
| ------------ | :--------: | :----------: | :--------: | :----------: |
| \_id         | `ObjectId` |      да      |     да     |              |
| email        |  `string`  |      да      |     да     |              |
| passwordHash |  `string`  |      да      |    нет     |              |
| name         |  `string`  |      да      |    нет     |              |
| contactPhone |  `string`  |     нет      |    нет     |              |
| role         |  `string`  |      да      |    нет     |   `client`   |

---

Модуль «Пользователи» экспортирует сервисы с интерфейсами:

```ts
interface SearchUserParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}
interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ID): Promise<User>;
  findByEmail(email: string, projection?: Object|String|String[]): Promise<User>;
  findAll(params: SearchUserParams): Promise<{ users: User[], count: number }>;
}
```

Поле `role` может принимать одно из значений:

- `client`,
- `admin`,
- `manager`.

При поиске `IUserService.findAll()` поля `email`, `name` и `contactPhone` являются RegExp.

### 1.2. Модуль «Гостиницы»

Модуль «Гостиницы» предназначается для хранения и поиска гостиниц и комнат.

Модуль «Гостиницы» используется функциональными модулями для показа списка мест для бронирования, а также для их добавления, включения и выключения.

Данные хранятся в MongoDB.

Модель данных `Hotel` содержит поля:

| Название    |    Тип     | Обязательное | Уникальное | По умолчанию |
| ----------- | :--------: | :----------: | :--------: | :----------: |
| \_id        | `ObjectId` |      да      |     да     |              |
| title       |  `string`  |      да      |    нет     |              |
| description |  `string`  |     нет      |    нет     |              |
| createdAt   |   `Date`   |      да      |    нет     |              |
| updatedAt   |   `Date`   |      да      |    нет     |              |

Модель данных `HotelRoom` содержит поля:

| Название    |    Тип     | Обязательное | Уникальное | По умолчанию |
| ----------- | :--------: | :----------: | :--------: | :----------: |
| \_id        | `ObjectId` |      да      |     да     |              |
| hotel       | `ObjectId` |      да      |    нет     |              |
| title       |  `string`  |      да      |    нет     |              |
| description |  `string`  |     нет      |    нет     |              |
| images      | `string[]` |     нет      |    нет     |     `[]`     |
| createdAt   |   `Date`   |      да      |    нет     |              |
| updatedAt   |   `Date`   |      да      |    нет     |              |
| isEnabled   | `boolean`  |      да      |    нет     |    `true`    |

Свойство `hotel` использует reference на модель `Hotel`.

---

Модуль «Гостиницы» реализован в виде NestJS-модуля `HotelModule` и экспортирует сервисы с интерфейсами:

```ts
interface SearchHotelParams {
  limit: number;
  offset: number;
  title: string;
}

interface UpdateHotelParams {
  title: string;
  description: string;
  images: string[]
}

interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ObjectId): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: ObjectId, data: UpdateHotelParams): Promise<Hotel>;
}

interface SearchRoomsParams {
  limit: number;
  offset: number;
  title: string;
  hotel: ObjectId;
  dateStart?: Date;
  dateEnd?: Date;
  isEnabled?: boolean;
}

interface UpdateHotelRoomParams {
  description: string;
  title: string;
  hotel: ObjectId;
  isEnabled?: boolean;
  images: string[];
}

interface HotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ObjectId): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ObjectId, data: UpdateHotelRoomParams): Promise<HotelRoom>;
}
```

В методе `search` флаг `isEnabled` принимает только boolean значения и в query передается в виде типа Number:

- `1` — true
- `0` — false

Привидение к boolean производится декоратором @Transform

### 1.3. Модуль «Брони»

Модуль «Брони» предназначен для хранения и получения броней гостиниц конкретного пользователя.

Модуль «Брони» **не использует** модуль «Пользователи» и модуль «Гостиницы» для получения данных.

Модуль «Брони» **не хранит** данные пользователей и гостиниц.

Модуль «Брони» **использует** соединение с базой данных.

Данные хранятся в MongoDB.

Модель данных `Reservation` содержит поля:

| Название  |    Тип     | Обязательное | Уникальное | По умолчанию |
| --------- | :--------: | :----------: | :--------: | :----------: |
| \_id      | `ObjectId` |      да      |     да     |              |
| user      | `ObjectId` |      да      |    нет     |              |
| hotel     | `ObjectId` |      да      |    нет     |              |
| hotelRoom | `ObjectId` |      да      |    нет     |              |
| dateStart |   `Date`   |      да      |    нет     |              |
| dateEnd   |   `Date`   |      да      |    нет     |              |

---

Модуль «Брони» реализован в виде NestJS-модуля `ReservationModule` и экспортирует сервисы с интерфейсами:

```ts
interface ReservationCreateDto {
  user: ObjectId;
  hotel: ObjectId;
  hotelRoom: ObjectId;
  dateStart: Date;
  dateEnd: Date;
}

interface ReservationSearchParams {
  user: ObjectId;
  dateStart: Date;
  dateEnd: Date;
}

interface ReservationBetweenDto {
  dateStart: Date;
  dateEnd: Date;
}

interface IReservation {
  addReservation(data: ReservationCreateDto): Promise<Reservation>;
  removeReservation(id: ObjectId, user?: any): Promise<void>;
  getReservations(filter: ReservationSearchParams): Promise<Reservation[]>;
  getReservationsBetweenDates(data: ReservationBetweenDto): Promise<Reservation[]>;
}
```

Метод `IReservation.addReservation` проверяет, доступен ли номер на заданную дату с помощью метода hasReservation в сервисе ReservationService

```ts
  private hasReservation(data: ReservationCreateDto): Promise<boolean>
```

### 1.4. Модуль «Чат техподдержки»

Модуль «Чат техподдержки» предназначается для хранения обращений в техподдержку и сообщений в чате обращения.

Модуль «Чат техподдержки» используется функциональными модулями для реализации возможности общения пользователей с поддержкой.

Данные чатов хранятся в MongoDB.

Модель данных чата `SupportRequest`содержит поля:

| Название  |     Тип     | Обязательное | Уникальное |
| --------- | :---------: | :----------: | :--------: |
| \_id      | `ObjectId`  |      да      |     да     |
| user      | `ObjectId`  |      да      |    нет     |
| createdAt |   `Date`    |      да      |    нет     |
| messages  | `Message[]` |     нет      |    нет     |
| isActive  |   `bool`    |     нет      |    нет     |

Модель сообщения `Message` должна содержать поля:

| Название |    Тип     | Обязательное | Уникальное |
| -------- | :--------: | :----------: | :--------: |
| \_id     | `ObjectId` |      да      |     да     |
| author   | `ObjectId` |      да      |    нет     |
| sentAt   |   `Date`   |      да      |    нет     |
| text     |  `string`  |      да      |    нет     |
| readAt   |   `Date`   |     нет      |    нет     |

Сообщение считается прочитанным, когда поле `readAt` не пустое.

---

Модуль «Чат техподдержки» реализован в виде NestJS-модуля `SupportChatModule` и должен экспортировать сервисы с интерфейсами:

```ts
interface CreateSupportRequestDto {
  user: ObjectId;
  text: string;
}

interface SendMessageDto {
  author: ObjectId;
  supportRequest: ObjectId;
  text: string;
}

interface MarkMessagesAsReadDto {
  user: ObjectId;
  supportRequest: ObjectId;
  createdBefore: Date;
}

interface GetChatListParams {
  user?: ObjectId;
  isActive: bool;
  limit?: number;
  offset?: number;
}

interface SubscribeToSupportRequestDto  {
    chatId: string
}

interface GetMessagesParams {
    _id: ObjectId;
    user?: ObjectId
}

interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<{ supportRequests: SupportRequest[], count: number }> ;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(_params: GetMessagesParams): Promise<Message[]>;
  subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): void;
}

interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ObjectId): Promise<Message[]>;
}

interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ObjectId): Promise<Message[]>;
  closeRequest(supportRequest: ObjectId): Promise<void>;
}
```

---

1. Метод `ISupportRequestClientService.getUnreadCount` возвращаяет количество сообщений, которые были отправлены любым сотрудником поддержки и не отмечены прочитанным.
2. Метод `ISupportRequestClientService.markMessagesAsRead` выставляет дату(текущую) из `createdBefore` в поле readAt всем сообщениям, которые не были прочитаны и были отправлены не пользователем.
3. Метод `ISupportRequestEmployeeService.getUnreadCount` возвращаяет количество сообщений, которые были отправлены пользователем и не отмечены прочитанными.
4. Метод `ISupportRequestEmployeeService.markMessagesAsRead` выставляет текущую дату из `createdBefore` в поле readAt всем сообщениям, которые не были прочитаны и были отправлены пользователем.
5. Метод `ISupportRequestEmployeeService.closeRequest` меняет флаг `isActive` на `false`.
6. Оповещения реализованы через `EventEmitter`.

## 2. Описание модулей WEB API

## 2.1. API Модуля «Гостиницы»

Бэкенд оформлен в виде отдельного NestJS-модуля.

### **Ограничения**

Если пользователь не аутентифицирован или его роль `client`, то при поиске всегда используется флаг `isEnabled: true`.

### **2.1.1. Поиск номеров**

Выдача результатов поиска. Производится группировка по полю `hotel`

На одной странице отображается 10 отелей. Если найдено менее 10 отелей, пагинация не отображается. При переходе на следующую страницу пагинации, происходит прокрутка вверх к первому результату.

#### **Адрес**

```http
GET /api/common/hotel-rooms
```

#### **Query-параметры**

- limit — количество записей в ответе;
- offset — сдвиг от начала списка;
- hotel — ID гостиницы для фильтра;
- title — название гостиницы для фильтра;
- isEnabled — Number значение для фильтра. Приводится к Boolean декоратором @Transform;
- dateStart — дата заезда для фильтра;
- dateEnd — дата выезда для фильтра.

#### **Формат ответа**

```json
[
  {
    "_id": ObjectId,
    "hotel": {
      "_id": ObjectId,
      "title": string,
      "description": string,
      "images": [ string ],
      "createdAt": string,
      "updatedAt": string,
    },
    "hotelRooms": [ HotelRoom ]
  }
]
```

#### **Доступ**

Доступно всем пользователям, включая неаутентифицированных.

### **2.1.2. Информация о конкретном номере**

#### **Описание**

Получение подробной информации о номере.

#### **Адрес**

```http
GET /api/common/hotel-rooms/:id
```

#### **Query-параметры**

Отсутствуют.

#### **Формат ответа**

```json
{
  "_id": string,
  "title": string,
  "description": string,
  "images": [string],
  "isEnabled": boolean,
  "hotel": {
    "_id": string,
    "title": string,
    "description": string
  }
}
```

#### **Доступ**

Доступно всем пользователям, включая неаутентифицированных.

### **2.1.3. Добавление гостиницы**

#### **Описание**

Добавление гостиницы администратором.

#### **Адрес**

```http
POST /api/admin/hotels/
```

#### **Body-параметры**

Этот запрос предполагает загрузку файлов и должен использовать формат `multipart/form-data`.

```form-data
{
  title: string,
  description: string,
  images[]: File
}
```

#### **Формат ответа**

```json
{
  "_id": string,
  "title": string,
  "description": string,
  "images" string[]
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `admin`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `admin`.

### **2.1.4. Получение списка гостиниц**

#### **Описание**

Получение списка гостиниц администратором.

#### **Адрес**

```http
GET /api/admin/hotels/
```

#### **Query-параметры**

- limit - количество записей в ответе;
- offset - сдвиг от начала списка.

#### **Формат ответа**

```json
{
  "_id": string,
  "title": string,
  "description": string,
  "images" string[]
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `admin`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `admin`.

### **2.1.5. Изменение описания гостиницы**

#### **Описание**

Изменение описания гостиницы администратором.

#### **Адрес**

```http
PUT /api/admin/hotels/:id
```

#### **Body-параметры**

Этот запрос предполагает загрузку файлов и должен использовать формат `multipart/form-data`.

```form-data
  title: string
  description: string
  images[]: File
```

#### **Формат ответа**

```json
{
  "_id": string,
  "title": string,
  "description": string
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `admin`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `admin`.

### **2.1.6. Добавление номера**

#### **Описание**

Добавление номера гостиницы администратором.

#### **Адрес**

```http
POST /api/admin/hotel-rooms/
```

#### **Body-параметры**

Этот запрос предполагает загрузку файлов и должен использовать формат `multipart/form-data`.

```form-data
description: string
hotelId: string
images[]: File
```

#### **Формат ответа**

```json
{
  "_id": string,
  "description": string,
  "images": [string],
  "isEnabled": boolean,
  "hotel": {
    "_id": string,
    "title": string,
    "description": string
  }
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `admin`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `admin`.

### **2.1.7. Изменение описания номера**

#### **Описание**

Изменение описания номера гостиницы администратором.

#### **Адрес**

```http
PUT /api/admin/hotel-rooms/:id
```

#### **Body-параметры**

Этот запрос предполагает загрузку файлов и дожен использовать формат `multipart/form-data`.

```form-data
description: string
hotelId: string
isEnabled: boolean
images[]: File | string
```

При обновлении одновременно отправляется список ссылок на уже загруженные картинки и список файлов с новыми картинками.

#### **Формат ответа**

```json
{
  "_id": string,
  "description": string,
  "images": [string],
  "isEnabled": boolean,
  "hotel": {
    "_id": string,
    "title": string,
    "description": string
  }
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `admin`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `admin`.

### 2.2. API Модуля «Бронирование»

В виде отдельного NestJS-модуля.

### **2.2.1. Бронирование номера клиентом**

#### **Описание**

Создаёт бронь на номер на выбранную дату для текущего пользователя.

#### **Адрес**

```http
POST /api/client/reservations
```

#### **Body-параметры**

```json
{
  "hotelRoom": string,
  "dateStart": string,
  "dateEnd": string
}
```

#### **Формат ответа**

```json
{
  "dateStart": string,
  "dateEnd": string,
  "hotelRoom": {
    "description": string,
    "images": [string]
  },
  "hotel": {
    "title": string,
    "description": string
  }
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `client`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `client`;
- `400` - если номера с указанным ID не существует или он отключён.

### **2.2.2. Список броней текущего пользователя**

#### **Описание**

Список броней текущего пользователя.

#### **Адрес**

```http
GET /api/client/reservations
```

#### **Формат ответа**

```json
[
  {
    "startDate": string,
    "endDate": string,
    "hotelRoom": {
      "description": string,
      "images": [string]
    },
    "hotel": {
      "title": string,
      "description": string
    }
  }
]
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `client`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `client`.

### **2.2.3. Отмена бронирования клиентом**

#### **Описание**

Отменяет бронь пользователя.

#### **Адрес**

```http
DELETE /api/client/reservations/:id
```

#### **Формат ответа**

Пустой ответ.

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `client`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `client`;
- `403` - если `ID` текущего пользователя не совпадает с `ID` пользователя в брони;
- `400` - если брони с указанным ID не существует.

### **2.2.4. Список броней конкретного пользователя**

#### **Описание**

Список броней конкретного пользователя.

#### **Адрес**

```http
GET /api/manager/reservations/:userId
```

#### **Формат ответа**

```json
[
  {
    "startDate": string,
    "endDate": string,
    "hotelRoom": {
      "description": string,
      "images": [string]
    },
    "hotel": {
      "title": string,
      "description": string
    }
  }
]
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `manager`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `manager`.

### **2.2.5. Отмена бронирования менеджером**

#### **Описание**

Отменяет бронь пользователя по id брони.

#### **Адрес**

```http
DELETE /api/manager/reservations/:id
```

#### **Формат ответа**

Пустой ответ.

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `manager`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `manager`;
- `400` - если брони с указанным ID не существует.

## 2.3. API Модуля «Аутентификация и авторизация»

В виде отдельного NestJS-модуля.

Модуль «Аутентификация и авторизация» предназначен для:

- управления сессией пользователя,
- регистрации пользователей.

Хранение сессии организовано посредством библиотеки passport.js через два JWT-токена access и refresh.

Access-токен с коротким сроком действия. При истечении на сервер приходит запрос на обновление токена. Refresh токен хранится и передается в Cookies. Access-токен в заголовке Authorization

Адрес запроса на обновление access-токена
```http
GET /api/auth/refresh
```

Аутентификация пользователя производится с помощью модуля «Пользователи». Каждому пользователю назначается одна из ролей - клиент, администратор, консультант.

### **2.3.1. Вход**

#### **Описание**

Стартует сессию пользователя и выставляетя два токена access и refresh.

#### **Адрес**

```http
POST /api/auth/login
```

#### **Body-параметры**

```json
{
  "email": string,
  "password": string
}
```

#### **Формат ответа**

```json
{
  "user": {
    "_id": string,
    "email": string,
    "name": string,
    "contactPhone": string
  },
  "token": string
}
```

#### **Доступ**

Доступно только не аутентифицированным пользователям.

#### **Ошибки**

- `401` - если пользователя с указанным email не существует или пароль неверный.

### **2.3.2. Выход**

#### **Описание**

Завершает сессию пользователя и удаляет Cookies Refresh-токена.

#### **Адрес**

```http
POST /api/auth/logout
```

#### **Формат ответа**

```json
{
  "success": true
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям.

### **2.3.3. Регистрация**

#### **Описание**

Позволяет создать пользователя с ролью `client` в системе.

#### **Адрес**

```http
POST /api/client/register
```

#### **Body-параметры**

```json
{
  "email": string,
  "password": string,
  "name": string,
  "contactPhone": string
}
```

#### **Формат ответа**

```json
{
  "user": {
    "_id": string,
    "email": string,
    "name": string,
    "contactPhone": string
  },
  "token": string
}
```

### **2.3.4. Получение пользователя**

#### **Описание**

Позволяет получить данные по пользователю и при необходимости обновить Access-токен.

#### **Адрес**

```http
GET /api/auth/get-user
```

#### **Query-параметры**

Отсутсвуют

#### **Формат ответа**

```json
{
  "user": {
    "_id": string,
    "email": string,
    "name": string,
    "contactPhone": string
  },
  "token": string
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям.

#### **Ошибки**

- `401` - если пользователь не авторизирован.
- `400` - если Refresh токен истек

## 2.4. API Модуля «Управление пользователями»

### **2.4.1. Создание пользователя**

#### **Описание**

Позволяет пользователю с ролью `admin` создать пользователя в системе.

#### **Адрес**

```http
POST /api/admin/users/
```

#### **Body-параметры**

```json
{
  "email": string,
  "password": string,
  "name": string,
  "contactPhone": string,
  "role": string
}
```

#### **Формат ответа**

```json
{
  "_id": string,
  "email": string,
  "name": string,
  "contactPhone": string,
  "role": string
}
```

#### **Доступ**

Доступно только пользователям с ролью `admin`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `admin`.

### **2.4.2. Получение списка пользователей**

#### **Описание**

Позволяет пользователю с ролью `admin` создать пользователя в системе.

#### **Адрес**

```http
GET /api/admin/users/
GET /api/manager/users/
```

#### **Query-параметры**

- limit - количество записей в ответе;
- offset - сдвиг от начала списка;
- name - фильтр по полю;
- email - фильтр по полю;
- contactPhone - фильтр по полю.

#### **Формат ответа**

```json
[
  {
    "_id": string,
    "email": string,
    "name": string,
    "contactPhone": string
  }
]
```

#### **Доступ**

```http
GET /api/admin/users/
```

Доступно только пользователям с ролью `admin`.

```http
GET /api/manager/users/
```

Доступно только пользователям с ролью `manager`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

## 2.5. API модуля «Чат с техподдержкой»

### **2.5.1. Создание обращения в поддержку**

#### **Описание**

Позволяет пользователю с ролью `client` создать обращение в техподдержку.

#### **Адрес**

```http
POST /api/client/support-requests/
```

#### **Body-параметры**

```json
{
  "text": string
}
```

#### **Формат ответа**

```json
[
  {
    "_id": string,
    "createdAt": string,
    "isActive": boolean,
    "hasNewMessages": boolean
  }
]
```

#### **Доступ**

Доступно только пользователям с ролью `client`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

### **2.5.2. Получение списка обращений в поддержку для клиента**

#### **Описание**

Позволяет пользователю с ролью `client` получить список обращений для текущего пользователя.

#### **Адрес**

```http
GET /api/client/support-requests/
```

#### **Query-параметры**

- limit - количество записей в ответе;
- offset - сдвиг от начала списка;
- isActive - фильтр по полю.

#### **Формат ответа**

```json
{
  "supportRequests": [
    {
      "_id": string,
      "createdAt": string,
      "isActive": boolean,
      "hasNewMessages": boolean
    }
  ],
  "count": number
}
```

#### **Доступ**

Доступно только пользователям с ролью `client`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

### **2.5.3. Получение списка обращений в поддержку для менеджера**

#### **Описание**

Позволяет пользователю с ролью `manager` получить список обращений от клиентов.

#### **Адрес**

```http
GET /api/manager/support-requests/
```

#### **Query-параметры**

- limit - количество записей в ответе;
- offset - сдвиг от начала списка;
- isActive - фильтр по полю.

#### **Формат ответа**

```json
[
  {
    "_id": string,
    "createdAt": string,
    "isActive": boolean,
    "hasNewMessages": boolean,
    "client": {
      "_id": string,
      "name": string,
      "email": string,
      "contactPhone": string
    }
  }
]
```

#### **Доступ**

Доступно только пользователям с ролью `manager`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

### **2.5.4. Получение истории сообщений из обращения в техподдержку**

#### **Описание**

Позволяет пользователю с ролью `manager` или `client` получить все сообщения из чата.

#### **Адрес**

```http
GET /api/common/support-requests/:id/messages
```

#### **Формат ответа**

```json
[
  {
    "_id": string,
    "createdAt": string,
    "text": string,
    "readAt": string,
    "author": {
      "_id": string,
      "name": string
    }
  }
]
```

#### **Доступ**

Доступно только пользователям с ролью `manager` и пользователю с ролью `client`, который создал обращение.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

### **2.5.5. Отправка сообщения**

#### **Описание**

Позволяет пользователю с ролью `manager` или `client` отправлять сообщения в чат.

#### **Адрес**

```http
POST /api/common/support-requests/:id/messages
```

#### **Body-параметры**

```json
{
  "text": string
}
```

#### **Формат ответа**

```json
[
  {
    "_id": string,
    "createdAt": string,
    "text": string,
    "readAt": string,
    "author": {
      "_id": string,
      "name": string
    }
  }
]
```

#### **Доступ**

Доступно только пользователям с ролью `manager` и пользователю с ролью `client`, который создал обращение.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

### **2.5.6. Отправка события, что сообщения прочитаны**

#### **Описание**

Позволяет пользователю с ролью `manager` или `client` отправлять отметку, что сообщения прочитаны.

#### **Адрес**

```http
POST /api/common/support-requests/:id/messages/read
```

#### **Body-параметры**

```json
{
  "createdBefore": string
}
```

#### **Формат ответа**

```json
{
  "success": true
}
```

#### **Доступ**

Доступно только пользователям с ролью `manager` и пользователю с ролью `client`, который создал обращение.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

### **2.5.7. Подписка на сообщения из чата техподдержки**

#### **Описание**

Позволяет пользователю с ролью `manager` или `client` получать новые сообщения в чате через WebSocket.

#### **Команда**

message: subscribeToChat
payload: chatId

#### **Формат ответа**

```json
{
  "_id": string,
  "createdAt": string,
  "text": string,
  "readAt": string,
  "author": {
    "_id": string,
    "name": string
  }
}
```

#### **Доступ**

Доступно только пользователям с ролью `manager` и пользователю с ролью `client`, который создал обращение.

### **2.5.8. Закрытие обращения в техподдержку**

#### **Описание**

Позволяет пользователю с ролью `manager` закрыть обращение в техподдержку.

#### **Адрес**

```http
GET /api/common/support-requests/:id/close
```

#### **Формат ответа**

```json
{
  "_id": string,
  "createdAt": string,
  "text": string,
  "readAt": string,
  "author": {
    "_id": string,
    "name": string
  }
}
```

#### **Доступ**

Доступно только пользователям с ролью `manager`.

## Запуск приложения

Для запуска приложения в корне проекта находятся две папки `frontend` и `backend`, в которых находятся:

- `package.json` и `package-lock.json` с описанными зависимостями,
- `README.me` с вариантами запуска.

## Environment variables

Для запуска backend необходимо использовать переменные среды 

Пример файла .env:
```bash
  PORT=4000
  MONGO_HOST=localhost
  MONGO_PORT=27017
  MONGO_USER={{ логин БД }}
  MONGO_PASS={{ пароль БД }}
  MONGO_DB_NAME={{ имя БД }}
  UPLOAD_DEST=./upload
  JWT_SECRET_KEY={{ секретный ключ JWT }}
  JWT_EXPIRATION_TIME=1h
  JWT_SECRET_KEY_REFRESH_TOKEN={{ секретный ключ refresh токена JWT }}
  JWT_EXPIRATION_TIME_REFRESH_TOKEN=1d
  COOKIES_EXPIRATION_TIME=8.64e+7
```

Для запуска fronend необходимо использовать переменные среды 

Пример файла .env:
```bash
  REACT_APP_SERVER_HOST=localhost
  REACT_APP_SERVER_PORT=4000
```

Пример списка переменных находятся в корнях папок `frontend` и `backend` под названием `.env-example`
