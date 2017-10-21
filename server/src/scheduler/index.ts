import {AmazonScheduler} from './amazon';

const KlassList = [
  AmazonScheduler
];

export class Cron {
  constructor(app) {
    KlassList.forEach(klass => new klass(app));
  }
}
