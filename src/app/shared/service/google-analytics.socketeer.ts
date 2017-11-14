import {ASocketeer} from "../../../shared/class/socketeer";

export class Socketeer extends ASocketeer<{
  CLIENT_EVENTS: {
    INIT: {}
  },
  SERVER_EVENTS: {
    INIT: {
      gaId: string
    }
  }
}> {
  namespace = 'google-analytics';
}
