import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, addDoc
    , deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDocs,
    updateDoc

} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCG0BStVLQS8B3Gux2TSoz9YTxHOd_lOvo",
    authDomain: "financial-account-fa9d9.firebaseapp.com",
    projectId: "financial-account-fa9d9",
    storageBucket: "financial-account-fa9d9.appspot.com",
    messagingSenderId: "11670834303",
    appId: "1:11670834303:web:8310ea5f248efd1759c34a",
    measurementId: "G-K54B8W3NQ8"
};



//init Firebase app

initializeApp(firebaseConfig)

// init services

const db = getFirestore()

//collection ref
const colRef = collection(db, "Accounts")



//adding data

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        Title: addBookForm.title.value,
        Type: addBookForm.Type.value
    })
        .then(() => {
            addBookForm.reset()
            location.reload()
        })

})


//delete account
const deleteAccountForm = document.querySelector('.delete')
deleteAccountForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, 'Accounts', deleteAccountForm.id.value)
    deleteDoc(docRef)
        .then(() => {
            deleteAccountForm.reset()
            location.reload()

        })

})



//getting real time data

onSnapshot(colRef, (snapshot) => {
    let accounts = []
    snapshot.docs.forEach((doc) => {
        accounts.push({ id: doc.id, ...doc.data() })
    })
    let table = document.querySelector('#tbody')
    // window.onload()
    accounts.forEach(element => {
        let template = `
            <tr >
                <td>${element.id}</td>
                <td>${element.Title}</td>
                <td>${element.Type}</td>
            </tr>
        `
        table.innerHTML += template;



    });
})



