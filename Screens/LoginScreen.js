// import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, Animated, Dimensions, Keyboard, Platform} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Icon } from 'native-base'
const ScreenHeight = Dimensions.get('window').height
// create a component
class LoginScreen extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props)
    this.state = {
      placeholderText: 'Enter your Mobile Number'
    }
  }

  componentWillMount = () => {
    this.loginHeight = new Animated.Value(150)

    this.KeyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.KeyboardWillShow)
    this.KeyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.KeyboardWillHide)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.KeyboardWillShow)
    this.KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.KeyboardWillHide)

    this.keyboardHeight = new Animated.Value(0)
    this.forwardArrowOpacity = new Animated.Value(0)
    this.borderBottomWidth = new Animated.Value(0)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  KeyboardWillShow = (event) => {
    if (Platform.OS === 'android'){
      duration = 100
    }else { 
      duration = event.duration
    }

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: event.endCoordinates.height + 10
      }),
      Animated.timing(this.forwardArrowOpacity, {
        duration: duration,
        toValue: 1
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: duration,
        toValue: 1
      })
    ]).start()
  }

  KeyboardWillHide = (event) => {
    if (Platform.OS === 'android'){
      duration = 100
    }else { 
      duration = event.duration
    }
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: 0
      }),
      Animated.timing(this.forwardArrowOpacity, {
        duration: duration,
        toValue: 0
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: duration,
        toValue: 0
      })
    ]).start()
  }
  
  increasHeightOfLogin = () => {
    this.setState({placeholderText: '1129669044'})
    Animated.timing(this.loginHeight, {
      toValue: ScreenHeight,
      duration: 500
    }).start(() => {
      this.refs.textInputMobile.focus()
    })
  }

  decreaseHeightOfLogin = () => {
    this.setState({placeholderText: 'Enter your mobile number'})
    Keyboard.dismiss()
    Animated.timing(this.loginHeight, {
      toValue: 150,
      duration: 500
    }).start()
  }

  render () {
    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, ScreenHeight],
      outputRange: [1,0]
    })
    const marginTop = this.loginHeight.interpolate({
      inputRange: [150, ScreenHeight],
      outputRange: [25,100]
    })
    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, ScreenHeight],
      outputRange: [0,1]
    })
    const holderTextBottom = this.loginHeight.interpolate({
      inputRange: [150,400, ScreenHeight],
      outputRange: [0,0,100]
    })
    const holderTextLeft = this.loginHeight.interpolate({
      inputRange: [150, ScreenHeight],
      outputRange: [100,25]
    })
    const holderTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, ScreenHeight],
      outputRange: [0,1]
    })

    return (
      <View style={{flex: 1}}>

        <Animated.View
          style={[styles.backHeaderView, {opacity: headerBackArrowOpacity}]}
        >
          <TouchableOpacity
            onPress={()=> this.decreaseHeightOfLogin()}
          >
            <Icon name='md-arrow-back' style={{color: 'black'}}/>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          style={{
            position: 'absolute',
            height: 60,
            width: 60,
            right: 10,
            zIndex: 200,
            backgroundColor: '#54575e',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            bottom: this.keyboardHeight,
            opacity: this.forwardArrowOpacity}}>
          <Icon name={'md-arrow-forward'} style={{color: 'white'}}/>
        </Animated.View>
        
        <ImageBackground source={require('../assets/bgLogin.png')} style={{flex: 1}}>
          <View style={styles.container}>
            <Animatable.View 
              style={styles.textView}
              animation={'zoomIn'}
              iterationCount={1}
              >
              <Text style={styles.text}>UBER</Text>
            </Animatable.View>
          </View>

          <Animatable.View animation={'slideInUp'} iterationCount={1}>
            <Animated.View style={[styles.topBottom, {height: this.loginHeight}]}>
              <Animated.View style={[styles.innerTopBottom, {opacity: headerTextOpacity, marginTop: marginTop}]}>
                <Text style={[styles.text, {fontSize: 20}]}>Get moving with UBER</Text>
              </Animated.View>
              <TouchableOpacity
                onPress={()=> this.increasHeightOfLogin()}
              >
                <Animated.View style={[styles.inputView, {marginTop: marginTop}]}>

                  <Animated.Text style={[styles.holderText, {bottom: holderTextBottom , left: holderTextLeft , opacity: holderTextOpacity}]}>Enter your mobile number</Animated.Text>
                  <Image 
                    source={require('../assets/flag.png')}
                    style={styles.flagImage}
                  />

                  <Animated.View 
                    style={[styles.innerTextInput, {borderBottomWidth: this.borderBottomWidth}]}
                    pointerEvents={'none'}
                    >
                    <Text style={styles.keyText}>+20</Text>
                    <TextInput
                      keyboardType="numeric"
                      ref={'textInputMobile'}
                      style={styles.textInput}
                      placeholder={this.state.placeholderText}
                      underlineColorAndroid={'transparent'}
                      />
                  </Animated.View>

                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <View style={styles.bottomView}>
              <Text style={styles.blueText}>login using email account</Text>
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  backHeaderView: {
    position: 'absolute',
    height: 60,
    width: 60,
    top: 60,
    left: 25,
    zIndex: 100
  },
  arrowView: {
    position: 'absolute',
    height: 60,
    width: 60,
    right: 10,
    zIndex: 200,
    backgroundColor: '#54575e',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  textView: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  topBottom: {
    backgroundColor: 'white',
  },
  inputView: {
    paddingHorizontal: 25,
    flexDirection: 'row',
  },
  holderText: {
    fontSize: 24,
    color: 'gray',
    position: 'absolute'
  },
  flagImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  innerTextInput: {
    flexDirection: 'row',
    flex: 1
  },
  keyText: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 20
  },
  innerTopBottom: {
    alignItems: 'flex-start',
    paddingHorizontal: 25,
  },
  bottomView: {
    height: 70,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopColor: '#e8e8ec',
    borderTopWidth: 1,
    paddingHorizontal: 25,
  },
  blueText: {
    color: '#5a7fdf',
    fontWeight: 'bold'
  }
})

// make this component available to the app
export default LoginScreen
