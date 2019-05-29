## Task 1
> Укажите отличия между PHP 5.6 и 7 (как можно больше). Какие из них вы
считаете важными и удобными?

Обратите особое внимание на следующие пункты:
* В PHP 7.0 появляется typehinting для входящих параметров, который позволяет указывать
типы bool , float , int , string . В PHP 5.6 допустимы только self , array , callable;
* Также в 7.0 появляется typehinting для возвращаемых значений (ранее этого не было
совсем);
* В 7.0 при помощи define можно создавать константы-массивы. В 5.6 это было возможно
только для const;
* В PHP 7.0 можно создавать анонимные классы через new class.

***

## Task 2
> Чем отличается __autoload от spl_autoload_register?

Функция `__autoload` появилась в PHP 5 для автоматической загрузки скриптов с объявлениями классов – вместо бесконечных инструкций `require()`.
 Но при этом в системе может быть только один `autoload`, и весь код автозагрузки нужно
помещать в него. В настоящее время функция объявлена устаревшей.
`Spl_autoload_register` регистрирует собственный автозагрузчик в списке автозагрузки, не
ограничивая их общее количество.

***

## Task 3
> Что такое ECMAScript? Чем он отличается от JavaScript?

JS был создан в качестве скриптового язык для Netscape. В то же время Microsoft создали свой
скриптовый язык для Internet Explorer – JScript. Очевидно, что использование разных языков под
разные браузеры неудобно. Поэтому Netscape инициировали процесс стандартизации, результатом
которого стал стандарт ECMAscript, который не привязан к браузерам и не имеет средств
ввода/вывода. Именно к этому стандарту пришли более поздние версии Javascript и JScript. Также
не его основе был создан ActionScript .

Сейчас Javascript состоит из трех фундаментальных блоков:
* Ядро (полностью соответствует стандарту ECMAscript );
* Document Object model ( DOM );
* Browser Object Model ( BOM );

Можно отметить, что язык Javascript является надмножеством стандарта ECMAscript , так как он
реализует короткие лямбда-функции, генераторы ( yield ) и многие другие уникальные возможности.
Однако только Firefox поддерживает Javascript в полной мере, а в других браузерах гарантий нет.

***

## Task 4
> Какие типы БД вы знаете?

Основные БД:
* Реляционные БД ( MySQL , Oracle );
* Документо-ориентированные ( MongoDB );
* Объектно-ориентированные ( Postgre ).

***

## Task 5
> Для чего нужны составные индексы в БД?

MySQL при выполнении запроса может использовать только один индекс для одного шага плана
выполнения. Поэтому для запросов, использующих несколько колонок для фильтрации данных, нужно
применять составные индексы.

Например, для такого запроса:

~~~sql
SELECT * FROM users WHERE age = 29 AND gender = 'male';
~~~

… нужно создать индекс на обе колонки:

~~~sql
CREATE INDEX age_gender ON users(age, gender);
~~~

Важна очередность колонок в индексе. Колонки, использующиеся в условиях `WHERE`, ставят в
начало индекса. Колонки из `ORDER BY` — в конец. Если же производится поиск не по сравнению, а по
диапазону, MySQL пытается применять часть индекса для выполнения запроса.

Составные индексы применимы для сортировок. Например, для такого запроса:

~~~sql
SELECT * FROM users WHERE gender = 'male' ORDER BY age;
~~~

… нужен будет индекс с другим порядком полей, так как сортировка выполняется после фильтрации:

~~~sql
CREATE INDEX gender_age ON users(gender, age);
~~~

***

## Task 6
> Практическая задача

Стек инструментов:
* NGINX в качестве веб-сервера для обработки HTTP-запросов;
* PHP-FPM в качестве интерпретатора;
* MySQL или PostgreSQL (на ваш вкус) в качестве БД;
* Redis или Memcache для кэширования результатов (данных будет много по условию
задачи);
* Как минимум jQuery в части фронтенда для более удобной организации событий и
AJAX-запросов.

Чтобы построить схему БД, потребуется знание понятий нормализации и нормальных форм хранения
данных в реляционных БД. Сначала можно абстрагироваться от вспомогательных свойств конкретной
новости или комментария и сосредоточиться на базовых сущностях:
1. Новость;
2. Комментарий;
3. Пользователь;
4. Роль пользователя.

Схема БД будет выглядеть примерно так:

~~~sql
CREATE TABLE news (
    id INT PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    preview TEXT NOT NULL,
    content TEXT NOT NULL,
    datetime_create TIMESTAMP NOT NULL
);

CREATE TABLE users (
    id INT PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(256)
);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL    
);

CREATE TABLE comments (
    id INT PRIMARY KEY,
    news_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    datetime_create TIMESTAMP NOT NULL,
    FOREIGN KEY (news_id) REFERENCES news(id),        
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_roles (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);


~~~

Расстановка индексов зависит от формулировки задачи
По мимо primary-индексов необходимы индексы:

* Comments.id_news – выборка комментариев по id новости будет производиться почти
всегда;
* Comments.id_user – выборка по id пользователя может пригодиться для его личного
кабинета, где можно просмотреть все свои комментарии;
* User_roles.(id_user, id_role) – поскольку предполагается разграничение прав
пользователей на комментирование, довольно частой задачей будет выборка ролей
пользователя (составной индекс в помощь).

***

## Task 7
> a. Напишите запрос, который будет отвечать за пагинацию новостей или комментариев.

~~~sql
SELECT * FROM news WHERE id > 20 limit 10;
~~~

> b. Где лучше сортировать выводимые данные – на уровне БД или логики? Почему?

MySQL не поддерживает индексацию для данных, упорядоченных по DESC. Поэтому индекс может быть неэффективен. 
С другой стороны, если речь идет о большом объеме данных, передаваемых на бэкенд, то при возможности их лучше сортировать
на уровне БД.

Для правильного решения в каждой из ситуаций нужно оценивать:
* Объем данных;
* Сложность сортировки;
* Ресурсы сервера.

***

## Task 8
> Нужно обеспечить хранение большого списка файлов в системе CentOS. Как организовать
структуру директорий?

Если предложить сразудобавить базу данных, решение станет сложно масштабируемым.
Если убрать базу данных,напрашивается решение со складированием всех файлов в отдельную директорию. И здесь
возникнет проблема с поиском и листингом директории с файлами, так как при каждой попытке
выполнения команд типа ls ОС будет перестраивать список файлов. Это потребует много ресурсов.

Для решения стоит раскладывать файлы по папкам. Для более равномерного распределения делать
это надо не по именам, а по хэшам имен. 

От хэша берется три первых символа, и файл кладется в соответствующую директорию.
Таким образом, по имени входящего файла всегда можно будет получить его адрес на сервере.
После этого можно вводить масштабируемое хранилище, которое будет хранить информацию о
файлах. Но лучше, если это будет что-то полегче, чем MySQL .