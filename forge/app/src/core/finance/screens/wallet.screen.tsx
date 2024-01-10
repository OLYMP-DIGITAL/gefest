import { Col } from 'core/ui/components/layout/col';
import { Grid } from 'core/ui/components/layout/grid';
import { Row } from 'core/ui/components/layout/row';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WalletScreen = () => {
  return (
    <Grid>
      {({ size }) => {
        return (
          <Row>
            <Col style={styles.block}>
              <Text>Колонка 1 - {size}</Text>
            </Col>

            <Col style={styles.block}>
              <Text>Колонка 2</Text>
            </Col>
          </Row>
        );
      }}
    </Grid>
  );
};

const styles = StyleSheet.create({
  column: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginBottom: 10,
  },
  wideColumn: {
    backgroundColor: 'lightcoral',
    padding: 10,
    marginBottom: 10,
  },

  block: {
    borderWidth: 1,
    backgroundColor: getRandomHexColor(),
  },
});

function getRandomHexColor(): string {
  // Генерируем три случайных числа от 0 до 255
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Конвертируем числа в HEX-формат и объединяем их
  const hexColor = `#${red.toString(16).padStart(2, '0')}${green
    .toString(16)
    .padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

  return hexColor;
}
