import *as React from 'react'
import { StyleSheet, View } from 'react-native'
import {Badge, Header,Icon} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'

export default class AppHeader extends React.Component{
    constructor(props){
        super(props)
        this.state={
            count:'',
            userId:firebase.auth().currentUser.email
        }
    }
    bellIconWithBadge=()=>{
        return(
            <View>
                <Icon name='bell' type='font-awesome' color='#696969' size={25} onPress={()=>{
                    this.props.navigation.navigate('Notification')
                }}></Icon>
                <Badge value={this.state.count} containerStyle={{ position: 'absolute', top: -4, right: -4 }}></Badge>
            </View>
        )
    }
    render(){
        return(
            <Header
            leftComponent={<Icon name='bars' type='font-awesome' color='#696969' onPress={() => this.props.navigation.toggleDrawer()}/>}
            centerComponent={{text:this.props.title,style:{
                justifyContent:'center',
                alignItems:'center'
            }}}
            rightComponent={<this.bellIconWithBadge {...this.props} />}
            ></Header>
            )
    }
    componentDidMount=()=>{
        this.getCountOfUnreadNotifcations()
    }

    getCountOfUnreadNotifcations=()=>{
        db
        .collection('Notifications')
        .where('status','==','unread')
        .where('targetedUserId','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            console.log(snapshot.docs)
            this.setState({
                count:snapshot.docs.length
            })                                      
        })
    }
}

const styles=StyleSheet.create({
    headerView:{
        justifyContent:'center',
        alignItems:'center'
    },

})