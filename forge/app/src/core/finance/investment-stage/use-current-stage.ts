/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentInvestmentStageAtom,
  investmentStagesAtom,
} from './investment-stage.atoms';

export const useCurrentStage = () => {
  const stages = useRecoilValue(investmentStagesAtom);
  const [currentStage, setCurrentStage] = useRecoilState(
    currentInvestmentStageAtom
  );

  useEffect(() => {
    const startDates: [string, string][] = stages.map((stage) => [
      stage.start,
      stage.end,
    ]);
    // const closesDate: Date | null = findClosestDate(startDates);
    const closesDate = getCurrentPeriod(startDates);

    if (closesDate) {
      setCurrentStage(
        stages.find(
          (stage) =>
            new Date(stage.start).getDate() ===
            new Date(closesDate[0]).getDate()
        ) || null
      );
    }
  }, [stages]);

  return currentStage;
};

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
