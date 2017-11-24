import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate, purgeStoredState } from 'redux-persist';
import { StyleSheet, Text, View } from 'react-native';
import reducers from './reducers';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: this.setupStore(() => this.setState({ isLoading: false }))
    };
  }

  setupStore(onCompletion:()=>void):any {
    const enhancer = compose(
      applyMiddleware(thunk),
      autoRehydrate(), // Un/comment for persistent state via LocalStorage
      devTools({
        name: 'BarApp', realtime: true
      }),
    );

    const store = createStore(reducer, enhancer);
    persistStore(store, { storage: AsyncStorage }, onCompletion);

    return store;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
