import { Injectable } from "@angular/core";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    fileUploadLinks= {
        imageUrl:"",
        textUrl: "",
    }
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyCSPWBbM9S0xOH-KySSmmeWQ1oqLyuDiGQ",
            authDomain: "cloud-computing-1d597.firebaseapp.com",
            projectId: "cloud-computing-1d597",
            storageBucket: "cloud-computing-1d597.appspot.com",
            messagingSenderId: "174924976413",
            appId: "1:174924976413:web:7a2bb01a1a253bc92ed1f4"
        })
    }

    uploadFile = async (file, fileType) => {
        const uuid = (+new Date).toString();
        await firebase.storage().ref(`/${fileType}`).put(file);

        const downloadUrl = await firebase.storage()
            .ref(fileType)
            .getDownloadURL();
        const fileLocation = await firebase.storage()
            .ref(fileType).fullPath;

        return { downloadUrl, fileLocation };
    };


}