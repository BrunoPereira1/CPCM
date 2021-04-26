import React from 'react';
import {ImageBackground , StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput,TouchableOpacity} from 'react-native';


export default class TelaLogin extends React.Component{
  render(){
  return (
  
    <KeyboardAvoidingView>
      <ImageBackground  source={require('./imagens/martelo.jpg')} style={styles.logo}>

<View style={styles.btnscontainer}>
      <TextInput style={styles.btninput}
      placeholder = "Informe uma data"
      autoCorrect = {false}
      onChangeText = {()=>{}}/>


    <TouchableOpacity style={styles.btnacessar}>
        <Text style={styles.acessartext}>Consultar</Text>
      </TouchableOpacity>


</View>
        
      
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
}


const styles = StyleSheet.create({
logo:{
  width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
},
btnscontainer:{
  alignItems: 'center',
  justifyContent:'center'
},
btninput:{
  backgroundColor: 'rgba(52, 52, 52, 0.8)',
  width: '230%',
  marginBottom: 15,
  color:"#222",
  fontSize: 17,
  borderRadius: 7,
  padding: 7,
},
btnacessar:{
  backgroundColor: "#35AAFF",
  width: '90%',
  height:35,
  alignItems: 'center',
  borderRadius: 7,
  justifyContent: 'center'
},
acessartext:{
  color: '#fff'
},
btnregistro:{
  marginTop: 10

},
registrotext:{
  color: '#fff'
}
});
