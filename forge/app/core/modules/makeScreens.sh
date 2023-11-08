#!/bin/bash

# Создание файла WalletScreen.js
echo "import React from 'react';
import { View, Text } from 'react-native';

const WalletScreen = () => {
  return (
    <View>
      <Text>Это ваш кошелек. Здесь отображаются ваши финансовые операции.</Text>
    </View>
  );
};

export default WalletScreen;" > WalletScreen.js

# Создание файла GrowthChartScreen.js
echo "import React from 'react';
import { View, Text } from 'react-native';

const GrowthChartScreen = () => {
  return (
    <View>
      <Text>График роста. Здесь вы можете видеть свой рост во времени.</Text>
    </View>
  );
};

export default GrowthChartScreen;" > GrowthChartScreen.js

# Создание файла DocumentsScreen.js
echo "import React from 'react';
import { View, Text } from 'react-native';

const DocumentsScreen = () => {
  return (
    <View>
      <Text>Документы. Здесь вы можете найти все ваши документы и файлы.</Text>
    </View>
  );
};

export default DocumentsScreen;" > DocumentsScreen.js

# Создание файла NewsScreen.js
echo "import React from 'react';
import { View, Text } from 'react-native';

const NewsScreen = () => {
  return (
    <View>
      <Text>Новости. Все последние новости и обновления здесь.</Text>
    </View>
  );
};

export default NewsScreen;" > NewsScreen.js

# Создание файла FaqScreen.js
echo "import React from 'react';
import { View, Text } from 'react-native';

const FaqScreen = () => {
  return (
    <View>
      <Text>FAQ. Здесь вы найдете ответы на часто задаваемые вопросы.</Text>
    </View>
  );
};

export default FaqScreen;" > FaqScreen.js

echo "Файлы успешно созданы!"
