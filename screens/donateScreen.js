import * as React from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity, Alert} from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { ListItem } from 'react-native-elements'
import db from '../config.js'
import AppHeader from '../Components/header.js'

export default class Donate extends React.Component{
constructor(){
    super()
    this.state={
        requestList:[]
    }
}

    render(){
        return(
            <View style={styles.container}>
                <AppHeader title='Donate' navigation={this.props.navigation}></AppHeader>
                {console.log(this.state.requestList,'boom')}
                <View style={styles.container}>
                <FlatList
                    data={this.state.requestList}
                    renderItem={({item,i})=>(
                      <ListItem 
                      key={i}
                      title={item.title}
                      subtitle={item.reason}
                      titleStyle={{color:'black',fontWeight:'bold'}}
                      rightElement={
                          <TouchableOpacity style={styles.button} onPress={()=>{
                              this.props.navigation.navigate('Details',{details:item})
                          }}>
                              <Text style={{color:'#ffff'}}>View</Text>
                          </TouchableOpacity>
                      }
                      ></ListItem>
                    )}
                    keyExtractor={(item,index)=>index.toString()}
                ></FlatList>
                </View>
            </View>
            
        )
    }
componentDidMount(){
    this.readRequestData()
}

readRequestData=async()=>{
const request=await db
.collection('Request')
.onSnapshot((requestData)=>{
    var item=[]

    requestData.docs.map((doc)=>{
        item.push(doc.data())
    })
    this.setState({
        requestList:item
    })
    console.log('202020202020',this.state.requestList)
})
}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white',
        /*alignItems:'center',
        justifyContent:'center'*/
    },
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
    }, 
})