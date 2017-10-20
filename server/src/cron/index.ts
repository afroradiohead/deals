import {AmazonCron} from "./amazon";

const KlassList = [
  // AmazonCron
];

export class Cron {
  constructor(app) {
    KlassList.forEach(klass => new klass(app));
  }
}
