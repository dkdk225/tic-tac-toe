import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAreWjWUJefpXsDvRTEt6-_Kl_CIGZBgak",
  authDomain: "tic-tac-toe-845c4.firebaseapp.com",
  databaseURL:
    "https://tic-tac-toe-845c4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tic-tac-toe-845c4",
  storageBucket: "tic-tac-toe-845c4.appspot.com",
  messagingSenderId: "1008418777316",
  appId: "1:1008418777316:web:dee22be8c0cc41f1f624f1",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const path = Symbol("path");

class DB {
  constructor(db, id) {
    this[path] = `${db}/${id}`;
  }

  write(data) {
    set(ref(database, this[path]), data);
  }

  read(onComplete) {
    //onComplete gets called with a snapshot as it's argument
    const dbRef = ref(database);
    get(child(dbRef, this[path]))
      .then((snapshot) => {
        if (snapshot.exists()) {
          onComplete(snapshot);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  listen(onUpdate) {
    const tableRef = ref(database, this[path]);
    onValue(tableRef, (snapshot) => {
      onUpdate(snapshot)
    });
  }
}

export default DB;
