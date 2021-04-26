import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import TelaLogin from './Componentes/TelaLogin'
import TelaDashboard from './Componentes/TelaDashboard'
import TelaConsulta from './Componentes/TelaConsulta'
import TelaAgenda from './Componentes/TelaAgenda'
import TelaPainel from './Componentes/TelaPainel'




const AppNavigation = createStackNavigator (
  {
  Home: {
    screen : TelaLogin
},
dash:{
  screen : TelaDashboard
},
dashconsulta:{
  screen : TelaConsulta
},

dashagenda:{
  screen : TelaAgenda
},
dashpainel:{
  screen : TelaPainel
},


},
{
  initialRouteName:'Home'
}
)
 
const AppContainer = createAppContainer(AppNavigation)

export default class App extends React.Component {
  render()
  {
    return <AppContainer/>
  }
}