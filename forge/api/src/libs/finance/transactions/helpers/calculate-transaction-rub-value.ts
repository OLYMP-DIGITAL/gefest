/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */

import { getUSDRateFromCBR } from '../../currency/helpers/get-usd-rate-from-cbr';
import { getCurrentShareValue } from '../../shares/get-current-share-value';

export const calculateTransactionRubValue = async (
  count: number // количество приобретаемых долей
): Promise<{
  rate: number; // курс доллара в копейках
  rubs: number; // рублей для совершения покупки долей
}> => {
  try {
    // Курс доллара в копейках
    const rate: number = await getUSDRateFromCBR();

    if (!rate) {
      throw new Error('Неудалось получить курс доллара');
    }

    strapi.log.info('[MAKE TRANSACTION] Получен курс доллара: ', rate);
    strapi.log.info('[MAKE TRANSACTION] Получение стоимости доли...');

    const shareValue = await getCurrentShareValue();

    // =============== Сумма в рублях для создания тразакции =================
    // Цена долей в центах по последней цене акции (в центах)
    const cents: number = shareValue.value * count;

    // Перевод цены покупаемых долей в рубли
    const kopeck: number = (cents * rate) / 100;

    // Добавление 5%
    const additionalPercent = 5;
    const finalAmountRubls = (kopeck * (1 + additionalPercent / 100)) / 100;

    return {
      rate,
      rubs: finalAmountRubls,
    };
  } catch (error) {
    strapi.log.error(error);
  }
};
