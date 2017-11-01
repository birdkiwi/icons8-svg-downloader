function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

function destroyButtons(target) {
    target = target || document;
    var links = target.querySelectorAll('.icons8-download-link');

    for (var i=0; i < links.length; i++) {
        links[i].remove();
    }
}

function buildButton(svgEl) {
    var dl = document.createElement("a");
    dl.classList.add('icons8-download-link');
    dl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(svgEl.outerHTML));
    dl.setAttribute('download', 'icon.svg');
    dl.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
    });
    dl.style.cursor = 'pointer';
    dl.style.color = '#000';
    dl.style.fontSize = '20px';
    dl.style.textDecoration = 'none';
    dl.style.border = 'none';
    dl.style.opacity = '0.9';
    dl.style.position = 'relative';
    dl.style.zIndex = '1000';
    dl.innerHTML = '⬇️';
    insertAfter(dl, svgEl);
}

function buildButtons(target) {
    target = target || document;
    var allSVGs = target.querySelectorAll('svg');

    for (var i=0; i < allSVGs.length; i++) {
        buildButton(allSVGs[i]);
    }
}

function init() {
    destroyButtons();
    buildButtons();

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (
                mutation.type === 'childList' &&
                mutation.target.classList.contains('app-icon')
            ) {
                mutation.addedNodes.forEach(function (addedNode) {
                    if (addedNode.tagName === 'svg') {
                        console.log(mutation);
                        destroyButtons(mutation.target);
                        buildButtons(mutation.target);
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

init();