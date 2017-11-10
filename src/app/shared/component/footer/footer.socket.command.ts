import {ISocketCommand} from '../../../../shared/class/socketeer';

export class SocketCommand implements ISocketCommand {
  namespace = 'shared/component/footer';

  events: {
    INIT_FROMCLIENT: {
      id?: string
    },
    INIT_FROMSERVER: {
      refreshTimestamp: string
    };
  };
}
