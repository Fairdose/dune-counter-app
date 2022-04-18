# Dune Adventures of Imperium Counter for Roll20

This is fan made tool that utilizes iframe within your campaign screen. Currently, it supports only one socket.
Link to [API](https://github.com/Fairdose/dune-counter-api)

## Usage

Paste this code in your console when you are in the game or use it with scripting tool like tampermonkey 

```js
(function () {
  const targetElement = document.getElementById("playerzone");
  const fragment = document.createDocumentFragment();
  const iframe = document.createElement("iframe");

  iframe.id = "dune-counter-frame";
  iframe.src = "https://dune-counter.fairdose.net/"

  fragment.appendChild(iframe);

  const iframeStyle = document.createElement("style");
  iframeStyle.textContent = "#dune-counter-frame {position: absolute;right: 2em;border: none;pointer-events: auto;height: auto;min-height: 180px;width: 350px;}"

  fragment.appendChild(iframeStyle);
  targetElement.appendChild(fragment);
})()
```
