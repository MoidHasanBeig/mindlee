import { Animated } from 'react-native';

const myAnimations = (() => {
  //for screen navigation animation
  function navigateScreenAnim(swipeAnim,swipeVal,fadeAnim,fadeVal,callback=null) {
    Animated.timing(
      swipeAnim,
      {
        toValue:swipeVal,
        duration:200,
        useNativeDriver:false
      }
    ).start();
    Animated.timing(
      fadeAnim,
      {
        toValue:fadeVal,
        duration:200,
        useNativeDriver:false
      }
    ).start(callback);
  }

  //for map elements animation
  function mindmapTransitions(mapAnimConfig,callback) {
    let {
      mapTransitionAnim,
      transVal,
      finalVal
    } = mapAnimConfig;

    Animated.timing(
      mapTransitionAnim,
      {
        toValue:transVal,
        duration:350,
        useNativeDriver:true
      }
    ).start(() => {
      callback();
      Animated.timing(
        mapTransitionAnim,
        {
          toValue:finalVal,
          duration:250,
          useNativeDriver:true
        }
      ).start();
    });
}

  const animx = {
    navigateScreenAnim,
    mindmapTransitions
  }
  return animx;
})();

export default myAnimations;
