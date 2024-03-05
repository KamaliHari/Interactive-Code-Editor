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

const controlButtons = document.querySelectorAll('.control');
controlButtons.forEach(button => {
  button.addEventListener('click', () => {
    const wrapper = button.closest('.wrapper');
    wrapper.classList.toggle('fullscreen');
  });
});

async function saveProject() {
  try {
   
    const htmlContent = window['htmlEditor'].getValue();
    const cssContent = window['cssEditor'].getValue();
    const jsContent = window['jsEditor'].getValue();
    
    console.log("HTML Content:", htmlContent);
    console.log("CSS Content:", cssContent);
    console.log("JS Content:", jsContent);

    
    const directoryHandle = await window.showDirectoryPicker();

    const htmlFileHandle = await directoryHandle.getFileHandle("index.html", { create: true });
    const htmlWritable = await htmlFileHandle.createWritable();
    await htmlWritable.write(htmlContent);
    await htmlWritable.close();

    const cssFileHandle = await directoryHandle.getFileHandle("styles.css", { create: true });
    const cssWritable = await cssFileHandle.createWritable();
    await cssWritable.write(cssContent);
    await cssWritable.close();

    const jsFileHandle = await directoryHandle.getFileHandle("script.js", { create: true });
    const jsWritable = await jsFileHandle.createWritable();
    await jsWritable.write(jsContent);
    await jsWritable.close();

    console.log("Project saved successfully!");
  } catch (err) {
    console.error("Error saving project:", err);
  }
}

document.querySelector('.save-btn').addEventListener('click', saveProject);



