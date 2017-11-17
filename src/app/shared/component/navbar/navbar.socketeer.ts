import {ASocketeer} from '../../../../shared/class/socketeer';

// @todo make this more clearer
export class Socketeer extends ASocketeer<{
  CLIENT_EVENTS: {
    INIT: {};
    SUBSCRIBE: {email: string;};
  },
  SERVER_EVENTS: {
    INIT: {
      title: string;
      description: string;
      refreshTimestamp: string;
    },
    SUBSCRIBE: {}
  }
}> {
  namespace = 'shared/component/navbar';
}
