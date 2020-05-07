import React, { useRef } from "react";
import { Animated, Text, View, StyleSheet, Button } from "react-native";

import {connect} from 'react-redux' 

const StmtGraph = props => {

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 200,
      duration: 1000
    }).start();

    console.log(props)
    let x = props.increaseCounter();
    console.log(x)
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000
    }).start();
  };

  return (
    <View>
      <Animated.View style={{ ...styles.fadingContainer, width: fadeAnim }}>
      </Animated.View>

      <View>
        <Button title="Fade In" onPress={fadeIn} />
        <Button title="Fade Out" onPress={fadeOut} />
        <Text>{props.counters}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fadingContainer: {
    paddingVertical: 50,
    height: 10,
    backgroundColor: "powderblue",
    opacity: 1 // Bind opacity to animated value
  },
});

function mapStateToProps(state){
  console.log("inside state")
  console.log(state)
  return {
    counters: state.StmtGraphReducer.counters
  }
}

function mapDispatchToProps(dispatch) {
  return {
    increaseCounter: () => {console.log("function called to increase counter"); dispatch({type: 'INC'})}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StmtGraph)