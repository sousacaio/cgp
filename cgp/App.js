import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './authContext';
import { RootNavigator } from './src/navigators/MainStack';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer >
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
