import { useEffect, useState } from 'react';
import { InvestmentStage } from './investement-sage.types';
import { getInvestmentStages } from './investment-stage.api';
import { useLanguage } from 'core/hooks/use-language';

export const useInvestmentStages = () => {
  const { language } = useLanguage();
  const [stages, setStages] = useState<InvestmentStage[]>([]);

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
