const myFunctions = (() => {

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

  //edit note
  function editNote() {
    console.log('edit');
  }

  //traverse map
  function mapTraverse(id,setShowMap,operatingValue) {
    setShowMap(operatingValue[id]);
  }

  //translate value for sub note balls transition
  function translateDist(commonAngle,radius,isCurrent=false,xy) {
    let x = radius*Math.cos(commonAngle*Math.PI/180);
    let y = radius*Math.sin(commonAngle*Math.PI/180);
    if (isCurrent) {
      x=x*-0.3;
      y=y*-0.3;
    }
    return xy === "x" ? x : y;
  }

  const funx = {
    uniqueId,
    touchAngle,
    editNote,
    mapTraverse,
    translateDist
  }
  return funx;
})();

export default myFunctions;
