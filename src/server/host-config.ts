interface IConfig {
  title: string;
  description: string;
  amazon: {
    itemSearch: {
      SearchIndex: string;
      Keywords: string;
      ResponseGroup: string;
    }
  };
  newsletterEmailAddress: string;
  gaId: string;
}


export interface IHostConfig {
  [host: string]: IConfig;
}

export const HOST_CONFIG: IHostConfig = {
  'localhost:8080' : {
    title: 'Digital Camera Lenses For Sale',
    description: 'Buy camera lenses up to 90% off retail value',
    amazon: {
      itemSearch: {
        SearchIndex: 'Electronics',
        Keywords: 'digital camera lenses',
        ResponseGroup: 'ItemAttributes,Offers,Images'
      }
    },
    newsletterEmailAddress: 'newsletter@cheap-nintendo-ds-games.com',
    gaId: 'UA-108296420-1'
  },
  'www.cheap-nintendo-ds-games.com' : {
    title: 'Cheap Nintendo Ds Games',
    description: 'Buy nintendo ds games up to 90% off retail value',
    amazon: {
      itemSearch: {
        SearchIndex: 'VideoGames',
        Keywords: 'nintendo ds games',
        ResponseGroup: 'ItemAttributes,Offers,Images'
      }
    },
    newsletterEmailAddress: 'newsletter@cheap-nintendo-ds-games.com',
    gaId: 'UA-108296420-2'
  },
  'www.digitalcameralensesforsale.com' : {
    title: 'Digital Camera Lenses For Sale',
    description: 'Buy camera lenses up to 90% off retail value',
    amazon: {
      itemSearch: {
        SearchIndex: 'Electronics',
        Keywords: 'digital camera lenses',
        ResponseGroup: 'ItemAttributes,Offers,Images'
      }
    },
    newsletterEmailAddress: 'newsletter@digitalcameralensesforsale.com',
    gaId: 'UA-108296420-3'
  },
  'www.rainbowloomdeals.com' : {
    title: 'Rainbow Loom Deals',
    description: 'Buy rainbow loom products up to 90% off retail value',
    amazon: {
      itemSearch: {
        SearchIndex: 'Toys',
        Keywords: 'rainbow loom',
        ResponseGroup: 'ItemAttributes,Offers,Images'
      }
    },
    newsletterEmailAddress: 'newsletter@rainbowloomdeals.com',
    gaId: 'UA-108296420-4'
  },
  'www.arcade-machines-for-sale.com' : {
    title: 'Arcade Machines For Sale',
    description: 'Buy arcade machines up to 90% off retail value',
    amazon: {
      itemSearch: {
        SearchIndex: 'Toys',
        Keywords: 'arcade machines',
        ResponseGroup: 'ItemAttributes,Offers,Images'
      }
    },
    newsletterEmailAddress: 'newsletter@arcade-machines-for-sale.com',
    gaId: 'UA-108296420-5'
  },
  'www.growing-tents-for-sale.com' : {
    title: 'Growing Tents For Sale',
    description: 'Buy growing tents up to 90% off retail value',
    amazon: {
      itemSearch: {
        SearchIndex: 'LawnAndGarden',
        Keywords: 'growing tent',
        ResponseGroup: 'ItemAttributes,Offers,Images'
      }
    },
    newsletterEmailAddress: 'newsletter@growing-tents-for-sale.com',
    gaId: 'UA-108296420-6'
  },
  'www.growing-lamps-for-sale.com' : {
    title: 'Growing Lamps For Sale',
    description: 'Buy growing lamps up to 90% off retail value',
    amazon: {
      itemSearch: {
        SearchIndex: 'LawnAndGarden',
        Keywords: 'growing lamps',
        ResponseGroup: 'ItemAttributes,Offers,Images'
      }
    },
    newsletterEmailAddress: 'newsletter@growing-lamps-for-sale.com',
    gaId: 'UA-108296420-7'
  }
};
