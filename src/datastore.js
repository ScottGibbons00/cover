import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyADTKp2r9tVplLCrD2Q5ThSDBBm5oQ1TRw",
  authDomain: "scotts-project-test-bc226.firebaseapp.com",
  databaseURL: "https://scotts-project-test-bc226.firebaseio.com",
  storageBucket: "scotts-project-test-bc226.appspot.com",
  projectId: "scotts-project-test-bc226"
};
firebase.initializeApp(config);

const database = firebase.database();

export function addDog(dogName) {
  const dogs = firebase.database().ref('Dogs/');
  dogs.push({
      dogName
  });
}
