/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */

/**
 * =============== Функция, которая делает переданный цвет темнее ==============
 *
 * Эта функция принимает два аргумента:
 *
 * color - цвет в формате HEX
 * amount - количество, на которое необходимо затемнить цвет.
 * Значение может быть положительным или отрицательным.
 *
 * Функция работает следующим образом:
 *
 * - Она разбирает цвет на компоненты RGB.
 * - Она уменьшает значение каждого компонента на заданное количество.
 * - Если значение компонента меньше 0, она приводит его к 0.
 * - Она возвращает новый цвет в формате HEX.
 */

export function darkenColor(color: string, amount: number) {
  // Разбираем цвет на компоненты RGB
  const match = color.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);

  if (match) {
    let [r, g, b] = match.slice(1);

    // Уменьшаем значение каждого компонента на заданное количество
    r = parseInt(r, 16) - amount;
    g = parseInt(g, 16) - amount;
    b = parseInt(b, 16) - amount;

    // Если значение компонента меньше 0, приводим его к 0
    r = Math.max(r, 0);
    g = Math.max(g, 0);
    b = Math.max(b, 0);

    // Возвращаем новый цвет в формате HEX
    return `#${parseInt(r, 16)}${parseInt(g, 16)}${parseInt(b, 16)}`;
  }
}
