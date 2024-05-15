class StorageService {
    constructor () {
      this.localStorage = window.localStorage
      this.sessionStorage = window.sessionStorage
    }
  
    // LocalStorage
    set( key, value ) {
      this.localStorage.setItem( key, value )
    }
  
    get( key ) {
      return this.localStorage.getItem( key )
    }
  
    remove( key ) {
      this.localStorage.removeItem( key )
    }
  
    setObject( key, obj ) {
      this.localStorage.setItem( key, JSON.stringify( obj ) )
    }
  
    getObject( key ) {
      return JSON.parse( this.localStorage.getItem( key ) )
    }
  
    // Session
    setSession( key, value ) {
      this.sessionStorage.setItem( key, value )
    }
  
    getSession( key ) {
      return this.sessionStorage.getItem( key )
    }
  
    removeSession( key ) {
      this.sessionStorage.removeItem( key )
    }
  
    setObjectSession( key, obj ) {
      this.sessionStorage.setItem( key, JSON.stringify( obj ) )
    }
  
    getObjectSession( key ) {
      return JSON.parse( this.sessionStorage.getItem( key ) )
    }
  }
  
  export default new StorageService()