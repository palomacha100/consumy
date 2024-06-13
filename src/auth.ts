const URL = import.meta.env.VITE_APP_API_URL
const X_API_KEY = import.meta.env.VITE_X_API_KEY

import { createStorage, type SimpleStorage } from './utils/storage'

class Auth {
  private storage: SimpleStorage
  constructor(persistent = false) {
    this.storage = createStorage(persistent)
  }

  private getFallback(key: string): string | null {
    const transient = createStorage(false)
    const persistent = createStorage(true)
    return transient.get(key) || persistent.get(key)
  }
  success(response: Response, onSuccess: () => void) {
    response.json().then((json) => {
      this.storage.store('token', json.token)
      this.storage.store('email', json.email)
      this.storage.store('refresh_token', json.refresh_token)
      onSuccess()
    })
  }
  failure(response: Response, onFailure: (error: string) => void) {
    response.json().then(() => {
      onFailure('Email já cadastrado')
    })
  }
  currentUser() {
    if (!this.isLoggedIn()) {
      return null
    }
    return {
      email: this.getFallback('email')
    }
  }

  isLoggedIn() {
    return Boolean(this.getFallback('token'))
  }
  signOut(andThen = () => {}) {
    const transient = createStorage(false)
    const persistent = createStorage(true)
    transient.remove('token')
    transient.remove('email')
    persistent.remove('token')
    persistent.remove('email')
    andThen()
  }

  async getUser(onSuccess: (user: any) => void, onFailure: () => void) {
    const response = await fetch(`${URL}/show`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': X_API_KEY,
        'Authorization': `Bearer ${this.getFallback('token')}`
      }})
    if (response.ok) {
      const data = await response.json()
      onSuccess(data)
    } else {
      onFailure()
    }
  }

  async signIn(email: string, password: string, onSuccess: () => void, onFailure: () => void) {
    const body = {
      login: {
        email: email,
        password: password
      }
    }
    fetch(`${URL}/sign_in`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': X_API_KEY
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        this.success(response, onSuccess)
      } else {
        this.failure(response, onFailure)
      }
    })
  }

  async refreshTokens(refresh: string) {
    const response = await fetch(`${URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': X_API_KEY
      },
      body: JSON.stringify({ refresh_token: refresh })
    }); 

    if (response.ok) {
      const data = await response.json();
      this.storage.store('email', data.email)
      this.storage.store('token', data.token);
      this.storage.store('refresh_token', data.refresh_token)
    } else {
      return null;
    }
  };

  async deleteUser(onSuccess: () => void, onFailure: () => void) {
    console.log('aqui delete user')
    const response = await fetch(`${URL}/destroy`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': X_API_KEY,
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.getFallback('token')}`
  }})
    if (response.ok) {
      this.signOut(onSuccess)
    } else {
      onFailure()
    }
}

async updateUser(data: any, onSuccess: () => void, onFailure: () => void) {
  console.log('aqui update user')
  const response = await fetch(`${URL}/update_user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-API-KEY': X_API_KEY,
      'Authorization': `Bearer ${this.getFallback('token')}`
    },
    body: JSON.stringify({user: data})
  })
  if (response.ok) {
    console.log('aqui update user ok')
    onSuccess()
  } else {
    console.log('aqui update user erro')
    onFailure()
  }
}

  async signUp(
    email: string,
    password: string,
    password_confirmation: string,
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const body = {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        role: 1
      }
    }
    fetch(`${URL}/new`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': X_API_KEY
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        this.success(response, onSuccess)
      } else {
        this.failure(response, onFailure)
      }
    })
  }
}


export { Auth }