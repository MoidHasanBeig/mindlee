import { Animated } from 'react-native';

const myFunctions = (() => {

//for transition animations
  function initiateAnim(swipeAnim,swipeVal,fadeAnim,fadeVal,cb=null) {
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
    ).start(cb);
  }

  const funx = {
    initiateAnim:initiateAnim,
  }
  return funx;
})();

export default myFunctions;
