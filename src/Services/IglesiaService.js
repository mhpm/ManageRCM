import firebase,{ firestore } from 'firebase'

class IglesiaService {
    
    constructor(){
        console.log('Class');
    }

    GetUser(){
        let self = this;
        console.log('GetUser');

    }
}

export default {
    IglesiaService: new IglesiaService()
}