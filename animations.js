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
      mapTransitionAnim_5,
      transVal,
      intermediateVal_1,
      intermediateVal_2,
      finalVal,
      shiftMap,
      id,
      note,
      setIsShifted
    } = mapAnimConfig;

    if(note[id].subdata.length>5) {
      setIsShifted(true);
      timingAnim(shiftMap,1,250).start();
    } else {
      setIsShifted(false);
      timingAnim(shiftMap,0,250).start();
    }

    Animated.parallel([
      timingAnim(mapTransitionAnim_1,transVal,250),
      timingAnim(mapTransitionAnim_2,transVal,350),
      timingAnim(mapTransitionAnim_3,transVal,350),
      timingAnim(mapTransitionAnim_4,transVal,350)
    ]).start(() => {
        mapTransitionAnim_1.setValue(intermediateVal_1);
        mapTransitionAnim_2.setValue(intermediateVal_2);
        mapTransitionAnim_5.setValue(intermediateVal_1);
        callback();
        timingAnim(mapTransitionAnim_1,finalVal,250).start();
        timingAnim(mapTransitionAnim_2,finalVal,350).start();
        timingAnim(mapTransitionAnim_3,finalVal,0).start();
        timingAnim(mapTransitionAnim_4,finalVal,0).start();
        timingAnim(mapTransitionAnim_5,finalVal,350).start();
      }
    );
}

  const animx = {
    navigateScreenAnim,
    mindmapTransitions,
    interpolation,
    timingAnim
  }
  return animx;
})();

export default myAnimations;
