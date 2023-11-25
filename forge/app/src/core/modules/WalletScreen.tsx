import RoundedButton from 'core/components/rounded-button';
import React, { useCallback } from 'react';
import { View } from 'react-native';

const SHOP_ID = '284512';
const APP_KEY = 'test_K6ytkqh91lioiAtww7Gp0HJLxJRlvXPaSwSc6drYaoU';
const RANDOM_CODE = 'any-random-string-in-my-code';

const WalletScreen = () => {
  const onTestPress = useCallback((price: number) => {
    console.log('Pay pushed:', price);

    // fetch('https://api.yookassa.ru/v3/payments', {
    //   method: 'POST',
    //   headers: {
    //     'Idempotence-Key': RANDOM_CODE,
    //     'Content-Type': 'application/json',
    //     Authorization: 'Basic ' + btoa(`${SHOP_ID}:${APP_KEY}`),
    //   },
    //   // body: '{\n        "amount": {\n          "value": "100.00",\n          "currency": "RUB"\n        },\n        "capture": true,\n        "confirmation": {\n          "type": "redirect",\n          "return_url": "https://www.example.com/return_url"\n        },\n        "description": "Заказ №1"\n      }',
    //   body: JSON.stringify({
    //     amount: {
    //       value: Number(price).toFixed(2),
    //       currency: 'RUB',
    //     },
    //     capture: true,
    //     confirmation: {
    //       type: 'redirect',
    //       return_url: 'https://www.example.com/return_url',
    //     },
    //     description: '\u0417\u0430\u043A\u0430\u0437 \u21161',
    //   }),
    // })
    //   .then((response) => {
    //     console.log('Youmoney response', response);

    //     return response.json();
    //   })
    //   .then((result) => console.log('Result of request', result))
    //   .catch(console.log);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <RoundedButton title="Pay 50₽" onPress={() => onTestPress(50)} />
        <RoundedButton title="Pay 100₽" onPress={() => onTestPress(100)} />
        <RoundedButton title="Pay 200₽" onPress={() => onTestPress(200)} />
        <RoundedButton title="Pay 400₽" onPress={() => onTestPress(400)} />
        <RoundedButton title="Pay 800₽" onPress={() => onTestPress(800)} />
      </View>

      {/* <Text>{t('welcome')}</Text> */}
      {/* <Image
        style={{ width: '70%', height: '100%' }}
        source={{ uri: require('assets/wallet.png') }}
      /> */}

      {/* <View style={styles.line}>
        <Button
          title="Go to parters"
          onPress={() => navigation.navigate('Partners')}
        />
      </View>

      <Button title="Open drawer" onPress={() => navigation.openDrawer()} /> */}
    </View>
  );
};

export default WalletScreen;
