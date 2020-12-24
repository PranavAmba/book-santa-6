import * as React from 'react'
import {View,TouchableOpacity,StyleSheet,Text} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'
import { Avatar } from 'react-native-elements'
import * as ImagePicker  from 'expo-image-picker'
import db from '../config'

export default class CustomSideBarMenu extends React.Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            image:'#',
            name:'',
            docId:''
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:0.5,alignItems:'center',backgroundColor:'orange'}}>
                    <Avatar 
                      rounded
                      source={{uri:this.state.image}}
                      size='medium'
                      onPress={this.selectPicture}
                      containerStyle={styles.imageContainer}
                      showEditButton
                    ></Avatar>
                    <Text style={{fontWeight:"bold",fontSize:20,paddingTop:10}}>{this.state.name}</Text>
                </View>
                <View style={styles.drawerItemsContainer}>
                    <DrawerItems {...this.props}></DrawerItems>
                </View>
                <View style={styles.logOutContainer}>
                    <TouchableOpacity style={styles.logOutButton} onPress={()=>{
                        this.props.navigation.navigate('Login')
                        firebase
                        .auth()
                        .signOut()
                    }}>
                        <Text>LogOut</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles}></TouchableOpacity>
                </View>
            </View>
        )
    }
    componentDidMount(){
        this.getUserProfile()
        this.fetchImage()
    }
     fetchImage=()=>{
         var reference=firebase.storage().ref().child('userProfile/'+this.state.userId)
         reference.getDownloadURL()
         .then((uri)=>{
             this.setState({
                 image:uri
             })
         })
         .catch((error)=>{
             this.setState({
                 image:'#'
             })
         })
     }
     getUserProfile=()=>{
         db
         .collection('users')
         .where('email','==',this.state.userId)
         .get()
         .then((snapshot)=>{
             snapshot.docs.map((doc)=>{
                 var temp=doc.data()
                 this.setState({
                     name:temp['firstName'] + temp['lastName']
                 })
             })
         })
     }
     selectPicture=async()=>{
         const {cancelled,uri}=await ImagePicker.launchImageLibraryAsync({
             mediaTypes:ImagePicker.MediaTypeOptions.All,
             allowEditing:true,
             aspect:[4,3],
             quality:1
         })
         if(cancelled!=true){
             this.uploadImage(uri)
         }
     }
     uploadImage=async(uri)=>{
         var response=await fetch(uri)
         var blobRsponse=await response.blob()
         var reference=firebase.storage().ref().child('userProfile/'+this.state.userId)
         return reference.put(blobRsponse).then((response)=>{
             this.fetchImage()
         })
     }
}

const styles = StyleSheet.create({ 
    container : { 
        flex:1 
},
    drawerItemsContainer:{ 
        flex:0.8 
}, 
    logOutContainer: { 
    flex:0.2, 
    justifyContent:'flex-end', 
    paddingBottom:30 
}, 
    logOutButton: { 
    height:30, 
    width:'100%', 
    justifyContent:'center', 
    padding:10 
}, 
    logOutText:{ 
    fontSize: 30, 
    fontWeight:'bold' 
},
    imageContainer: { 
        flex: 0.75, 
        width: "40%", 
        height: "20%", 
        marginLeft: 20, 
        marginTop: 30, 
        borderRadius: 40, 
} 
})
