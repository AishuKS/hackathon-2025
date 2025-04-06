function toRad(x) {
    return x * Math.PI / 180;
  }
  
  function haversineDistance(loc1, loc2) {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = toRad(loc2.latitude - loc1.latitude);
    const dLon = toRad(loc2.longitude - loc1.longitude);
  
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(loc1.latitude)) * Math.cos(toRad(loc2.latitude)) *
              Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  const isWithin10Miles = (loc1, loc2) => {
    return haversineDistance(loc1, loc2) <= 10;
  };
  
  module.exports = { isWithin10Miles };
  