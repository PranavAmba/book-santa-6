import *as React from 'react';
import {View,TextInput,StyleSheet,TouchableOpacity,Text} from 'react-native';
import AppHeader from '../Components/header.js'
import firebase from 'firebase'
import db from '../config.js'

export default class Settings extends React.Component{
    constructor(){
        super()
        this.state={
            firstName:'',
            lastName:'',
            contactNo:'',
            address:'',
            email:firebase.auth().currentUser.email,
            docId:''
        }
    }
    componentDidMount=()=>{
        this.getUserDetails()
    }
    render(){
        return(
            <View style={styles.container}>
              <AppHeader title='Settings' navigation={this.props.navigation}></AppHeader>
              <View style={styles.formContainer}>
                  <TextInput style={styles.formTextInput} placeholder='FirstName' value={this.state.firstName } onChangeText={(val)=>{this.setState({firstName:val})}}></TextInput>
                  <TextInput style={styles.formTextInput} placeholder='LastName ' value={this.state.lastName  } onChangeText={(val)=>{this.setState({lastName:val })}}></TextInput>
                  <TextInput style={styles.formTextInput} placeholder='PhoneNo  ' value={this.state.contactNo } onChangeText={(val)=>{this.setState({contactNo:val})}}></TextInput>
                  <TextInput style={styles.formTextInput} placeholder='Address  ' value={this.state.address   } onChangeText={(val)=>{this.setState({address : val})}}></TextInput>

                  <TouchableOpacity style={styles.button} onPress={this.updateUserDetails}>
                      <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
              </View>
            </View>
        )
    }
    getUserDetails=async()=>{
        console.log('nothing here')
        db
        .collection('users')
        .where('email','==',this.state.email)
        .get()
        .then((docList)=>{ console.log(docList)
            docList.docs.map((item)=>{
            var userData=item.data()
            this.setState({
                firstName:userData.firstName,
                lastName:userData.lastName,
                address:userData.address,
                contactNo:userData.phoneNo,
                docId:item.id
            })
        })
            
        })
    }
    updateUserDetails=async()=>{
        db
        .collection('users')
        .doc(this.state.docId)
        .update({
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            address:this.state.address,
            phoneNo:this.state.contactNo
        })
    }    
}


const styles = StyleSheet.create({
    container : { 
        flex:1, 
    }, 
    formContainer:{ 
        flex:1, 
        width:'100%', 
        alignItems: 'center' 
    }, 
    formTextInput:{ 
        width:"75%", 
        height:35, 
        alignSelf:'center', 
        borderColor:'#ffab91', 
        borderRadius:10, 
        borderWidth:1, 
        marginTop:20, 
        padding:10, 
    }, 
    button:{ 
        width:"75%", 
        height:50, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:10, 
        backgroundColor:"#ff5722", 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 8, }, 
        shadowOpacity: 0.44, 
        shadowRadius: 10.32, 
        elevation: 16, 
        marginTop:20 
    }, 
    buttonText:{ 
        fontSize:25, 
        fontWeight:"bold", 
        color:"#fff" 
    } 
})