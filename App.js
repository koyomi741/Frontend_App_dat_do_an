import Navigation from './src/Navigation';
import Cart from './src/screens/Cart';
import Register from './src/screens/Register';

import React from 'react';
import { View } from 'react-native';

import UserContext from './src/context/UserContext';

export default function App() {
  const [user, setUser] = React.useState({});
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Navigation />
    </UserContext.Provider>

    // <Register />
  )
};
