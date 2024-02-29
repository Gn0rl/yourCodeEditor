<div>
  <main class="container">
    <div id="in" on:input={()=>{
        const input = document.getElementById("in");
        if(input) {
          console.log(getColorised(input.innerText))
          const arr = input.innerText.split('\n');
          let a = document.createElement('text')
          a.textContent = arr.join('\n')
          const out = document.getElementById('out')
        
          if(out){
            out.replaceChildren(getColorised(input.innerText))
            // out.innerHTML =  arr.map(a => a.split('').map(b => b === "<" ? `<span class="number">${b}</span>` : b).join('')).join('\n');
          }
        }
      }
    } contenteditable="plaintext-only" class="input"></div>    
    <div inert  id="out"></div>
  </main>
</div>
<style>

  #out {
    white-space: pre;
    position: absolute;
    top:8px;
    left:16px;
    height: calc(100vh - 16px);
  }

  ::selection {
    background: #141a96;
    color: rgba(0,0,0,1);
  }

  .input {
    height: calc(100vh - 16px);
    outline: none;
    width: max-content;
    margin-left: 8px;
    min-width: calc( 100vw - 16px );
    height: 100vh;
    height: 100%;
    color: rgba(0,0,0,0);
    caret-color: #ffffff;
  }
</style>

<script lang="ts">
  function getColorised(str: string) {
    const openTagReg = /<[^<]*>/g
    const openStringReg = /"[^"]*"/gm
    const paramReg = /\|[^|]+\|/g
    const constVariableReg = /(?<=const )[^=]*/gm
    const constReg = /const /gm
    const varReg = /var /gm
    const letReg = /let /gm

    const opensTag = [...str.matchAll(openTagReg)]

    const tagHighlights = new Array;

    for(let i = 0; i < opensTag.length; i++){
      let isTagName = true;
      if(opensTag[i][0][1] !== '/'){
        for(let j = 1; j < opensTag[i][0].length-1; j++){
          if(opensTag[i][0][j] === " ") isTagName = false;
          if(isTagName) tagHighlights[j + (opensTag[i].index || 0)] = "#747bff"
          else if(opensTag[i][0][j] !== "=") tagHighlights[j + (opensTag[i].index || 0)] = "#acb1ff"
        }
      } else {
        for(let j = 2; j < opensTag[i][0].length-1; j++){
          tagHighlights[j + (opensTag[i].index || 0)] = "#747bff"
        }
      }
    }
    

    createHighlight(paramReg, "rgb(209, 141, 248)", str, tagHighlights);
    createHighlight(constVariableReg, "rgb(146, 146, 231)", str, tagHighlights);
    createHighlight(constReg, "#4c51c0", str, tagHighlights);
    createHighlight(openStringReg, "rgb(228, 145, 85)", str, tagHighlights);

    let a = document.createElement('div')

    for(let i = 0; i < str.length; i++) {
      if(tagHighlights[i]) {
        a.innerHTML += `<span style="color: ${tagHighlights[i]}">${str[i]}</span>`
      } else {
        a.innerHTML += str[i];
      }
    }
    
    return a;
  }

  function createHighlight(reg: RegExp, color: string, str: string, tagHighlights: Array<string>) {
    const findToHighlight = [...str.matchAll(reg)]
    for(let i = 0; i < findToHighlight.length; i++){  
      for(let j = 0; j < findToHighlight[i][0].length; j++){
        tagHighlights[j + (findToHighlight[i].index || 0)] = color
      }
    }
  }
</script>