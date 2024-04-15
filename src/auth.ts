import { storage } from "./storage"
import Swal from 'sweetalert2'

function success(response, onSuccess) {
    response.json().then((json) => {
    storage.store('token', json.token)
    storage.store('email', json.email)
    onSuccess()
    })
   }
function failure(response, onFailure) {
    onFailure()
}

function loggedIn() {
    return Boolean(storage.get('token'))
}

function signOut(andThen = null) {
    storage.remove('token')
    storage.remove('email')

    if(typeof(andThen) == 'function') {
        andThen()
    }
}

function currentUser() {
    if(!loggedIn()) {
        return null
    }
    return {
        email: storage.get('email')
    }
}


async function signIn(email, password, onSuccess, onFailure) {
    
    const body = {
        login:{
            email: email,
            password: password
        }
    }
    const response = await fetch(
        "http://localhost:3000/sign_in", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if(response.ok) {
            success(response, onSuccess)
        } else {
            failure(response, onFailure)
            console.log(response)
            Swal.fire({
                icon: "error",
                title: `${response.status}`,
                text: `${response.statusText}`,
                confirmButtonColor: '#2C5C8F',
              });
        }
    })
}

export const auth = {
    signIn,
    loggedIn,
    currentUser,
    signOut,
}