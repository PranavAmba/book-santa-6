import *as React from 'react'
import {Text, View} from 'react-native'
import AppHeader from '../Components/header'
import db from '../config.js'
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler'
import { Icon, ListItem } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'

export default class MyDonations extends React.Component{
    constructor(){
        super()
        this.state={
            allDonations:[],
            userId:firebase.auth().currentUser.email,
            userfirstName:'',
            userlastName:''
        }
    }
    render(){
        return(
        <View style={{flex:1}}>
            <AppHeader title='My Donations' navigation={this.props.navigation}></AppHeader>
            {console.log(this.state.allDonations,'1122020')}
            <View style={styles.subContainer}>
                {
                    this.state.allDonations.length==0
                    ?(<View style={styles.subContainer}>
                        <Text>List of all book donations</Text>
                    </View>)
                    :(
                        <FlatList
                          data={this.state.allDonations}
                          renderItem={({item,i})=>(
                    <ListItem
                    key={i}
                    title={item.bookName}
                    subtitle={'Requested by : '+item.requestedBy+'\n status : '+item.requestStatus}
                    leftElement={<Icon name='book' type='font-awesome' color='#696969' ></Icon>}
                    titleStyle={{color:'black',fontWeight:'bold'}}
                    rightElement={
                        <TouchableOpacity onPress={()=>{
                            this.sendBook(item)
                        }} style={[styles.button,
                        {backgroundColor:item.requestStatus==='Donor Interested'
                        ?'#ff5722'
                        :'green'
                        }]}>
                            <Text>{item.requestStatus==='Donor Interested'
                            ?'send book'
                            :'book sent'
                            }</Text>
                        </TouchableOpacity>
                    }
                    bottomDivider
                    ></ListItem>
                )}
                keyExtractor={(item,index)=>index.toString()}
                ></FlatList>
                    )
                }
                
            </View>
        </View>
        )
    }
    componentDidMount(){
        this.getAllDonations()
        this.getUserDetails()
    }

    getAllDonations=()=>{
        db
        .collection('MyDonation')
        .where('donorId','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var temp = []
            snapshot.docs.map((doc)=>{
                var donation=doc.data()
               // console.log(donation,'FLYBEE')
                donation['docId']=doc.id
                //console.log(donation,'BOAC')
                temp.push(donation)
            })
            this.setState({
                allDonations:temp
            })
            console.log(this.state.allDonations,'AIR INDIA')
        })
    }
    sendBook=(bookDetails)=>{
        if(bookDetails.requestStatus==='Donor Interested'){
            db
            .collection('MyDonation')
            .doc(bookDetails.docId)
            .update({
                requestStatus:'Book Sent'
            })
            this.sendNotification(bookDetails,'Book Sent')
        }
        else{
            db
            .collection('MyDonation')
            .doc(bookDetails.docId)
            .update({
                requestStatus:'Donor Interested'
            })
            this.sendNotification(bookDetails,'Donor Interested')
        }
    }
    sendNotification=(bookDetails,requestStatus)=>{
        db
        .collection('Notifications')
        .where('requestId','==',bookDetails.requestId)
        .where('donorId','==',bookDetails.donorId)
        .get()
        .then((data)=>{
            data.docs.map((doc)=>{
                var msg=''
                if(requestStatus==='Book Sent'){
                    msg=this.state.userfirstName+' '+this.state.userlastName+' sent you the book'
                }
                else{
                    msg=this.state.userfirstName+' '+this.state.userlastName+' has interested in donating the book'
                }
                db
                .collection('Notifications')
                .doc(doc.id)
                .update({
                    message:msg,
                    status:'unread',
                    date:firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
    }
    getUserDetails=()=>{
        db
        .collection('users')
        .where('email','==',this.state.userId)
        .get()
        .then((data)=>{
            data.docs.map((doc)=>{
              var details=doc.data()
                this.setState({
                    userfirstName:details.firstName,
                    userlastName:details.lastName,
                })
            })
        })
    }
}
const styles = StyleSheet.create({ 
    subContainer:{ 
        flex:1, 
        fontSize: 20, 
        justifyContent:'center', 
        alignItems:'center' 
    }, 
    button:{ 
        width:100, 
        height:30, 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:"#ff5722", 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 8 } 
    } 
    })
