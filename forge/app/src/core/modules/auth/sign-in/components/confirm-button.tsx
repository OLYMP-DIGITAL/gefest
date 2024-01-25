/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { View } from 'react-native';
import { useInterval } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';

import RoundedButton from 'core/components/rounded-button';
import { BodyXlRegular } from 'core/components/text/body-xl-regular.text';
import api from 'core/services/api';
import { ErrorResponse } from 'core/types/requests';
import { useToast } from 'react-native-toast-notifications';

interface ConfirmResponse extends ErrorResponse {
  sent: boolean;
  email: string;
}

async function sendComfirm(email: string): Promise<ConfirmResponse> {
  return api.post<ConfirmResponse>('auth/send-email-confirmation', {
    email,
  });
}

interface Props {
  email: string;
}

enum States {
  init,
  timer,
}

const TIMER_TIMER = 4;

export function ConfirmButton({ email }: Props) {
  const { t } = useTranslation();
  const toast = useToast();
  const [text, setText] = useState<string>(t('signIn.checkEmail'));
  const [state, setState] = useState<States>(States.init);
  const [timer, setTimer] = useState<number>(0);
  const [timerText, setTimerText] = useState<string>('');

  useInterval(() => {
    if (state === States.timer && timer !== 0) {
      setTimer(timer - 1);
      setTimerText(`${t('signIn.timerText')}: ${timer} ${t('units.s')}`);
    }

    if (timer === 0) {
      setTimerText('');
    }
  }, 1000);

  const onClick = useCallback(() => {
    setText('');
    setTimer(TIMER_TIMER);
    setState(States.timer);
    sendComfirm(email)
      .then((response) => {
        if (response.sent) {
          toast.show(t('messages.requestSuccess'), {
            type: 'success',
          });
        }
      })
      .catch((error) => {
        console.error('Send confirm is failured', error);

        toast.show(t('messages.requestFailed'), {
          type: 'danger',
        });
      });
  }, [email]);

  return (
    <View style={{ marginVertical: 20 }}>
      <BodyXlRegular text={text} />

      {state === States.timer && <BodyXlRegular text={`${timerText}`} />}

      <RoundedButton
        title={t('signIn.resendEmail')}
        onPress={onClick}
        disabled={timer !== 0}
        secondary
      />
    </View>
  );
}
