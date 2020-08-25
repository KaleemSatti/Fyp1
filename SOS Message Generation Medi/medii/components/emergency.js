

import React,{Component} from "react";
import {TextInput, StyleSheet, Text, View, AsyncStorage, Picker, SafeAreaView,Image ,Modal,TouchableHighlight, Alert } from 'react-native';

import { Container, Header, Content, Form, Item, Input, Label, Textarea, Left, Button, Icon, Body, Right } from 'native-base';



import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';









export default class Emergency extends React.Component{
    constructor(){
        super();
        this.state={

            modalVisible:false,
            longitude:0,
            
            latitude:0,
            name3:0,
            name2:0,
            name1:0,
            selectedItems:[],
            
            user:''
            }
            console.disableYellowBox = true;
            
            this.findCoordinates()
    }
   
    componentDidMount(){
   
    
      
    }
    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }


 


      
       
    findCoordinates = () => {

        navigator.geolocation.getCurrentPosition(
        
        position => {
        
        const longitude = JSON.stringify(position.coords.longitude);
        
        const latitude = JSON.stringify(position.coords.latitude);
        
        this.setState({ longitude});
        
        this.setState({ latitude});
        
        },
        
        error => Alert.alert(error.message),
        
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        
        );
        
        };

    
      
    render(){
      const { modalVisible } = this.state;
    


      const {selectedItems} = this.state
    
       return(
        <View style={styles.container}>
    
        <Content>
        <Label style={{marginTop:20, textAlign:'center', fontSize: 24}}>Send My Location</Label>
       
          <Form>
            <Item floatingLabel rounded>
              <Label style={{marginLeft:10,marginTop:-15}}>Contact 1</Label>
              <Input style={{marginLeft:10}} onChangeText={(text)=>this.setState({name1:text})} keyboardType='numeric'/>
            </Item>
            <Item floatingLabel rounded>
              <Label style={{marginLeft:10,marginTop:-15}}>Contact 2</Label>
              <Input style={{marginLeft:10}} onChangeText={(text)=>this.setState({name2:text})} keyboardType='numeric'/>
            </Item>
            <Item floatingLabel rounded>
              <Label style={{marginLeft:10,marginTop:-15}}>Contact 3</Label>
              <Input style={{marginLeft:10}} onChangeText={(text)=>this.setState({name3:text})} keyboardType='numeric'/>
            </Item>
           
            <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >  
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{fontSize:19}}>My Location</Text>
            <MapView
        
        provider={PROVIDER_GOOGLE}
        
        style={{ width: 300, height: 200,marginTop:20,alignItems:'center',justifyContent:'center',flex:1 }}
        
        region ={{
        
        latitude:parseFloat(this.state.latitude),
        
        longitude:parseFloat(this.state.longitude),
        
        latitudeDelta:0.0,
        
        longitudeDelta:0.32
        
        }}
        
        
        showsUserLocation
        
        >
        
        </MapView>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "red" ,width:90}}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Show My location In Map</Text>
        </TouchableHighlight>
           
        <SafeAreaView style={{ flex: 1}}>
        <View style={{ flex: 1, padding: 30 }}>
         
        </View>
      </SafeAreaView>
      <View>
      <View style={styles.texttt}>
        <Text style={styles.maininfo}> Latitude: <Text style={styles.ainfo}>{this.state.latitude} </Text></Text>
        <Text style={styles.maininfo}> Longitude: <Text style={styles.ainfo}>{this.state.longitude} </Text></Text>
        
      </View>
      </View>
      
      
        <Button 
        
        
        onPress={Alert.alert('Sent!')}
        style={{width:130,marginTop:100, backgroundColor:'red', alignSelf:'center', alignContent:'center'}}
       >
        <Icon name='ios-send'/>
        
        <Label style={{textAlign:'center',color:'white'}}>Send</Label>
        <Right></Right>
      </Button>

      
          </Form>
          
        </Content>
        
        
        
        
        
        
        
        
        </View>
        
       
        );
        

     
    }
    
}
const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:50,
    width:180,
    alignSelf:'center'
  },
  texttt:{
    flexDirection:'row',
    marginVertical:10,
    justifyContent:'space-between',
    margin:25
  },
  ainfo:{
    fontWeight:'400',
   
  },
  maininfo:{
    fontWeight:'bold',
    color:'#333',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
    container: {
        marginTop:0,
      flex: 1,
      
      
    },
    input:{
        marginTop:5,
        width:250,
        height:30,
        borderWidth:1
    }
  });
