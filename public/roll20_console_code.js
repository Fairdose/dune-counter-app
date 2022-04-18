/* paste this code in your console
*/
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
