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
        } else if (paymentResponse.status === 401) {
          const refresh_token = this.storage.get('refresh_token') || '[]';
          const parseRefresh = refresh_token;
          await this.auth.refreshTokens(parseRefresh);
          const newResponse = await this.put
            (`buyers/orders/${data.order.id}/pay`, payment)
          if (newResponse.ok) {
            onSuccess();
            cartState.cart = [];
            cartState.totalItemsInCart = 0;
          }
        else {
          onFailure();
        }
      } else {
        onFailure()
      }
    }
  }
}

export { OrderService }
