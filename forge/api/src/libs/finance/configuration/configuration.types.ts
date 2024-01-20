export const ConfigurationUID = 'api::config.config';

export interface Configuration {
  id: number;

  companyValue: number; // Стоимость компаннии в центах
  payloadRedirect: string; // Адрес переадресации после совершения транзакции
  referralCommission: number; // Процент реферальной программы
}

export interface ConfigurationFullQueryResult extends Configuration {
  createdAt: string;
  updatedAt: string;
}
