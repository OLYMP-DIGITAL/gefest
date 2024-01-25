/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useLanguage } from 'core/hooks/use-language';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getInvestmentStages } from './investment-stage.api';
import { investmentStagesAtom } from './investment-stage.atoms';

export const useInvestmentStages = () => {
  const { language } = useLanguage();
  const [stages, setStages] = useRecoilState(investmentStagesAtom);

  useEffect(() => {
    getInvestmentStages(language).then((response) => {
      if (response.data) {
        setStages(
          response.data.map((responseStage) => responseStage.attributes)
        );
      }
    });
  }, [language]);

  return stages;
};
