import Auction from './controller/Auction.js';
import Images from './controller/Images.js';

export default {
  addImage: Images.add,
  getImages: Images.getAll
  // create: Auction.create
}
