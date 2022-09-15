import {useState,useEffect} from 'react';
import axios from 'axios';

function IpInfo() {
    const [subsciberIp, setIP] = useState('');
    const [subscriberCountry, setSubscriberCountry] = useState('');
    
    //creating function to load ip address from the API
    const getData = async () => {
      const res = await axios.get('https://geolocation-db.com/json/')
      setIP(res.data.IPv4)
      setSubscriberCountry(res.data.country_name)
    }
    
    useEffect( () => {  
      //passing getData method to the lifecycle method
      getData()
  
    }, [])
  
    return (
      <div className="App">
        <IpInfo subsciberIp={subsciberIp} subscriberCountry={subscriberCountry}/>    
        </div>
    );
  }
  
export default IpInfo;