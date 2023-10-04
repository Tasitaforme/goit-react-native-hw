## [React Native](https://reactnative.dev/)

[ES7+ React/Redux/React-Native snippets](https://github.com/ults-io/vscode-react-javascript-snippets/blob/HEAD/docs/Snippets.md#react-native-components)

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

[Xcode](https://apps.apple.com/ua/app/xcode/id497799835?mt=12) (для власників MacOS) — для тестування iOS додатків.

## Cтилізація

[Core Components and APIs](https://reactnative.dev/docs/components-and-apis)

[Layout with Flexbox](https://reactnative.dev/docs/flexbox?language=javascript)

[Color Reference](https://reactnative.dev/docs/colors)

[Debugging Basics](https://reactnative.dev/docs/debugging)

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

[KeyboardAvoidingView](https://reactnative.dev/docs/keyboardavoidingview)

### [Expo Icons](https://docs.expo.dev/guides/icons/)

This library is installed by default on the template project using npx create-expo-app and is part of the expo package.
[Popular icon sets](https://icons.expo.fyi/Index)
