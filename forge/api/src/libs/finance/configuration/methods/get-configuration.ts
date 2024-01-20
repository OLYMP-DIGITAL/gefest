import { Configuration, ConfigurationUID } from '../configuration.types';

export async function getConfiguration() {
  const configuration: Configuration = await strapi
    .query(ConfigurationUID)
    .findOne({
      select: ['id', 'companyValue', 'payloadRedirect', 'referralCommission'],
    });
  // const value = await strapi.entityService.findOne(ConfigurationUID, 1);

  return configuration;
}
