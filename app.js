var html = document.getElementById('html');
var css = document.getElementById('css');
var js = document.getElementById('js');
var code = document.getElementById('output').contentWindow.document;

function run(){		
  var htmlCode=htmlEditor.getValue();			
  let cssCode="<style>"+cssEditor.getValue()+"</style>";
  let scriptCode=jsEditor.getValue();
  let output =document.querySelector(".outputContainer #output");
  output.contentDocument.body.innerHTML=htmlCode+cssCode;
  output.contentWindow.eval(scriptCode);
  console.log(htmlCode,cssCode,scriptCode)
}

document.querySelectorAll('.control').forEach((control) =>
  control.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.classList.toggle('collapse');
    e.target.classList.add('close');
    e.target.parentElement.querySelector('h2').classList.toggle('hidden');
  })
);

document.querySelectorAll('.clear').forEach((clear) =>
  clear.addEventListener('click', (e) => {
    const ele = e.target.classList[1];
    document.querySelector(`#${ele}`).value = '';
    localStorage.setItem(`livecode-${ele}`, JSON.stringify(''));
    compile();
  })
);

document.querySelectorAll('.copy-btn').forEach((copy) => {
  copy.addEventListener('click', (e) => {
    const temp = e.target.innerHTML;
    e.target.innerText = 'Copied!';
    setTimeout(function () {
      e.target.innerHTML = temp;
    }, 800);
  });
});

document.querySelector('.copy-html').addEventListener('click', (e) => {
  const code = document.querySelector('#html');
  copyCode(code);
});

document.querySelector('.copy-css').addEventListener('click', (e) => {
  const code = document.querySelector('#css');
  copyCode(code);
});

document.querySelector('.copy-js').addEventListener('click', (e) => {
  const code = document.querySelector('#js');
  copyCode(code);
});

function copyCode(code) {
  code.select();
  document.execCommand('copy');
  swal('Copied!', 'You are ready to rock', 'success');
}
document.querySelector('.save-btn').addEventListener('click', async () => {
  const htmlContent = html.value;
  const cssContent = css.value;
  const jsContent = js.value;

  try {
    const handle = await window.showDirectoryPicker();
    const files = [
      { name: 'index.html', content: htmlContent },
      { name: 'styles.css', content: cssContent },
      { name: 'script.js', content: jsContent }
    ];

    for (const file of files) {
      const writable = await handle.getFileHandle(file.name, { create: true });
      const writableStream = await writable.createWritable();
      await writableStream.write(file.content);
      await writableStream.close();
    }

    alert('Files have been saved successfully.');
  } catch (error) {
    console.error('Error saving files:', error);
    alert('Failed to save files. Please try again.');
  }
});

var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html"), {
  lineNumbers: true, 
  mode: "text/html",
  theme: "default",
  autoCloseTags: true, 
});
  
var cssEditor = CodeMirror.fromTextArea(document.getElementById("css"), {
  lineNumbers: true, 
  mode: "css",
  theme: "default",
  autoCloseTags: true, 
});
  
var jsEditor = CodeMirror.fromTextArea(document.getElementById("js"), {
  lineNumbers: true, 
  mode: "javascript",
  autoCloseTags: true, 
  theme: "default",
});

var themeSelect = document.getElementById('theme-select');

themeSelect.addEventListener('change', function() {
  var selectedTheme = themeSelect.value;
  htmlEditor.setOption('theme', selectedTheme);
  cssEditor.setOption('theme', selectedTheme);
  jsEditor.setOption('theme', selectedTheme);
});

  