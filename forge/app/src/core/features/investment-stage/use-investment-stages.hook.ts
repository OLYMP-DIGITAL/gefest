import { useEffect, useState } from 'react';
import { InvestmentStage } from './investement-sage.types';
import { getInvestmentStages } from './investment-stage.api';

export const useInvestmentStages = () => {
  const [stages, setStages] = useState<InvestmentStage[]>([]);

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

  return stages;
};
