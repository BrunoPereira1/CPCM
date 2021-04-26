import React from 'react';
import {ImageBackground , StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput,TouchableOpacity} from 'react-native';


export default class TelaLogin extends React.Component{
  render(){
  return (
  
    <KeyboardAvoidingView>
      <ImageBackground  source={require('./imagens/justica.jpg')} style={styles.imagemlogin}>

<View style={styles.btnscontainer}>
      <TextInput style={styles.btninput}
      placeholder = "Email"
      autoCorrect = {false}
      onChangeText = {()=>{}}/>

      <TextInput style={styles.btninput}
      placeholder = "Senha"
      autoCorrect = {false}
      onChangeText = {()=>{}}/>

    <TouchableOpacity style={styles.btnacessar}
        onPress = {()=> {this.props.navigation.navigate("dash")}}>
        <Text style={styles.acessartext}>Acessar</Text>
      </TouchableOpacity>

      
    <TouchableOpacity style={styles.btnregistro}>
        <Text style={styles.registrotext}>Criar conta gratuita</Text>
      </TouchableOpacity>

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
btnscontainer:{
  alignItems: 'center',
  justifyContent:'center'
},
btninput:{
  backgroundColor: 'rgba(52, 52, 52, 0.8)',
  color:'#fff',
  width: '230%',
  marginBottom: 15,
  color:"#222",
  fontSize: 17,
  borderRadius: 7,
  padding: 10,
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
