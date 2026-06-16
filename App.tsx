import { useEffect } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import routesIndex from 'src/assets/data/routesIndex.json';

import { setAvailableDates, store } from 'src/store';

import { useAppDispatch } from 'src/hooks';

import { Navigation } from 'src/navigation';

import { styles } from './App.styles';

const AppContent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAvailableDates(routesIndex));
  }, [dispatch]);

  return <Navigation />;
};

const App = () => (
  <GestureHandlerRootView style={styles.root}>
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  </GestureHandlerRootView>
);

export default App;
