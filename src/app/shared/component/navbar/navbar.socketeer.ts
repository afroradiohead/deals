import {ASocketeer} from '../../../../shared/class/socketeer';

export class Socketeer extends ASocketeer<{
  CLIENT_EVENTS: {
    INIT: {}
  },
  SERVER_EVENTS: {
    INIT: {
      title: string;
      description: string;
      refreshTimestamp: string;
    }
  }
}> {
  namespace = 'shared/component/navbar';
}
