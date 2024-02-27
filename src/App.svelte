<script lang="ts">
  function getColorised(str: string) {
    const openTag = /<[^<]*>/g
    const openString = /"[^"]*"/gm
    const param = /\|[^|]+\|/g
    let a = document.createElement('div')
    const opensString = [...str.matchAll(openString)];
    const opensTag = [...str.matchAll(openTag)];
    const opensParam = [...str.matchAll(param)];
    const tagHighlights = new Array;
    console.log(opensParam)

    for(let i = 0; i < opensTag.length; i++){
      let isTagName = true;
      if(opensTag[i][0][1] !== '/'){
        for(let j = 1; j < opensTag[i][0].length-1; j++){
          if(opensTag[i][0][j] === " ") isTagName = false;
          if(isTagName) tagHighlights[j + (opensTag[i].index || 0)] = "number"
          else if(opensTag[i][0][j] !== "=") tagHighlights[j + (opensTag[i].index || 0)] = "tag-atributes"
        }
      } else {
        for(let j = 2; j < opensTag[i][0].length-1; j++){
          tagHighlights[j + (opensTag[i].index || 0)] = "number"
        }
      }
    }

    for(let i = 0; i < opensString.length; i++){  
      for(let j = 0; j < opensString[i][0].length; j++){
        tagHighlights[j + (opensString[i].index || 0)] = "string"
      }
    }

    for(let i = 0; i < opensParam.length; i++){  
      for(let j = 0; j < opensParam[i][0].length; j++){
        tagHighlights[j + (opensParam[i].index || 0)] = "param"
      }
    }

    for(let i = 0; i < str.length; i++) {
      if(tagHighlights[i]) {
        a.innerHTML += `<span class="${tagHighlights[i]}">${str[i]}</span>`
      } else {
        a.innerHTML += str[i];
      }
    }
    
    return a;
  }
  </script>
  
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
    outline: none;
    width: max-content;
    margin-left: 8px;
    min-width: 100vw;
    height: 100vh;
    height: 100%;
    color: rgba(0,0,0,0);
    caret-color: #ffffff;
  }
</style>