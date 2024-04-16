import { storage } from "./storage"
import Swal from 'sweetalert2'

function success(response: Response, onSuccess: () => void) {
    response.json().then((json) => {
    storage.store('token', json.token)
    storage.store('email', json.email)
    onSuccess()
    })
   }
function failure(response: Response, onFailure: () => void) {
    onFailure()
}

function loggedIn() {
    return Boolean(storage.get('token'))
}

function signOut(andThen: () => void = () => {}) {
    storage.remove('token')
    storage.remove('email')

        andThen()

}

function currentUser() {
    if(!loggedIn()) {
        return null
    }
    return {
        email: storage.get('email')
    }
}

const URL = import.meta.env.VITE_APP_API_URL;
console.log(URL)


async function signIn(
    email: string, 
    password: string, 
    onSuccess: () => void, 
    onFailure: () => void
    ) {
    
    const body = {
        login:{
            email: email,
            password: password
        }
    }
    const response = await fetch(
        `${URL}/sign_in`, {
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