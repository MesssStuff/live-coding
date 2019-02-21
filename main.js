let codeText1 = `
/*
Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
*/

body {
  background-color: rgb(30, 30, 30);
  font-size: 16px;
  display: flex;
}

.code {
  margin: 2%;
  padding: 16px;
  height: 90vh;
  overflow: hidden;
  border: 4px solid rgb(0, 122, 204);
  border-radius: 2px;
}

/*
Lorem ipsum dolor sit amet
*/

.token.comment{
  color: slategray;
}

.token.selector {
  color: #a6e22e;
}

.token.punctuation {
  color: #f8f8f2;

}

.token.property {
  color: #f92672;
}

.token.function {
  color: #e6db74;
}
`;

let codeText2 = `
/*
Lorem ipsum dolor sit amet
*/

body {
  perspective: 1000px;
}

.code {
  width: 46%;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}

.markdown {
  height: 90vh;
  width: 46%;
  margin: 2%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: auto;
  -webkit-transform: rotateY(-10deg) translateZ(-100px) ;
          transform: rotateY(-10deg) translateZ(-100px) ;
}
`;

let markdownText = `# Lorem ipsum

- consectetur adipisicing elit
- sed do eiusmod tempor incididunt
- ut labore et dolore magna aliqua

# Lorem ipsum

- consectetur adipisicing elit
- sed do eiusmod tempor incididunt
- ut labore et dolore magna aliqua

[Lorem ipsum](http://consectetur.com)

# Lorem ipsum

- consectetur adipisicing elit
- sed do eiusmod tempor incididunt
- ut labore et dolore magna aliqua

# Lorem ipsum

- consectetur adipisicing elit
- sed do eiusmod tempor incididunt
- ut labore et dolore magna aliqua

[Lorem ipsum](http://consectetur.com)
`;

function writeCode(newContent, oldContent) {
  return new Promise(finished => {
    let code = document.querySelector('.code');
    let styleTag = document.getElementById('code-style');
    oldContent = oldContent || '';
    let counter = 0;
    let timerId = setInterval(() => {
      ++counter;
      code.innerHTML = Prism.highlight(
        oldContent + newContent.substring(0, counter),
        Prism.languages.css,
        'css'
      );
      styleTag.innerHTML = oldContent + newContent.substring(0, counter);
      if (counter >= newContent.length) {
        window.clearInterval(timerId);
        finished(newContent);
      }
      code.scrollTop = code.scrollHeight;
    }, 20);
  });
}

function writeMarkdown(newContent, oldContent) {
  return new Promise(finished => {
    let markdown = document.querySelector('.markdown');
    oldContent = oldContent || '';
    let counter = 0;
    let timerId = setInterval(() => {
      ++counter;
      markdown.innerHTML = Prism.highlight(
        oldContent + newContent.substring(0, counter),
        Prism.languages.markdown,
        'markdown'
      );
      if (counter >= newContent.length) {
        window.clearInterval(timerId);
        finished(newContent);
      }
      markdown.scrollTop = markdown.scrollHeight;
    }, 20);
  });
}

writeCode(codeText1, '')
  .then(() => {
    return writeMarkdown(markdownText, '');
  })
  .then(() => {
    writeCode(codeText2, codeText1);
  });
