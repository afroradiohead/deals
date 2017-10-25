import { Injectable } from '@angular/core';

const ga = window['ga'] = window['ga'] || function(){(ga.q = ga.q || []).push(arguments); }; ga.l = +new Date;

@Injectable()
export class GoogleAnalyticsService {

  constructor() {
    const node = document.createElement('script');
    node.src = 'https://www.google-analytics.com/analytics.js';
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);

    ga('create', 'UA-108296420-2', 'auto');
    ga('send', 'pageview');
    console.log('sent google analytics');
  }



}
