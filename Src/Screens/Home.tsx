import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import { BGColor, BlackColor, LightWhiteColor, LoadingBackgroundColor, WhiteColor } from '../Components/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable';
import axios from 'axios'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const key = `b7b99264bde7bd84cd377ad999c932b7`
const Home = () => {
  const [WeatherData, SetWeatherData] = useState()
  const[CityName,SetCityName]=useState('')


  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${info.coords.latitude}&lon=${info.coords.longitude}&appid=${key}`, {
        method: 'POST'
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("Data = ", result)
          SetWeatherData(result)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }, [])

  const WeatherImageData=({data})=>{
    if(data=='broken clouds'){
    return (
      <View>
        <Image
        source={require('../assets/Rain_storm.png')}
        style={{width:width*0.2,height:width*0.2,resizeMode:'contain'}}
        />
      </View>
    )}
    if(data=='clear sky'){
      return (
        <View>
          <Image
          source={require('../assets/slight_touch_happyday.png')}
          style={{width:width*0.2,height:width*0.2,resizeMode:'contain'}}
          />
        </View>
      )
    }
    if(data=='haze'){
    return (
      <View>
        <Image
        source={require('../assets/cloudy.png')}
        style={{width:width*0.2,height:width*0.2,resizeMode:'contain'}}
        />
      </View>
    )}
    if(data=='overcast clouds'){
    return (
      <View>
        <Image
        source={require('../assets/cloudy.png')}
        style={{width:width*0.2,height:width*0.2,resizeMode:'contain'}}
        />
      </View>
    )}
    if(data=='scattered clouds'){
    return (
      <View>
        <Image
        source={require('../assets/slight_touch_happyday.png')}
        style={{width:width*0.2,height:width*0.2,resizeMode:'contain'}}
        />
      </View>
    )}
    if(data=='light snow'){
    return (
      <View>
        <Image
        source={require('../assets/slight_touch_happyday.png')}
        style={{width:width*0.2,height:width*0.2,resizeMode:'contain'}}
        />
      </View>
    )}
    if(data=='moderate rain'){
    return (
      <View>
        <Image
        source={ require('../assets/slight_touch_happyday.png')}
        style={{width:width*0.2,height:width*0.2,resizeMode:'contain'}}
        />
      </View>
    )}
    // if(data=='clear sky'){return require('../assets/slight_touch_happyday.png')}
    // if(data=='clear sky'){return require('../assets/slight_touch_happyday.png')}
    // if(data=='clear sky'){return require('../assets/slight_touch_happyday.png')}
    
    // return(
    //   <View>
    //   </View>
    // )
  }


  const SearchData=()=>{
    if(CityName)
    {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${key}`,{
        method:'GET'
      })
      .then((res)=>res.json())
      .then((result)=>{
        if(result.message=="city not found")
        {
          SetCityName('')
          SetWeatherData(null)
        }
        else if(result.message=="Nothing to geocode")
        {
          SetCityName('')
          SetWeatherData(null)
        }
        else{
          SetCityName('')
          SetWeatherData(result)
        }
      })
      .catch((error)=>{
        console.log("Error = ",error)
      })
      // axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${key}`)
      // .then((res)=>{
      //   console.log("Res Data = ",res.data)
      // })
      // .catch((error)=>{
      //   console.log("err  = ",error)
      // })
    }
    else{
      alert("Enter City Name")
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: BGColor }}><View>
    <Image
      source={require('../assets/Bg.png')}
      style={{ width, height, resizeMode: 'cover', position: 'absolute' }}
    />
  </View>
      {WeatherData?<View style={{zIndex:3}}>
      <View>
        <View style={{ backgroundColor: LightWhiteColor, width: width * 0.9, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: width * 0.02, alignSelf: 'center', marginTop: height * 0.04 }}>
          <TextInput
            placeholder='Enter Places . . .'
            value={CityName}
            onChangeText={(txt)=>SetCityName(txt)}
            style={{ color: BlackColor, fontFamily: 'Inter-Regular', width: width * 0.79 }}
          />
          <TouchableOpacity
          onPress={()=>{
            SearchData()
          }}
          >
            <Ionicons name="send" size={width * 0.06} color={BlackColor} />
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <FlatList
              data={WeatherData.weather}
              renderItem={({ item }) => {
                return (
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:width*0.1,marginTop:height*0.04}}>
                    <View>
                      <WeatherImageData data={item.description}/>
                      <Text style={{color:WhiteColor,fontFamily:'Inter-Medium',textAlign:'center',fontSize:20}}>{WeatherData.name}</Text>
                    </View>
                    <View>
                      <Text style={{ color: WhiteColor, fontSize: 30, fontFamily: 'Inter-SemiBold', textTransform: 'uppercase' }}>{parseInt(WeatherData.main.temp) - 273 + ' °C'}</Text>
                      <Text style={{ color: WhiteColor, fontSize: 24, fontFamily: 'Inter-Medium', textTransform: 'uppercase' }}>{item.main}</Text>
                    </View>
                  </View>
                )
              }}
            />
          </View>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:width*0.04,marginTop:height*0.04}}>
          <View style={{width:width*0.35,alignItems:'center',backgroundColor:LoadingBackgroundColor,paddingVertical:height*0.01,borderRadius:10}}>
            <Text style={{color:WhiteColor,width:width*0.28,textAlign:'center',fontFamily:'Inter-Medium',fontSize:24}}>Pressure</Text>
            <Text style={{color:WhiteColor,width:width*0.28,textAlign:'center',fontFamily:'Inter-Regular',fontSize:18}}>{WeatherData.main.pressure}</Text>
          </View>
          <View style={{width:width*0.35,alignItems:'center',backgroundColor:LoadingBackgroundColor,paddingVertical:height*0.01,borderRadius:10}}>
            <Text style={{color:WhiteColor,width:width*0.28,textAlign:'center',fontFamily:'Inter-Medium',fontSize:24}}>Humidity</Text>
            <Text style={{color:WhiteColor,width:width*0.28,textAlign:'center',fontFamily:'Inter-Regular',fontSize:18}}>{WeatherData.main.humidity}</Text>
          </View>
          </View>

          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:width*0.04,marginTop:height*0.04}}>
          <View style={{width:width*0.35,alignItems:'center',backgroundColor:LoadingBackgroundColor,paddingVertical:height*0.01,borderRadius:10}}>
            <Text style={{color:WhiteColor,width:width*0.28,textAlign:'center',fontFamily:'Inter-Medium',fontSize:24}}>Wind Speed</Text>
            <Text style={{color:WhiteColor,width:width*0.28,textAlign:'center',fontFamily:'Inter-Regular',fontSize:18}}>{WeatherData.wind.speed}</Text>
          </View>
          <View style={{width:width*0.35,alignItems:'center',backgroundColor:LoadingBackgroundColor,paddingVertical:height*0.01,borderRadius:10}}>
            <Text style={{color:WhiteColor,width:width*0.28,textAlign:'center',fontFamily:'Inter-Medium',fontSize:24}}>Wind Degree</Text>
            <Text style={{color:WhiteColor,width:width*0.28,textAlign:'center',fontFamily:'Inter-Regular',fontSize:18}}>{WeatherData.wind.deg}</Text>
          </View>
          </View>
        </View>
      </View>
      </View>:<View style={{zIndex:3}}>
      <View>
        <View style={{ backgroundColor: LightWhiteColor, width: width * 0.9, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: width * 0.02, alignSelf: 'center', marginTop: height * 0.04 }}>
          <TextInput
            placeholder='Enter Places . . .'
            value={CityName}
            onChangeText={(txt)=>SetCityName(txt)}
            style={{ color: BlackColor, fontFamily: 'Inter-Regular', width: width * 0.79 }}
          />
          <TouchableOpacity
          onPress={()=>{
            SearchData()
          }}
          >
            <Ionicons name="send" size={width * 0.06} color={BlackColor} />
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center',marginTop:height*0.08}}>
          <Text style={{color:WhiteColor,fontFamily:'Inter-SemiBold',fontSize:30,width:width*0.6}}>{'Nothing Found Search Again...'}</Text>
        </View>
      </View>
      </View>}
      <View style={{flex:1}}>
      <Image
        source={require('../assets/Bg1.png')}
        style={{width:width*0.8,height:width*0.8,resizeMode:'cover',position:'absolute',bottom:-8,alignSelf:'center',zIndex:1}}
        />
      </View>
    </View>
  )
}

export default Home