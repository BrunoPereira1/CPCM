import React, {Component} from 'react';
import { ImageBackground,Text, View, StyleSheet,KeyboardAvoidingView, Platform,Image,TextInput,Button,TouchableOpacity,Alert, SafeAreaView, StatusBar } from 'react-native';


export default class TelaPainel extends Component {
  render() {
    return (
      <KeyboardAvoidingView>
      <ImageBackground  source={require('./imagens/martelo.jpg')} style={styles.imagemlogin}>
    <View>

      
      <Text style={styles.acessartext}> Data </Text>
      <TextInput style={styles.input}> </TextInput>
      <TextInput style={styles.input}> </TextInput>
      <TextInput style={styles.input}> </TextInput>
      <TextInput style={styles.input}> </TextInput>
     
    </View>

    <View>
    <Text style={styles.acessartext}> Nome </Text>
    <TextInput style={styles.input}> </TextInput>
    <TextInput style={styles.input}> </TextInput>
    <TextInput style={styles.input}> </TextInput>
    <TextInput style={styles.input}> </TextInput>

    </View>

    <View>
    <Text style={styles.acessartext}>  Tipo </Text>
    <TextInput style={styles.input}> </TextInput>
    <TextInput style={styles.input}> </TextInput>
    <TextInput style={styles.input}> </TextInput>
    <TextInput style={styles.input}> </TextInput>
    </View>

    <View>
    <Text style={styles.acessartext}> Hora </Text>
    <TextInput style={styles.input}> </TextInput>
    <TextInput style={styles.input}> </TextInput>
    <TextInput style={styles.input}> </TextInput>
    <TextInput style={styles.input}> </TextInput>
    </View>
    </ImageBackground>
    </KeyboardAvoidingView>
      
     

    );
  }
}

const styles = StyleSheet.create({
  imagemlogin:{
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  acessartext:{
    color: '#fff',
    fontSize: 30,
    margin: 3,
    right: 5,
  },
  input: {
    marginTop: 5,
    padding: 5,
    width: 85,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    marginRight: 10,
    right: -5,
   
  },
  botao2:{
    width: 220,
    height: 42,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    marginRight: 200,
    margin: 10,
    borderRadius:4,
  },
  
 
});
