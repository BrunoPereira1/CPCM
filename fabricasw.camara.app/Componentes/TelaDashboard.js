import React, {Component} from 'react';
import { ImageBackground,Text, View, StyleSheet,KeyboardAvoidingView, Platform,Image,TextInput,Button,TouchableOpacity,Alert, SafeAreaView, StatusBar } from 'react-native';


export default class TelaDashboard extends Component {
  render() {
    return (
      <KeyboardAvoidingView>
      <ImageBackground  source={require('./imagens/martelo.jpg')} style={styles.logo}>
<View>
      <TouchableOpacity style={styles.botao}
        onPress = {()=> {this.props.navigation.navigate("dashconsulta")}}>
        <Text style={styles.texto}>Consulta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}
        onPress = {()=> {this.props.navigation.navigate("dashagenda")}}>
        <Text style={styles.texto}>Agenda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}
        onPress = {()=> {this.props.navigation.navigate("dashpainel")}}>
        <Text style={styles.texto}>Painel</Text>
      </TouchableOpacity>
  </View>
      </ImageBackground>
      
    </KeyboardAvoidingView>
      
     

    );
  }
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  },
 
  input:{
    marginTop: 10,
    padding: 10,
    width: 300,
    backgroundColor: 'transparent',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
  },
  botao:{
    width: 150,
    height: 42,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    marginTop: 10,
    borderRadius:4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
    color: '#fff'
   
  },

  logo:{
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
});

