import *as React from 'react'
import {View,Text,TouchableOpacity, StyleSheet} from 'react-native'
import firebase from 'firebase'
import db from '../config.js'
import {Header,Icon,Card} from 'react-native-elements'

export default class RecevierDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
            recevierfirstName:'',
            recevierlastName:'',
            recevieraddress:'',
            receviercontactNo:'',
            title:this.props.navigation.getParam('details')['title'],
            reason:this.props.navigation.getParam('details')['reason'],
            userID:firebase.auth().currentUser.email,
            recevierId:this.props.navigation.getParam('details')['userId'],
            requestId:this.props.navigation.getParam('details')['requestId'],
            userFirstName:'',
            userLastName:''
        }
    }

    componentDidMount(){
        this.getRecevierDetails()
        this.getUserDetails()
    }

    render(){
        return(
          <View style={{
            flex:1
            }}>
            <View style={{
            flex:0.1
            }}>
              <Header
              leftComponent={<Icon name='arrow-left' type='feather' color='#696969' onPress={() => this.props.navigation.goBack()}></Icon>}
              centerComponent={{text:'Donate Book',style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", }}}
              backgroundColor="#eaf8fe"
              ></Header>
            </View>
            <View style={{flex:0.3}}>
                <Card
                title={'Book Info'}
                titleStyle={{fontSize:20}}
                >
                    <Card><Text style={{fontWeight:'bold'}}>Title:{this.state.title}</Text></Card>
                    <Card><Text style={{fontWeight:'bold'}}>Reason:{this.state.reason}</Text></Card>
                </Card>
            </View>
            <View style={{flex:0.3}}>
                <Card
                title={'Recevier Info'}
                titleStyle={{fontSize:20}}
                >
                    <Card><Text style={{fontWeight:'bold'}}>Name: {this.state.recevierfirstName+' '+this.state.recevierlastName}</Text></Card>
                    <Card><Text style={{fontWeight:'bold'}}>Contact No:{this.state.receviercontactNo}</Text></Card>
                    <Card><Text style={{fontWeight:'bold'}}>Address: {this.state.recevieraddress}</Text></Card>
                </Card>
            </View>
            {
                this.state.recevierId!==this.state.userID
                ?(<View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={()=>{
                        this.updateBookStatus()
                        this.addNotification()
                        this.props.navigation.navigate('MyDonations')
                    }}><Text>I want to donate</Text></TouchableOpacity>
                </View>)
                :null
            }
          </View>
        )
    }
    getRecevierDetails=()=>{
        db
        .collection('users')
        .where('email','==',this.state.recevierId)
        .get()
        .then((data)=>{
            data.docs.map((doc)=>{
               var details=doc.data()
                this.setState({
                    recevierfirstName:details.firstName,
                    recevierlastName:details.lastName,
                    receviercontactNo:details.phoneNo,
                    recevieraddress:details.address
                })
            })
        })
    }

    updateBookStatus=()=>{
        db
        .collection('MyDonation')
        .add({
            bookName:this.state.title,
            requestId:this.state.requestId,
            requestedBy:this.state.recevierfirstName +' '+this.state.recevierlastName,
            donorId:this.state.userID,
            requestStatus:'Donor Interested'
        })
    }

    addNotification=()=>{
        var message=this.state.userfirstName+' '+this.state.userlastName+' has shown intrest in donating the book'
        db
        .collection('Notifications')
        .add({
            targetedUserId:this.state.recevierId,
            donorId:this.state.userID,
            requestId:this.state.requestId,
            bookName:this.state.title,
            date:firebase.firestore.FieldValue.serverTimestamp(),
            status:'unread',
            message:message
        })
    }

    getUserDetails=()=>{
        db
        .collection('users')
        .where('email','==',this.state.userID)
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
    buttonContainer : { flex:0.3, justifyContent:'center', alignItems:'center' },
    button:{
                        width:100, 
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
    }
})