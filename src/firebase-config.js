const firebaseConfig = {
    apiKey: "AIzaSyBpeAjwh79XUMrdOQZT1szENm--mM2K_K0",
    authDomain: "eco-prueba-7bce6.firebaseapp.com",
    databaseURL: "https://eco-prueba-7bce6-default-rtdb.firebaseio.com",
    projectId: "eco-prueba-7bce6",
    storageBucket: "eco-prueba-7bce6.appspot.com",
    messagingSenderId: "119339520516",
    appId: "1:119339520516:web:81de37090e2c3f15735b51"
};

export function getFirebaseConfig(){
    if (!firebaseConfig || !firebaseConfig.apiKey){
        throw new Error("Firebase configuration error");
    } else {
        return firebaseConfig;
    }
}
