<div class="controlPanel">
    <button on:click={loadFile}>Load</button>
    <button on:click={saveFile}>Save</button>
</div>
<main on:input={highlight} id="editor" class="editor" contenteditable="plaintext-only" spellcheck="false"></main>

<script lang="ts">
    import { open } from '@tauri-apps/api/dialog';
    import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
    let openedFile: string;

    async function saveFile() {
        if (openedFile == undefined) {
            console.error("No file opened");
            return;
        }

        const editor = document.getElementById('editor')
        if(editor){
            await writeTextFile(openedFile, editor.textContent || "", {});
            console.log("File saved");
        }

    }

    async function loadFile() {
        

        const selected = await open({
            multiple: true,
            filters: [{
                name: 'file',
                extensions: ['css', 'html', 'js', 'txt', 'h']
            }]
        });
        if (Array.isArray(selected)) {
            console.log(selected);
            for (let i = 0; i < selected.length; i++) {
                const content = await readTextFile(selected[i]);
                openedFile = selected[i];
                console.log(content);
                const editor = document.getElementById('editor');
                if(editor) {
                    editor.textContent = content.trim();
                    highlight();
                }
                else {
                    console.error("Editor not found");
                }
            }
        } else if (selected === null) {
        // user cancelled the selection
        } else {
            console.log("SELECTED 1")
        }
    }
    function highlight() {
        const editor = document.getElementById('editor');
        console.log("HIGHLIGHT")
    }
</script>

<style>
    .controlPanel {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #333;
        border-bottom: 1px solid #b1b1b1;
        height: 40px;
        width: 100%;
    }
    button {
        color: #fff;
        width: 100%;
        height: 100%;
        background-color: #000;
        border: none;
        border-right: 1px solid #b1b1b1;
        border-radius: 0;
        margin: 0;
        padding: 0;
        cursor: pointer;
        transition: 200ms;
    }

    button:hover {
        background-color: #333;
        
    }

    ::-webkit-scrollbar {
        width: 20px;
        cursor: default; 
        transition: 200ms;
    }

    ::-webkit-scrollbar-track {
        cursor: default; 
        transition: 200ms;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0); 
        border-radius: 10px;
        cursor: default; 
        transition: 200ms;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #ffffff62; 
        cursor: default; 
    }

    ::highlight(light) {
        color:yellow;
    }

    br {
        background-color: #774c4c;
        color: white
    }

    ::selection {
        background-color: #774c4c;
        color: white
    }

    .editor {
        height: calc(100vh - 41px);
        overflow-y: scroll;
        width: calc(100vw - 41px);
        max-width: calc(100vw - 41px);
        outline:none;
    }
</style>