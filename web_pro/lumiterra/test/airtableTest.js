import Airtable from 'airtable'
import axios from "axios";

let request = axios.create({
    baseURL: 'https://api.airtable.com/v0/appdal3zeKKovXaCU',
    headers: {
        'Authorization': 'Bearer patSudAjGmqRMXbWh.0f5ae85a40d430d68430da0a25e9ecd2789cbd3c32fc6e26860ce2906697bbde'
    }
})

request.get('https://api.airtable.com/v0/appdal3zeKKovXaCU/shrUqDSi79egHYGmL')
.then(res=>{
    console.log(res.data.records)

})
.catch(err=>{
    console.log(JSON.stringify(err))
})
