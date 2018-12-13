import React from 'react';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducer/index';
import NavigatorComponent from './elements/navigatorComponent/NavigatorComponent';

export default class App extends React.Component{
  render() {
    return (
      <Provider store={createStore(rootReducer)}>
          <NavigatorComponent />
      </Provider>
    )
  }
}