<?php

function iconName(string $name): string
{
    $nameArr = explode(' ', $name);
    $firstName = $nameArr[0][0];
    $secName = count($nameArr) > 1 ? $nameArr[1][0] : '';

    return $firstName . $secName;
}
