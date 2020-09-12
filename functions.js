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

  // unique ID generator
  function uniqueId(seed=0) {
    const d = new Date();
    const unID = d.getTime()+seed;
    return unID;
  }

  //touch angle
  function touchAngle(x,y,width,height,initialAngle) {
    let angle = Math.atan2(y-height/2, x-width/2) * (180 / Math.PI);
    if (angle < 0) {
      angle += 360;
    }
    angle = angle>initialAngle ? angle-initialAngle : 360+angle-initialAngle;
    while(angle>=360) {
      angle-=360;
    }
    return angle;
  }

  const funx = {
    initiateAnim:initiateAnim,
    uniqueId:uniqueId,
    touchAngle:touchAngle
  }
  return funx;
})();

export default myFunctions;
