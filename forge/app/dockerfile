# Используйте образ с Android SDK и Node.js
FROM node:lts AS builder

# Установите зависимости для React Native и Android
RUN apt-get update -qq && apt-get install -y openjdk-8-jdk wget unzip && apt-get clean

# Установите Android SDK
ENV ANDROID_HOME /opt/android
RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-6858069_latest.zip -O tools.zip && \
    unzip -q tools.zip -d $ANDROID_HOME && \
    rm tools.zip

# Установите необходимые компоненты Android SDK
RUN yes | $ANDROID_HOME/cmdline-tools/bin/sdkmanager --licenses
RUN $ANDROID_HOME/cmdline-tools/bin/sdkmanager "platform-tools" "build-tools;30.0.2" "platforms;android-29"

# Установите React Native CLI
RUN npm install -g react-native-cli

# Установите ваш проект React Native
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Скопируйте остальные файлы проекта
COPY . .

# Соберите ваш проект React Native для Android
RUN react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
RUN react-native run-android

# Используйте образ с Android и React Native только для выполнения приложения
FROM openjdk:8-jre-slim
COPY --from=builder /app/android/app/build/outputs/apk/release/app-release.apk /app-release.apk
CMD ["java", "-jar", "/app-release.apk"]
