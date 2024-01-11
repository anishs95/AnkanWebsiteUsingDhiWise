const location = require('../http-common').location;

class LocationService{
    
    getAllLocations(){
        return location.get("GetLocations");
    }

}

export default new LocationService();
