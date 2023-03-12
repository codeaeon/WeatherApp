import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Geolocation from '@react-native-community/geolocation'
import Home from './Src/Screens/Home'

const App = () => {
  return (
    <View style={{flex:1}}>
      <Home/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})