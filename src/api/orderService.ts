import { Auth } from '@/auth';
import { BaseService } from './baseService';
const X_API_KEY = import.meta.env.VITE_X_API_KEY


class OrderService extends BaseService {
  constructor() {
    super()
  }
  async createOrder(order: any, payment: any, onSuccess:() => void, onFailure:() => void) {
    const response = await this.create('buyers/orders', JSON.stringify(order))
    if (response.ok) {
      const data = await response.json()
      const paymentResponse = await 
      this.put(`buyers/orders/${data.order.id}/pay`, payment)
      if (paymentResponse.ok) {
        onSuccess()
      } else {
        onFailure()
      }
    }
  }
}

export { OrderService }
