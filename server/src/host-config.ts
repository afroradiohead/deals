interface IConfig {
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
