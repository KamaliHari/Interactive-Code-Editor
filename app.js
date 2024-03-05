  var html = document.getElementById('html').innerHTML;
var css = document.getElementById('css');
var js = document.getElementById('js');
var code = document.getElementById('output').contentWindow.document;

function compile() {
  var htmlCode = htmlEditor.getValue();
  let cssCode = "<style>" + cssEditor.getValue() + "</style>";
  let scriptCode = jsEditor.getValue();
  let output = document.querySelector(".outputContainer #output");
  output.contentDocument.body.innerHTML = htmlCode + cssCode;
  output.contentWindow.eval(scriptCode);
}

var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html"), {
  lineNumbers: true,
  mode: "text/html",
  theme: "default",
  autoCloseTags: true,
  autoCloseBrackets: true,
  extraKeys: { "Ctrl-Space": "autocomplete" },
  hintOptions: { hint: CodeMirror.hint.html }

  
}); 
htmlEditor.setSize("50px",null);

var cssEditor = CodeMirror.fromTextArea(document.getElementById("css"), {
  lineNumbers: true,
  mode: "css",
  theme: "default",
  autoCloseTags: true,
  autoCloseBrackets: true,
  extraKeys: { "Ctrl-Space": "autocomplete" },
  hintOptions: { hint: CodeMirror.hint.css }
});

var jsEditor = CodeMirror.fromTextArea(document.getElementById("js"), {
  lineNumbers: true,
  mode: "javascript",
  autoCloseTags: true,
  autoCloseBrackets: true,
  theme: "default",
  extraKeys: { "Ctrl-Space": "autocomplete" },
  hintOptions: { hint: CodeMirror.hint.javascript }
  
});

htmlEditor.on("change", compile);
cssEditor.on("change", compile);
jsEditor.on("change", compile);

function run(){		
  var htmlCode=htmlEditor.getValue();			
  let cssCode="<style>"+cssEditor.getValue()+"</style>";
  let scriptCode=jsEditor.getValue();
  let output =document.querySelector(".outputContainer #output");
  output.contentDocument.body.innerHTML=htmlCode+cssCode;
  output.contentWindow.eval(scriptCode);
}

document.querySelectorAll('.clear').forEach((clear) =>
  clear.addEventListener('click', (e) => {
    const textareaId = e.target.getAttribute('data-textarea'); 
    const editor = window[textareaId + 'Editor']; 
    editor.setValue(''); 
    localStorage.setItem(`livecode-${textareaId}`, JSON.stringify('')); 
    compile(); 
  })
);


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

var themeSelect = document.getElementById('theme-select');

themeSelect.addEventListener('change', function() {
  var selectedTheme = themeSelect.value;
  htmlEditor.setOption('theme', selectedTheme);
  cssEditor.setOption('theme', selectedTheme);
  jsEditor.setOption('theme', selectedTheme);
});

var fontSizeSelect = document.getElementById('font-size-select');

fontSizeSelect.addEventListener('change', function() {
  var selectedFontSize = fontSizeSelect.value;
  htmlEditor.getWrapperElement().style.fontSize = selectedFontSize;
  cssEditor.getWrapperElement().style.fontSize = selectedFontSize;
  jsEditor.getWrapperElement().style.fontSize = selectedFontSize;
});

function copyToClipboard(editorId) {
  var editor;
  switch (editorId) {
    case 'html':
      editor = htmlEditor;
      break;
    case 'css':
      editor = cssEditor;
      break;
    case 'js':
      editor = jsEditor;
      break;
    default:
      console.error('Invalid editor ID');
      return;
  }

  var editorValue = editor.getValue().trim();
  if (editorValue === "") {
    alert("Editor is empty. Nothing to copy.");
    return;
  }

  navigator.clipboard.writeText(editorValue)
    .then(() => {
      alert("Text copied to clipboard");
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
}


