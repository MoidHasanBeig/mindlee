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
      scaleContainer,
      fadeContainer,
      scaleContainerVal,
      fadeContainerVal
    } = mapAnimConfig;

    const scaling = Animated.timing(
      scaleContainer,
      {
        toValue:scaleContainerVal,
        duration:400,
        useNativeDriver:true
      }
    );
    const fading = Animated.timing(
      fadeContainer,
      {
        toValue:fadeContainerVal,
        duration:450,
        useNativeDriver:true
      }
    );
    Animated.parallel([
      scaling,
      fading
    ]).start(callback);
  }

  const animx = {
    navigateScreenAnim,
    mindmapTransitions
  }
  return animx;
})();

export default myAnimations;
