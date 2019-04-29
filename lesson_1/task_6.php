<?php
// Как перевернуть массив? Есть массив array(‘h’, ‘e’, ‘l’, ‘l’, ‘o’) – как из него получить array(‘o’,
//‘l’, ‘l’, ‘e’, ‘h’) ?


// Самый простой способ

$arr = ['h', 'e', 'l', 'l', 'o'];

print_r($arr);

$arrReverse = array_reverse($arr);

print_r($arrReverse);