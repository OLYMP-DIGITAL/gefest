import { InvestmentStage } from 'core/features/investment-stage/investement-sage.types';
import { useInvestmentStages } from 'core/features/investment-stage/use-investment-stages.hook';
import { TextBody } from 'core/ui/components/typography/text-body';
import { TextHeadline } from 'core/ui/components/typography/text-headline';
import { TextTitle } from 'core/ui/components/typography/text-title';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const StepText = () => {
  const { t } = useTranslation();
  const stages = useInvestmentStages();
  const [loading, setLoading] = useState<boolean>(true);
  const [stage, setStage] = useState<InvestmentStage | null>(null);

  useEffect(() => {
    if (Array.isArray(stages)) {
      const startDates: [string, string][] = stages.map((stage) => [
        stage.start,
        stage.end,
      ]);
      // const closesDate: Date | null = findClosestDate(startDates);
      const closesDate = getCurrentPeriod(startDates);

      if (closesDate) {
        setStage(
          stages.find(
            (stage) =>
              new Date(stage.start).getDate() ===
              new Date(closesDate[0]).getDate()
          ) || null
        );
      }

      setLoading(false);
    }
  }, [stages]);

  return (() => {
    if (loading) {
      return <TextBody>{t('wallet.stagesLoading')}</TextBody>;
    }

    if (!stage) {
      return <TextTitle>{t('wallet.stagesIsFinished')}</TextTitle>;
    }

    return (
      <>
        <TextHeadline>{stage.title}</TextHeadline>
        <TextBody>{stage.description}</TextBody>
        <TextTitle>
          {t('wallet.stagesLimit')}: {stage.max / 100}$
        </TextTitle>
      </>
    );
  })();
  // <H3Text text={t('wallet.stepLabel')} />
};

function findClosestDate(dates: string[]): Date | null {
  const currentDate = new Date();

  // Функция для вычисления разницы между датами
  function dateDiffInMilliseconds(a: Date, b: Date): number {
    return Math.abs(a.getTime() - b.getTime());
  }

  // Инициализируем переменную для хранения ближайшей даты
  let closestDate: Date | null = null;

  // Инициализируем переменную для хранения минимальной разницы в миллисекундах
  let minDifference = Infinity;

  // Проходим по каждой дате в массиве и находим ближайшую к текущей
  for (const dateStr of dates) {
    const date = new Date(dateStr);
    const difference = dateDiffInMilliseconds(currentDate, date);

    // Если разница меньше текущей минимальной разницы, обновляем значения
    if (difference < minDifference) {
      minDifference = difference;
      closestDate = date;
    }
  }

  return closestDate;
}

function getCurrentPeriod(
  datesArray: [string, string][]
): [string, string] | null {
  const currentDate = new Date();

  for (const [startDate, endDate] of datesArray) {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    if (currentDate >= startDateTime && currentDate <= endDateTime) {
      return [startDate, endDate];
    }
  }

  return null;
}
