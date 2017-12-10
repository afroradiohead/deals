import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-jsonld',
  templateUrl: './jsonld.component.html',
  styleUrls: ['./jsonld.component.scss']
})
export class JsonldComponent implements OnInit {
  jsonLDString: SafeHtml;
  @Input() set json(val){
    this.jsonLDString = this.sanitizer.bypassSecurityTrustHtml('<script type="application/ld+json">' + JSON.stringify(val) + '</script>');
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {


  }

}
