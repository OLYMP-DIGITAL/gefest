import { useEffect, useState } from 'react';
import { InvestmentStage } from './investement-sage.types';
import { getInvestmentStages } from './investment-stage.api';

export const useCurrentStage = () => {
  const [stage, setStage] = useState<InvestmentStage | null>(null);
  const [stages, setStages] = useState<InvestmentStage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getInvestmentStages().then((response) => {
      console.log('Goted investment stages', response);

      if (response.data) {
        setStages(
          response.data.map((responseStage) => responseStage.attributes)
        );
      }
    });
  }, []);

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

  return { stages, stage, loading };
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

export function getCurrentPeriod(
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
