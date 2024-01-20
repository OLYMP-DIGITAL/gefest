export async function getUserEarnings({ userId }: Options) {
  try {
    const earnings = strapi
      .query('api::referral-earning.referral-earning')
      .findMany({
        where: {
          referrer: {
            id: userId,
          },
        },
      });

    return earnings;
  } catch (error) {
    strapi.log.error(
      `Ошибка при получении реферальных начислений: ${error.message}`
    );
  }
}

interface Options {
  userId: number;
}
