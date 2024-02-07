/* eslint-disable prettier/prettier */
import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/Navigation/AuthProvider';
import NavigationMain from './src/Navigation/NavigationMain';
import {persistor, store} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NativeBaseProvider} from 'native-base';
import {PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <PaperProvider>
            <SafeAreaProvider>
              <AuthProvider>
                <NavigationMain />
              </AuthProvider>
            </SafeAreaProvider>
          </PaperProvider>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
