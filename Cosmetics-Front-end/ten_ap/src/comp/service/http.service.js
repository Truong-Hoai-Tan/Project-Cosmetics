import axios from "axios";
import storageService from "./storage.service";
import { toast } from "react-toastify";

const baseURL = "http://localhost:5000/"
class HttpService {
  async validateError(error , isIndex){
    if(isIndex){
      return;
    }
    if(error?.response?.data?.message=== "jwt malformed" || error?.response?.data?.message === "jwt expired"){
      storageService.remove("role")
      window.location = "/login"

    }
    // if(error.response)
    // console.log(error?.response)
    // console.log(error?.response?.data)
    toast.error(error?.response?.data?.message)
  }
  async get( uri, options = { headers: {}, params: {}, body: {} ,isIndex:false } ) {
    try {
      return await this.request( "GET", uri, options )
    } catch ( error ) {
      this.validateError(error , options.isIndex )
    }
  }
  async post( uri, options = { headers: {}, params: {}, body: {} } ) {
    try {
      return await this.request( "POST", uri, options )
    } catch ( error ) {
      this.validateError(error)
    }
  }
  async patch( uri, options = { headers: {}, params: {}, body: {} } ) {
    try {
      return await this.request( "PATCH", uri, options )
    } catch ( error ) {
      this.validateError(error)
    }
  }
  async delete( uri, options = { headers: {}, params: {}, body: {} } ) {
    try {
     
      return await this.request( "DELETE", uri, options )
    } catch ( error ) {
      this.validateError(error)
    }
  }

  async request( method, uri, options = { headers: {}, params: {}, body: {} } ) {
    let header = this.generateHeaders(uri.headers)
    return await axios.request( {
      method: method,
      baseURL: baseURL,
      url: uri,
      headers: header,
      params: options.params,
      data: options.body
    } )
  }

  generateHeaders( headerInfo ) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ storageService.get( "access_token" ) }`
    }
    if ( headerInfo ) {
      for ( const item of Object.keys( headers ) ) {
        headers[ item ] = headerInfo[ item ]
      }
    }
    return headers
  }
}
export default new HttpService()