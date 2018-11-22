import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { animationFrameScheduler } from 'rxjs';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  bashCode = '$ npm install --save ngx-highlightjs';

  tsCode = `import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  imports: [
    HighlightModule.forRoot({ theme: 'agate' })
  ]
})
export class AppModule { }`;

  htmlCode = `<!-- Highlight element directly -->
<pre><code highlight [code]="someCode"></code></pre>
<pre><code highlight [textContent]="someCode"></code></pre>
<pre><code highlight>import { HighlightModule } from 'ngx-highlightjs';</code></pre>

<!-- Highlight all child elements of type <pre><code> -->
<div highlight="all">
  <pre><code>import { HighlightModule } from 'ngx-highlightjs';</code></pre>
  <pre><code [textContent]="tsCode"></code></pre>
  <pre><code [textContent]="cssCode"></code></pre>
</div>

<!-- Highlight custom child elements -->
<div highlight="section code">
  <section><code [textContent]="pythonCode"></code></section>
  <section><code>import { HighlightModule } from 'ngx-highlightjs';</code></section>
</div>`;

  scssCode = `pre {
  display: flex;
  height: 100%;
  word-wrap: normal;
  margin: 0;
  overflow-y: auto;
  code {
      flex: 1;
      padding: 24px;
      line-height: 1.8em;
      display: block;
      font-size: 0.9em;
  }
}`;

  code: string;

  theme = 'atom-one-dark';

  styles = [
    'vs',
    'rainbow',
    'dracula',
    'androidstudio',
    'agate',
    'zenburn',
    'agate',
    'color-brewer',
    'atom-one-dark',
    'atom-one-light',
    'github',
    'solarized-light',
    'solarized-dark',
    'railscasts',
    'tomorrow',
    'monokai-sublime',
    'mono-blue',
    'default',
  ];

  @ViewChild('textScrollbar') textScrollbar: NgScrollbar;
  @ViewChild('highlightScrollbar') highlightScrollbar: NgScrollbar;
  @ViewChild(CdkTextareaAutosize) textareaAutosize: CdkTextareaAutosize;

  ngOnInit() {
    this.setCode(this.tsCode);
  }

  setCode(code: string) {
    this.code = code;
    this.textareaAutosize.resizeToFitContent();
    setTimeout(() => {
      this.textScrollbar.update();
      this.highlightScrollbar.update();
    }, 300);
  }

  changeTheme() {
    let disablePreviousTheme;
    document.head.querySelectorAll('.codestyle').forEach((linkElement: HTMLLinkElement) => {
      const disabled = linkElement.href.substr(linkElement.href.lastIndexOf('/') + 1) !== `${this.theme}.css`;
      if (!linkElement.disabled) {
        disablePreviousTheme = linkElement;
      } else {
        linkElement.disabled = disabled;
      }
    });
    animationFrameScheduler.schedule(() => disablePreviousTheme.disabled = true);
  }

}
