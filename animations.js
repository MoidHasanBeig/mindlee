import { Animated } from 'react-native';

const myAnimations = (() => {

  function interpolation(anim_val,inputRange,outputRange) {
    return anim_val.interpolate({
      inputRange:inputRange,
      outputRange:outputRange
    });
  }

  function timingAnim(anim_val,toValue,duration,delay=0) {
    return Animated.timing(
      anim_val,
      {
        toValue,
        duration,
        delay,
        useNativeDriver:true
      }
    );
  }

  //for screen navigation animation
  function navigateScreenAnim(swipeAnim,swipeVal,fadeAnim,fadeVal,callback=null) {
    timingAnim(swipeAnim,swipeVal,200).start();
    timingAnim(fadeAnim,fadeVal,200).start(callback);
  }

  //for map elements animation
  function mindmapTransitions(mapAnimConfig,callback) {
    const {
      mapTransitionAnim_1,
      mapTransitionAnim_2,
      mapTransitionAnim_3,
      mapTransitionAnim_4,
      transVal,
      intermediateVal_1,
      intermediateVal_2,
      finalVal
    } = mapAnimConfig;

    Animated.parallel([
      timingAnim(mapTransitionAnim_1,transVal,250),
      timingAnim(mapTransitionAnim_2,transVal,350),
      timingAnim(mapTransitionAnim_3,transVal,350),
      timingAnim(mapTransitionAnim_4,transVal,350)
    ]).start(() => {
        mapTransitionAnim_1.setValue(intermediateVal_1);
        mapTransitionAnim_2.setValue(intermediateVal_2);
        callback();
        timingAnim(mapTransitionAnim_1,finalVal,250).start();
        timingAnim(mapTransitionAnim_2,finalVal,350).start();
        timingAnim(mapTransitionAnim_3,finalVal,0).start();
        timingAnim(mapTransitionAnim_4,finalVal,0,20).start();
      }
    );
}

  const animx = {
    navigateScreenAnim,
    mindmapTransitions,
    interpolation
  }
  return animx;
})();

export default myAnimations;
