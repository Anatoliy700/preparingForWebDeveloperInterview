## Task 1
> Как создать новую ветку в GIT?

~~~bash
git branch new_branch
~~~

***

## Task 2
> Какие еще прикладные программы могут обеспечивать работу сайта?

* web server Apache
* СУБД PostgreSql

***

## Task 3
> Какие текстовые редакторы есть в Linux-подобных системах?

* Nano
* Vim
* Joe

***

## Task 4
> Что означают показатели в выводе команды top?

1 Первая строка выводит данные по порядку:
  * текущее время
  * время работы системы
  * количество открытых пользовательских сессий
  * среднюю загрузку системы, три значения соответствуют загрузке в последнюю минуту, пять минут и пятнадцать минут соответственно.

2 Вторая строка выводит следующие данные:
  * общее количество процессов в системе
  * количество ожидающих событий процессов
  * количество работающих в данный момент процессов
  * количество остановленных процессов
  * количество процессов, ожидающих родительский процесс для передачи статуса завершения

3 В третьей строке приводится информация об использовании центрального процессора:
  * процент использования центрального процессора пользовательскими процессам
  * процент использования центрального процессора системными процессами
  * процент использования центрального процессора процессами с приоритетом
  * процент времени, когда центральный процессор не используется
  * процент использования центрального процессора процессами, ожидающими завершения операций ввода-вывода
  * процент использования центрального процессора обработчиками аппаратных прерываний
  * процент использования центрального процессора обработчиками программных прерываний
  * количество ресурсов центрального процессора "заимствованных" у виртуальной машины гипервизором для других задач

4 В четвертой и пятой строке выводится информация об использовании физической оперативной памяти и раздела подкачки соответственно.

  Значения в порядке следования:
  * общее количество памяти,
  * количество используемой памяти,
  * количество свободной памяти,
  * количество памяти в кэше буферов.


5 Последним источником информации является список процессов, отсортированный по степени использования центрального процессора (по умолчанию).
 
  Значения столбцов списка:
  * PID - идентификатор процесса
  * USER - имя пользователя, который является владельцем процесса
  * PR - приоритет процесса
  * NI - значение "NICE", влияющие на приоритет процесса
  * VIRT - объем виртуальной памяти, используемый процессом
  * RES - объем физической памяти, используемый процессом
  * SHR - объем разделяемой памяти процесса
  * S - указывает на статус процесса: S=sleep (ожидает событий) R=running (работает) Z=zombie (ожидает родительский процесс)
  * %CPU - процент использования центрального процессора данным процессом
  * %MEM - процент использования оперативной памяти данным процессом
  * TIME+ - общее время активности процесса
  * COMMAND - имя процесса

***

## Task 5
> Как перезапустить nginx?

~~~bash
nginx -s reload
~~~

или

~~~bash
servce nginx reload
~~~

***

## Task 6
> Как сделать дамп mysql БД?

~~~bash
mysqldump -u username database > dump.sql
~~~

***

## Task 7
> Как скопировать файл в Linux-подобных системах?

~~~bash
cp filename new_filename
~~~

***

## Task 8
> Как посмотреть занятые сетевые порты в Linux-подобных системах?

~~~bash
lsof -i | grep LISTEN
~~~

***

## Task 9
> Что означают права 0644?

`rw-r--r--`

* `owner` - чтение и запись
* `group` - чтение
* `other` - чтение

***

## Task 10
> Как PHP-файл сделать демоном?

Как минимум добавить в файл создание независимого процесса

~~~php
$child_pid = pcntl_fork();
if( $child_pid ) {
    exit(0);
}
posix_setsid();
~~~

Добавить логику реакции на сигналы ОС

Добавить бесконечный цикл с полезной нагрузкой

***
