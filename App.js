import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducer/index';
import NavigatorComponent from './elements/navigatorComponent/NavigatorComponent';
import { setLocalNotification } from './utils/push';

export default class App extends React.Component{
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(rootReducer)}>
          <NavigatorComponent />
      </Provider>
    )
  }
}