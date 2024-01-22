/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { InvestmentStage } from '../../stages/stages.types';

export const getCurrentStage = (
  stages: InvestmentStage[]
): InvestmentStage | null => {
  const startDates: [string, string][] = stages.map((stage) => [
    stage.start,
    stage.end,
  ]);
  // const closesDate: Date | null = findClosestDate(startDates);
  const closesDate = getCurrentPeriod(startDates);

  if (closesDate) {
    console.log('NEAREST STAGE', {
      startDates,
      closesDate,
    });

    return stages.find((stage) => stage.start === closesDate[0]) || null;
  }

  return null;
};

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
