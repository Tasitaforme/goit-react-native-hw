![preview-hw](/preview.jpg)

# PHOTO PROJECT (APP)

**Індивідуальний проект.**

**Назва:** "Покажи свій світ".

**Опис:** додаток в якому можна поділитись своїми фотопостами та погледіти на пости інших користувачів.

**Ціль:** розробка додатка з авторизацією, в якому можна поділитись своїми фотопостами та погледіти на пости інших користувачів.

**Навички:** React Native, Redux, JavaScript, CSS, Expo, Firebase.

---

**Щоб протестувати додаток — встановіть його на свій Android пристрій:**

Є два способи встановлення:

1. Bідкрийте це [посилання](https://expo.dev//accounts/tasita/projects/PhotoProject/builds/b0dea0e7-dc78-4817-97f6-b3a05c553830) на своїх пристроях Android і натисніть **Install**
2. Відскануйте цей QR-код за допомогою камери свого пристрою і натисніть **Install**. Іноді рідні браузери Android не підтримують завантаження, тож потрібно відкривати через Google Chrome.

![preview-hw](/QR-code.png)

**Потрібно перейти в завантажені файли і встановити додаток.**

**Також потрібно дати дозвіл на завантаження з неперевірених джерел**  
(так як додаток тестовий і є неперевіреним Google)

> На пристроях з ОС Android 8.0 (рівень API 26) і новіших версій потрібно перейти до екрана системних налаштувань встановлення невідомих програм, щоб увімкнути встановлення програми з певного місця (тобто веб-браузера, з якого ви завантажуєте програму).

> На пристроях з ОС Android 7.1.1 (рівень API 25) і старіших версій вам слід увімкнути системне налаштування «Невідомі джерела», яке можна знайти в меню «Налаштування» > «Безпека» на вашому пристрої.

# КОРИСНІ ПОСИЛАННЯ

## [React Native](https://reactnative.dev/)

[ES7+ React/Redux/React-Native snippets](https://github.com/ults-io/vscode-react-javascript-snippets/blob/HEAD/docs/Snippets.md#react-native-components)

Шляхи створення додатків:

1. за допомогою React Native CLI (або ж “чистий” реакт нейтів);
1. за допомогою Expo (набір інструментів для швидкої розробки за допомогою React Native).

## [Expo](https://expo.dev/)

Expo — набір інструментів для швидкої розробки за допомогою React Native.

[Expo Документація](https://docs.expo.dev/)

Щоб створити проект з назвою "AwesomeProject", перейти у папку проекту і запустити його, потрібно прописати у терміналі команди:

```
npx create-expo-app AwesomeProject
cd AwesomeProject
npx expo start
```

## Тестування додатків на фізичному пристрої

Expo дає змогу за відсутності MacOS тестувати додатки на фізичному пристрої.
Для того, щоб відкрити свій додаток на тестовому девайсі Вам достатньо:

- завантажити з магазину (App Store або Play Market) додаток Expo Go
- відсканувати QR код, який у Вас з’явиться в терміналі

## Інструменти для емуляції мобільних пристроїв на комп’ютері

[Android Studio](https://developer.android.com/studio) — для тестування додатків(Емулятор Android)

**Wipe Data** - Очистити повністю емулятор — після цієї дії буде знову встановлюватись Andoroid OS, а також необхідно буде знову інсталювати Ваш додаток.

**Cold Boot Now** - “холодний запуск” - імітація запуску телефону (допомагає вирішити глюки емулятора, які інколи трапляються). По дефолту емулятор вмикається у режимі Quick Boot (якщо на живому пристрої - то це ніби ви просто розблокували телефон).

[Xcode](https://apps.apple.com/ua/app/xcode/id497799835?mt=12) (для власників MacOS) — для тестування iOS додатків.

## Дебаг додатку

[Debugging Basics](https://reactnative.dev/docs/debugging)

## Cтилізація

[Core Components and APIs](https://reactnative.dev/docs/components-and-apis)

[Layout with Flexbox](https://reactnative.dev/docs/flexbox?language=javascript)

[Color Reference](https://reactnative.dev/docs/colors)

### Стилізація, залежно від платформи

[Platform-Specific Code](https://reactnative.dev/docs/platform-specific-code)

[Platform](https://reactnative.dev/docs/platform) — Модуль для визначення платформи.

**OS:** 'android' | 'ios';

```js
import { Platform, StyleSheet } from "react-native";

<TouchableOpacity
  style={{ backgroundColor: Platform.OS === "ios" ? "#00bfff" : "#FF6C00" }}
></TouchableOpacity>;
```

**Platform.select:** 'ios' | 'android' | 'native' | 'default'

```js
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: "red",
      },
      android: {
        backgroundColor: "green",
      },
      default: {
        // other platforms, web for example
        backgroundColor: "blue",
      },
    }),
  },
});
```

## Обробка подій

Для того щоб відреагувати на якусь подію(наприклад, натискання на кнопку) треба до компонента додати проп, який починається з **on** і далі йде назва події у camelCase. Наприклад: onPress, onInput, onLayout.

Значенням цього пропа буде коллбек, який приймає об’єкт події(event). У цьому об’єкті є властивості, які притаманні усім React-подіям(stopPropagation, preventDefault, persist, target, currentTarget) так і властивості, які мають відношення до нативної події(проп [nativeEvent](https://reactnative.dev/docs/pressevent)).

> Є певний набір компонентів, який дозволяє реагувати на натискання - Button, PanResponder, Pressable, ScrollView, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, Text, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, View.

### Обробка дотиків

[Handling Touches](https://reactnative.dev/docs/handling-touches)

### Фікс перекриття клавіатурою контенту

Для того щоб вирішити проблему перекриття інпуту клавіатурою використовують компонент [KeyboardAvoidingView](https://reactnative.dev/docs/keyboardavoidingview).

Цей компонент має проп під назвою behavior, у який потрібно передати одне з двох значень (padding для iOS або height для Android).

### Фікс зникнення клавіатури

Для того щоб клавіатура зникала по кліку в будь-якому місці інтерфейсу, використовують компонент [TouchableWithoutFeedback](https://reactnative.dev/docs/touchablewithoutfeedback). Це компонент-обгортка, який вміє реагувати на події торкання екрану. Нам потрібно обгорнути в нього увесь контейнер з контентом, щоб під час кліку в будь-якому місці контейнера клавіатура зникала.
[Keyboard](https://reactnative.dev/docs/keyboard).

```js
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TextInput placeholder="Type text" value={text} onChangeText={setText} />
    </KeyboardAvoidingView>
  </View>
</TouchableWithoutFeedback>
```

> Щоб зробити поведінку однаковою і керувати переркриттям клавіатури за допомогою KeyboarAvoidingView на обох платформах - треба змінити налаштування андроід у файлі `app.json`, а саме: `{ "android": { "softwareKeyboardLayoutMode": "pan" } }` Документація цієї властивості [тут](https://docs.expo.dev/versions/latest/config/app/#softwarekeyboardlayoutmode). Документація, як додавати властивості у Expo - [тут](https://docs.expo.dev/workflow/configuration/).

[Dimensions](https://reactnative.dev/docs/dimensions)

### [Expo Icons](https://docs.expo.dev/guides/icons/)

This library is installed by default on the template project using npx create-expo-app and is part of the expo package.
[Popular icon sets](https://icons.expo.fyi/Index)

### [Expo SplashScreen](https://docs.expo.dev/versions/latest/sdk/splash-screen/)

```bash
npx expo install expo-splash-screen
```

## [Fonts](https://docs.expo.dev/develop/user-interface/fonts/)

[Expo Font](https://docs.expo.dev/versions/latest/sdk/font/#installation) — a library that allows loading fonts at runtime and using them in React Native components.

```bash
npx expo install expo-font
```

## Форми

> Для роботи із великими формами буде зручно використовувати хук [useReducer](https://react.dev/reference/react/useReducer) із бібліотеки React.

## Навігація

[**React Navigation**](https://reactnavigation.org/docs/getting-started/) — бібліотека для навігації в React Native.
[**React Navigation Hooks**](https://reactnavigation.org/docs/use-navigation)
Інструкція з встановлення [тут](https://reactnavigation.org/docs/getting-started/#installation).

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
```

Для більшої гнучкості розробники React Navigation розбили свою бібліотеку на умовно незалежні частини.
**Для роботи із навігацією із кнопками знизу є бібліотека:**
**@react-navigation/bottom-tabs**

**Для роботи із звичайною навігацією є бібліотеки:**
**@react-navigation/native-stack** (працює більш швидко, бо написаний із використанням нативних компонентівб, але дуже погано кастомізується і з дуже великою вірогідністю панель навігації буде по-різному виглядати на різних платформах).
**@react-navigation/stack** (більш гручка для кастомізації і створення проекту по дизайн-макету).

```bash
npm install @react-navigation/stack
npx expo install react-native-gesture-handler
```

Обов'язковий імпорт цієї бібліотеки у найвищий файл в ієрархії проекту (App.js)  
`import 'react-native-gesture-handler';`  
Обгортка всього проекту в `NavigationContainer` (App.js)  
Групування екранів та рендеру окремого екрану відбувається з допомогою функції `createStackNavigator`. Вона повертає об'єкт, що містить 2 властивості: **Screen** та **Navigator**.  
**Navigator** повинен містити елементи Screen як дочірні елементи для визначення конфігурації маршрутів.  
Компонент **Screen** може приймати проп - `options`, у який передають об'єкт з додатковими налаштуваннями екрану.  
`initialRouteName` — проп, який відповідає за те, який екран рендерити за замовчуванням.

```js
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        {/* Аналог Routes */}
        <MainStack.Screen name="Registration" component={Register} /> {/* Аналог Route */}
        <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ title: "Start screen" }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
```

### Перемикання екранів

1. Кожен екран, за замовчуванням, отримує проп `navigation`. Це об'єкт, у якого є метод navigate, який приймає аргументом назву екрана, на який потрібно перевести користувача.

```js
const Register = ({ navigation }) => {
  return (
    <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
  );
};
```

2. У вкладених компонентах є спеціальні хуки, які витягують із контексту навігації необхідні нам функції та параметри.

```js
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();

  return (
    <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
  );
};
```

### Передача параметрів між екранами

- Передача параметрів: в метод navigation.navigate передати другим аргументом об'єкт з параметрами.

```js
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();
  return (
    <Button
      title="Go to Login"
      onPress={() =>
        navigation.navigate("Login", { sessionId: 45, userId: "22e24" })
      }
    />
  );
};
```

- Приймання параметрів: через проп `route` , у якому буде ключ `params`, або за допомогою хука `useRoute()`.
  Хуки: [useNavigation](https://reactnavigation.org/docs/use-navigation/) та [useRoute](https://reactnavigation.org/docs/use-route)

```js
import { useNavigation, useRoute } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const {
    params: { userId },
  } = useRoute();
};
```

### Налаштування хедера екрану

`MainStack.Screen` приймає об'єкт [options](https://reactnavigation.org/docs/stack-navigator/#options), в якому є безліч ключів для налаштування:  
[Header related options](https://reactnavigation.org/docs/stack-navigator/#header-related-options)
[Configuring the header bar](https://reactnavigation.org/docs/headers/)

- **title** - назва екрану в хедері
- **headerStyle** - об'єкт зі стилями хедера
- **headerTintColor** - колір тексту в хедері
- **headerTitleStyle** - об'єкт стилів тексту в хедері
- **headerTitle** - замінює текст в хедері на компонент
- **headerRight** - додає в хедер компонент з правої сторони

```js
<MainStack.Screen
  name="Login"
  component={LoginScreen}
  options={{ headerShown: false }}
/>
```

### Вкладена навігація

```js
// Звичайна навігація та передача параметрів
navigation.navigate("Home", { userId: "e2ee4" });

// Передача параметрів в екран Setting всередині Home
navigation.navigate("Home", {
  screen: "Settings",
  params: { userId: "e2ee4" },
});
```

[Nesting navigators](https://reactnavigation.org/docs/nesting-navigators/)
[Options for screens](https://reactnavigation.org/docs/screen-options)

### Нижня навігація

[Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator).
Проста панель вкладок у нижній частині екрана, яка дозволяє перемикатися між різними маршрутами. Екранні компоненти маршрутів не монтуються, доки вони вперше не будуть сфокусовані.

```bash
npm install @react-navigation/bottom-tabs
```

> The [tabBarOptions prop is removed](https://reactnavigation.org/docs/upgrading-from-5.x/#the-tabbaroptions-prop-is-removed-in-favor-of-more-flexible-options-for-bottom-tabs) in favor of more flexible [options](https://reactnavigation.org/docs/bottom-tab-navigator/#options) for bottom tabs

```js
<Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{ tabBarShowLabel: false}}
    >
```

**screenOptions** — default options to use for the screens in the navigator.

## [Камера](https://docs.expo.dev/versions/latest/sdk/camera/)

```bash
npx expo install expo-camera
npx expo install expo-media-library
```

## [Доступ до галереї - ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)

```bash
npx expo install expo-image-picker
```

## [Геолокація](https://docs.expo.dev/versions/latest/sdk/location/)

```bash
npx expo install expo-location
```

```js
import * as Location from "expo-location";
```

## [Робота з мапами](https://docs.expo.dev/versions/latest/sdk/map-view/)

```bash
npx expo install react-native-maps
```

> Для роботи мап від google необхідно зарєструвати і додати відповідні ключі. Інструкція є [тут](https://docs.expo.dev/versions/latest/sdk/map-view/#deploy-app-with-google-maps)

```js
import MapView from "react-native-maps";
```

## [BlurView](https://docs.expo.dev/versions/latest/sdk/blur-view/)

```bash
npx expo install expo-blur
```

```js
import { BlurView } from "expo-blur";
```

## [Redux](https://redux.js.org/introduction/getting-started) та [redux-persist](https://redux.js.org/usage/migrating-to-modern-redux#store-setup-with-configurestore)

```bash
npm install @reduxjs/toolkit react-redux redux-persist
npx expo install @react-native-async-storage/async-storage
```

> Налаштовується редакс та редакс-персіст так само, як і у веб, за однією різницею - необхідно використовувати AsyncStorage з щойно встановленної бібліотеки

```js
//store.js
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
```

Обгортаємо наш додаток у Provider та PersistGate та передаємо їм відповідні обʼєкти.

```js
//App.js
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";

return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>... </NavigationContainer>
    </PersistGate>
  </Provider>
);
```

[Redux Toolkit Quick Start](https://redux.js.org/tutorials/quick-start)

## [Firebase](https://console.firebase.google.com/)

[Бібліотека Firebase](https://www.npmjs.com/package/firebase)

```bash
npx expo install firebase
```

> Якщо встановлена версія firebase 9.7.0 або вище - необхідно додатково налаштувати Expo. Для цього треба запустити команду нижче у терміналі. Вона створить і привʼяже до експо файл metro.config.js

```bash
npx expo customize metro.config.js
```

> React Native CLI + firebase = [React Native Firebase](https://rnfirebase.io/)

[Firebase Authentication](https://firebase.google.com/docs/auth?authuser=0&hl=en)  
[updateProfile](https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile)

## [Moment.js](https://momentjs.com/)

Parse, validate, manipulate, and display dates and times in JavaScript.

```bash
npm install moment
```

```js
import moment from "moment";
import "moment/locale/uk";

moment().format();
```

[Loading locales in NodeJS](https://momentjs.com/docs/#/i18n/loading-into-nodejs/)

### Додаткова документація

[FlatList](https://reactnative.dev/docs/flatlist)  
[Expo Image Picker](https://docs.expo.dev/tutorial/image-picker/)  
[Supporting safe areas](https://reactnavigation.org/docs/handling-safe-area/)

## Деплой на сервери expo

1. інсталювати глобально пакет `eas-cli` для того, щоб можна було публікувати додаток у свій аккаунт expo
2. додати до свого проекту пакет `expo-dev-client`
3. обовʼязково залогінитись у свій аккаунт expo використовуючи `eas-cli`

```bash
npm install -g eas-cli
npx expo install expo-dev-client
eas login
eas build --profile development --platform android
```

> Команда для перевірки, чи залогінені ви вже: `eas whoami`

Файл `eas.json` повинен буди схожим на цей:

```json
{
  "cli": {
    "version": ">= 5.5.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": "true"
      },
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

Якщо ні, то можна конфігурувати і потім визвати команду:

```bash
eas build -p android --profile preview
```

Детально можна почитати [тут](https://docs.expo.dev/build-reference/apk/)
