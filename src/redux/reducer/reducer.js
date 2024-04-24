import {combineReducers} from 'redux';
import {cart, totalItem} from './cart';
import {chats, totalUnread} from './chat';
import {families} from './family';
import {merchants, merchant} from './merchant';
import {needs} from './need';
import {order, orders} from './order';
import {product, products} from './product';
import {user} from './user';
import {districts, provinces, regencies, villages} from './wilayah';
import {reviews} from './review';
import {search} from './search';

const reducer = combineReducers({
  provinces,
  regencies,
  districts,
  villages,
  needs,
  families,
  merchants,
  merchant,
  products,
  product,
  cart,
  totalItem,
  orders,
  order,
  chats,
  totalUnread,
  user,
  reviews,
  search,
});

export default reducer;
