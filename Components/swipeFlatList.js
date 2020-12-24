import *as React from 'react'
import { Text } from 'react-native'
import {Dimensions, StyleSheet, View,Animated} from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import {SwipeListView} from 'react-native-swipe-list-view'
import db from '../config'

export default class SwipeList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            allNotifcations:this.props.notifications
        }
    }
    render(){
        console.log(this.state.allNotifcations,'|*|*|*|*|*|*')
        return(
            <View style={styles.container}>
                <SwipeListView
                  disabaleRightSwipe
                  data={this.state.allNotifcations}
                  renderItem={this.renderItem}
                  renderHiddenItem={this.renderHiddenItem}
                  rightOpenValue={-Dimensions.get('window').width}
                  previewRowKey={'0'}
                  previewOpenValue={-40}
                  previewOpenDelay={3000}
                  onSwipeValueChange={this.onSwipeValueChange}
                ></SwipeListView>
            </View>
        )
    }

    renderItem=(doc)=>{
        console.log(doc,'*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x')
        return(
            <Animated.View>
            <ListItem
                title={doc.item.bookName}
                titleStyle={{color:'black',fontWeight:'bold'}}
                subtitle={doc.item.message}
                leftElement={<Icon name='book' type='font-awesome' color='#696969'></Icon>}
            >
            </ListItem>
            </Animated.View>
        )
    }
    renderHiddenItem=()=>(
        <View style={styles.rowBack}>
            <View  style={[styles.backRightBtn,styles.backRightBtnRight]}>
                <Text>BYE</Text>
            </View>
        </View>
    )

    onSwipeValueChange=(swipeData)=>{
        console.log(swipeData)
        var allNotifcations=this.state.allNotifcations
        const {key,value}=swipeData
        if(value<-Dimensions.get('window').width){
            const newData=[...allNotifcations]
            const previousIndex=allNotifcations.findIndex(item=>item.key===key)
            this.updateMarkAsRead(newData[previousIndex])
            newData.splice(previousIndex,1)
            this.setState({
                allNotifcations:newData
            })
        }
    }
    updateMarkAsRead=(notification)=>{
        console.log(notification['docId'],'|||||||||||||||||||||||||')
        db 
        .collection('Notifications')
        .doc(notification['docId'])
        .update({
            status:'read'
        })
    }

}
const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: 'white', 
        flex: 1, 
    }, 
    backTextWhite: { 
        color: '#FFF', 
        fontWeight:'bold', 
        fontSize:15 
    }, 
    rowBack: { 
        alignItems: 'center', 
        backgroundColor: '#29b6f6', 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingLeft: 15, 
    }, 
    backRightBtn: { 
        alignItems: 'center', 
        bottom: 0, 
        justifyContent: 'center', 
        position: 'absolute', 
        top: 0, 
        width: 100, 
    }, 
    backRightBtnRight: { 
        backgroundColor: '#29b6f6', 
        right: 0, 
    },
 });