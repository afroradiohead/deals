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
    newsletterEmailAddress: 'newsletter@cheap-nintendo-ds-games.com'
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
    newsletterEmailAddress: 'newsletter@cheap-nintendo-ds-games.com'
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
    newsletterEmailAddress: 'newsletter@digitalcameralensesforsale.com'
  }
};
