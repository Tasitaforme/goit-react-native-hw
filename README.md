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

**Wipe Data** - Очистити повністю емулятор — після цієї дії буде знову встановлюватись Andoroid OS, а також необхідно буде знову інсталювати Ваш додаток.

**Cold Boot Now** - “холодний запуск” - імітація запуску телефону (допомагає вирішити глюки емулятора, які інколи трапляються). По дефолту емулятор вмикається у режимі Quick Boot (якщо на живому пристрої - то це ніби ви просто розблокували телефон).

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

### Обробка подій

Для того щоб відреагувати на якусь подію(наприклад, натискання на кнопку) треба до компонента додати проп, який починається з **on** і далі йде назва події у camelCase. Наприклад: onPress, onInput, onLayout.

Значенням цього пропа буде коллбек, який приймає об’єкт події(event). У цьому об’єкті є властивості, які притаманні усім React-подіям(stopPropagation, preventDefault, persist, target, currentTarget) так і властивості, які мають відношення до нативної події(проп [nativeEvent](https://reactnative.dev/docs/pressevent)).

> Є певний набір компонентів, який дозволяє реагувати на натискання - Button, PanResponder, Pressable, ScrollView, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, Text, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, View.

### Фікс перекриття

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

### [Fonts](https://docs.expo.dev/develop/user-interface/fonts/)

[Expo Font](https://docs.expo.dev/versions/latest/sdk/font/#installation) — a library that allows loading fonts at runtime and using them in React Native components.

```bash
npx expo install expo-font
```

### Форми

> Для роботи із великими формами буде зручно використовувати хук [useReducer](https://react.dev/reference/react/useReducer) із бібліотеки React.

### Обробка дотиків

[Handling Touches](https://reactnative.dev/docs/handling-touches)
