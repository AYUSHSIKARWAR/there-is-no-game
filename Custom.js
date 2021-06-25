function intersect(a, b) {
    if (abs(a.x - b.x) <= (a.width / 2) + (b.width / 2) && abs(a.y - b.y) <= (a.height / 2) + (b.height / 2)) {
  
      return true;
  
    } else {
  
      return false;
  
    }
  }
  
  function bounceOff(a, b) {
    if (abs(a.x - b.x) <= (a.width / 2) + (b.width / 2)) {
      a.velocityX = -(a.velocityX);
      b.velocityX = -(b.velocityX);
    }
    if (abs(a.y - b.y) <= (a.height / 2) + (b.height / 2)) {
      a.velocityY = -(a.velocityY);
      b.velocityY = -(b.velocityY);
    }
  }
  
  function bounce(a, b) {
    if (abs(a.x - b.x) <= (a.width / 2) + (b.width / 2)) {
      a.velocityX = -(a.velocityX);
    }
    if (abs(a.y - b.y) <= (a.height / 2) + (b.height / 2)) {
      a.velocityY = -(a.velocityY);
    }
  }
  
  function proximity(a, b, c) {
    if (abs(a.x - b.x) <= ((a.width / 2) + (b.width / 2)) + c && abs(a.y - b.y) <= ((a.height / 2) + (b.height / 2)) + c) {
  
      return true;
  
    } else {
  
      return false;
  
    }
  }
