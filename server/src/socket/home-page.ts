
export interface IProduct {
  image: string;
  name: string;
  link: string;
  slug: string;
  price: {
    original: number;
    discount?: number;
  };
}

const productList: IProduct[] = [
  {
    image: 'https://images-na.ssl-images-amazon.com/images/I/51yNMNF3vuL._SX215_.jpg',
    name: 'Lego Battles: Ninjago - Nintendo DS',
    link: 'https://www.amazon.com/Lego-Battles-Ninjago-Nintendo-DS/dp/B004IYY8PW/ref=sr_1_1?s=videogames&ie=UTF8&qid=1507834556&sr=1-1&keywords=Nintendo+ds+game',
    slug: 'lego-battles-ninjado-nintendo-ds',
    price: {
      original: 143.00,
      discount: 280.00
    },
  }
];

export class HomePageEndpoint {
  constructor(private socket) {}

  init(message, callback) {

    this.socket.emit('home/init.response', {
      productList: productList
    });
  }
}
