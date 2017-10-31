interface IConfig {
  title: string;
  description: string;
  amazon: {
    itemSearch: {
      SearchIndex: string;
      Keywords: string;
      ResponseGroup: string;
      MinPercentageOff: string;
    }
  };
}


export interface IHostConfig {
  [host: string]: IConfig;
}

export const HOST_CONFIG: IHostConfig = {
  'localhost:8080' : {
    title: 'Cheap Nintendo Ds Games',
    description: 'Buy nintendo ds games at a cheaper price',
    amazon: {
      itemSearch: {
        SearchIndex: 'VideoGames',
        Keywords: 'nintendo ds games',
        ResponseGroup: 'ItemAttributes,Offers,Images',
        MinPercentageOff: '30'
      }
    }
  },
  'www.cheap-nintendo-ds-games.com' : {
    title: 'Cheap Nintendo Ds Games',
    description: 'Buy nintendo ds games at a cheaper price',
    amazon: {
      itemSearch: {
        SearchIndex: 'VideoGames',
        Keywords: 'nintendo ds games',
        ResponseGroup: 'ItemAttributes,Offers,Images',
        MinPercentageOff: '30'
      }
    }
  }
};
