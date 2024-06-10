import { cartState } from './cartService';
import { BaseService } from './baseService';

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
          onSuccess();
          cartState.cart = [];
          cartState.totalItemsInCart = 0;
        } else {
          onFailure();
        }
      } else {
        onFailure()
      }
    }
  }


export { OrderService }
