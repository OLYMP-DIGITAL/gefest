import { Configuration } from '../../configuration/configuration.types';
import { getConfiguration } from '../../configuration/methods/get-configuration';

/**
 * Считает сумму в центах которую получит реферер
 * @param value сумма покупаемых акций в центах
 * @returns сколько получит пользователь от пользователя указавшего ref. id
 */
export const calculateReferralValue = async (value: number) => {
  try {
    const configuration = await getConfiguration();

    if (!configuration) {
      throw new Error('Неудалось получить реферальный процент');
    }

    if (configuration) {
      return (value / 100) * configuration.referralCommission;
    }
  } catch (error) {
    console.error(
      '[Произошла ошибка при вычислении реферального процента]',
      error
    );
  }

  return null;
};
