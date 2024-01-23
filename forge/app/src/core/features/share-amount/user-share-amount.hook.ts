/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useRecoilState } from 'recoil';
import { shareAmountAtom } from './share-amount.atom';
import { useEffect } from 'react';
import { getShareAmount } from './share-amount.api';

export const useShareAmount = () => {
  const [shareAmount, setShareAmount] = useRecoilState(shareAmountAtom);

  useEffect(() => {
    getShareAmount().then((response) => {
      setShareAmount(response.data[response.data.length - 1]?.attributes.value);
    });
  }, []);

  return shareAmount;
};
