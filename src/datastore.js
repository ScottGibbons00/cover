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

export function addPost(caption, video, description) {
  const post = firebase.database().ref('Posts/');
  post.push({
      caption,
      video,
      description
  });
}

export function fetchPost(callback) {
  database.ref('Posts/').on('value', (snapshot) => {
    const allPosts = snapshot.val();
    callback(allPosts);
  });
}

export function removePost(postID) {
  database.ref('Posts/').child(postID).remove();
}

export function updateName(id, newName) {
  const updates = {description: newName.song};
  var update = database.ref('Posts/' + id);
  update.update(updates);
}

