export const FINANCE_LOG_KEY = 'FINANCE_LOG_KEY';

export const financeLog = (message: string, data?: any) => {
  console.log(`[${FINANCE_LOG_KEY}] ${message}`, data);
};

export const useFinance = () => {
  financeLog('Inicializing...');
};
