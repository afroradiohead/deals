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

export const DOMAIN_CONFIG: {[domain: string]: IConfig} = {
  'localhost:4200' : {
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
