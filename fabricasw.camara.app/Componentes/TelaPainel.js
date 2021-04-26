import React, {Component} from 'react';
import { ImageBackground,Text, View, StyleSheet,KeyboardAvoidingView, Platform,Image,TextInput,Button,TouchableOpacity,Alert, SafeAreaView, StatusBar } from 'react-native';


export default class TelaPainel extends Component {
  render() {
    return (
      <KeyboardAvoidingView>
      <ImageBackground  source={require('./imagens/martelo.jpg')} style={styles.imagemlogin}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao}>
      <Text style={styles.dash}> Dashboard </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao2}>
      <Text style={styles.info}> Atendimentos </Text>
      </TouchableOpacity>

      <TextInput style={styles.input}> </TextInput>
      <TouchableOpacity style={styles.botao2}>
      <Text style={styles.info}> Abertos </Text>
      </TouchableOpacity>
      <TextInput style={styles.input}> </TextInput>
      <TouchableOpacity style={styles.botao2}>
      <Text style={styles.info}> Realizados </Text>
      </TouchableOpacity>
      <TextInput style={styles.input}> </TextInput>
      <TouchableOpacity style={styles.botao2}>
      <Text style={styles.info}> Cancelados </Text>
      </TouchableOpacity>
      <TextInput style={styles.input}> </TextInput>
      <TouchableOpacity style={styles.botao2}>
      <Text style={styles.info}> Pendentes </Text>
      </TouchableOpacity>
      <TextInput style={styles.input}> </TextInput> 
    </View>
    </ImageBackground>
    </KeyboardAvoidingView>
      
     

    );
  }
}

const styles = StyleSheet.create({
  imagemlogin:{
    width: '110%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dash: {
    fontSize: 30,
    color: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  }, 
  info: {
    fontSize: 22,
    color: '#fff',
    marginRight: 70,
    marginLeft: 1,
    margin: 5,
    right: -30,
  },
  input: {
    marginTop: 10,
    padding: 10,
    width: 80,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    marginRight: 250,
   
  },
  botao:{
    width: 220,
    height: 42,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    marginTop: 10,
    borderRadius:4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao2:{
    width: 220,
    height: 42,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    marginRight: 200,
    margin: 10,
    borderRadius:4,
  }
});
