import {AmazonScheduler} from './amazon';

const KlassList = [
  AmazonScheduler
];

export class Scheduler {
  constructor(app) {
    KlassList.forEach(klass => new klass(app));
  }
}
