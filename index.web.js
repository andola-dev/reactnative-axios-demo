import {AppRegistry} from 'react-native'
// import {name as appName} from './app.json'
import App from './App';

AppRegistry.registerComponent('axios', () => App)

AppRegistry.runApplication('axios', {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
})
