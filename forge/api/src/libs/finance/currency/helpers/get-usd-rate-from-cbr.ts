/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
export async function getUSDRateFromCBR() {
  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');

    if (!response.ok) {
      console.error('Ошибка получения данных от Центрального банка России.');
      return null;
    }

    const data: any = await response.json();

    const usdRateInRubles = Math.trunc(data.Valute.USD.Value * 100); // Возвращаем результат в копейках
    console.log(`Текущий курс доллара к рублю: ${usdRateInRubles} коп.`);

    return usdRateInRubles;
  } catch (error) {
    console.error('Произошла ошибка при отправке запроса:', error.message);
    return null;
  }
}
