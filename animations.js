import { Animated } from 'react-native';

const myAnimations = (() => {

  function interpolation(anim_val,inputRange,outputRange) {
    return anim_val.interpolate({
      inputRange:inputRange,
      outputRange:outputRange
    });
  }

  function timingAnim(anim_val,toValue,duration) {
    return Animated.timing(
      anim_val,
      {
        toValue,
        duration,
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
      intermediateVal,
      finalVal
    } = mapAnimConfig;

    callback();

    // transition val 1
    const sequence_1 = Animated.sequence([
      timingAnim(mapTransitionAnim_1,transVal,250),
      timingAnim(mapTransitionAnim_1,finalVal,150)
    ]);
    // transition val 2
    const sequence_2 = Animated.sequence([
      timingAnim(mapTransitionAnim_2,transVal,350),
      timingAnim(mapTransitionAnim_2,intermediateVal,0),
      timingAnim(mapTransitionAnim_2,finalVal,350)
    ]);
    //transition value 3
    const sequence_3 = Animated.sequence([
      timingAnim(mapTransitionAnim_3,transVal,350),
      timingAnim(mapTransitionAnim_3,finalVal,0)
    ]);
    //transition value 4 : mainNoteballOpacity
    const sequence_4 = Animated.sequence([
      timingAnim(mapTransitionAnim_4,transVal,300),
      timingAnim(mapTransitionAnim_4,finalVal,0)
    ]);

    Animated.parallel([
      sequence_1,
      sequence_2,
      sequence_3,
      sequence_4
    ]).start();
}

  const animx = {
    navigateScreenAnim,
    mindmapTransitions,
    interpolation
  }
  return animx;
})();

export default myAnimations;
