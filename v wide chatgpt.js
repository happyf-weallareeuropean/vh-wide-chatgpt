// ==UserScript==
// @name         v+h wide chatgpt
// @namespace    west.trim.ui
// @version      0.2
// @description  more content room vertically n horizontally. button edge hold shift key to show, top edge ui show when mouse is near it. 
// @author       felixy happyfceleste & Johannes Thyroff(https://github.com/JThyroff/WideGPT) 
// @match        https://chatgpt.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

/* ==== CSS TRIMS ==== */
function insCss(cssText) {
  // Re‑use or create a single high‑priority <style> node.
  let styleNode = document.getElementById("vwide-css-top");
  if (!styleNode) {
    styleNode = document.createElement("style");
    styleNode.id = "vwide-css-top";
    styleNode.type = "text/css";
    styleNode.textContent = cssText;
  }

  const head = document.head || document.documentElement;
  head.append(styleNode); // puts it as the last child

  // Keep it last for the rest of the session.
  function keepLast() {
    if (head.lastChild !== styleNode) head.append(styleNode);
  }
  keepLast();

  if (!window.__vwideObserver) {
    window.__vwideObserver = new MutationObserver(keepLast);
    window.__vwideObserver.observe(head, { childList: true });
  }
}

insCss(`/* force that div taller */
div.grow.overflow-y-auto {
  min-height: 680px !important;
//  margin: auto !important;
}
/* force a thinner cut */
body,
[data-message-author-role="assistant"],
[data-message-author-role="user"] {
  /* try the light/thin PostScript name first */
  font-weight: 300 !important;    /* very light */
}

/* very important to remove the botom padding. Remove bottom margin from the composer's wrapper */
main div.isolate.w-full.basis-auto.mb-4 {
    margin-bottom: 0 !important;
}
main div.sticky.top-0.max-md\:hidden.h-header-height {
  /* Hide the elements completely */
  display: none !important;
}
div.isolate.w-full.basis-auto.flex.flex-col {
  padding: 0 !important;
}
div.text-base.mx-auto {
  padding-left: 0 !important;
  padding-right: 0 !important;
  --thread-content-margin: 0px !important;
}
div[class*="@thread-xl"] {
  margin-top: 0 !important;
  padding-bottom: 0 !important;
}

/* 1. Target the container setting the overall width and margin */
/* Overrides pl-2 (padding-left) */
div[style*="max-width: 100%"] {
  padding: 0 !important;
  /* Optionally remove the horizontal padding variable if needed, though mx-auto centers it */
  /* padding-right: 0 !important; */
}

/* 2. Target the inner container holding the input grid and buttons */


/* 3. Target the container specifically around the input field */
/* Overrides ps-2 pt-0.5 (padding-start, padding-top) */
form[data-type="unified-composer"] div[class*="ps-2 pt-0.5"] {
  padding: 0 !important;
}

/* 4. Target the main container div holding the ProseMirror editor */
/* Overrides pe-3 (padding-end) */
._prosemirror-parent_1e8bb_2 {
  padding: 0 !important;
  /* Optional: Override min-height if it causes unwanted space */
  /* min-height: auto !important; */
}

/* 5. Target the hidden textarea */
/* Overrides py-2 (padding-top/bottom) */
._prosemirror-parent_1e8bb_2 textarea {
  padding: 0 !important;
  /* Ensure height doesn't add space if it becomes visible */
  height: auto !important;
  min-height: 0 !important;
}

/* 6. Target the actual contenteditable input area (ProseMirror div) */
/* Remove any default or library-added padding/margin */
#prompt-textarea {
  padding: 0 !important;
  margin: 0 !important;
  /* Ensure it can shrink vertically if needed */
   min-height: 0 !important;
}

/* 7. Target the paragraph element often used inside the input area */
/* Remove default browser margins for paragraphs */
#prompt-textarea p {
  margin: 0 !important;
  padding: 0 !important;
}

/* 8. Target the grid container holding the input area */
/* Overrides ms-1.5 (margin-start) */
form[data-type="unified-composer"] div[class*="ms-1.5 grid"] {
  margin: 0 !important; /* Use margin: 0 to reset all margins */
}

/* 9. Target the container for potential elements after the input grid */
/* Overrides ms-2 (margin-start) */
form[data-type="unified-composer"] div[class*="ms-2 flex"] {
  margin: 0 !important; /* Use margin: 0 to reset all margins */
}

/* 10. Optional: Adjust absolute positioned buttons container */
/* If removing padding makes buttons overlap or look wrong, adjust their position. */
/* Example: Resetting left offset */
/*
.bg-primary-surface-primary.absolute.right-0.bottom-\[9px\].left-\[17px\] {
    left: 0 !important;
    bottom: 0 !important; /* Maybe adjust bottom too */
/* } */
/* Target any element whose class contains "prosemirror-parent_" */
div[class*="prosemirror-parent_"] {
  padding: 0 !important;
  margin: 0 !important;
  box-sizing: border-box !important;
  padding-inline-end: 0 !important; /* removes right-side padding from pe-3 */
  padding-right: 0 !important;       /* extra safety */
}

/* Target the actual contenteditable input area (ProseMirror div) */
/* Remove any default or library-added padding/margin */
#prompt-textarea {
  padding: 0 !important;
  margin: 0 !important;
}

/* Target the paragraph element often used inside the input area */
/* Remove default browser margins for paragraphs */
#prompt-textarea p {
  margin: 0 !important;
  padding: 0 !important; /* Less likely needed, but safe */
}
div[class^="prosemirror-parent"] .ProseMirror,
div[class^="prosemirror-parent"] .ProseMirror * {
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
}
/* 1. Target the direct container holding the input area and buttons */
/* This div has px-3 py-3 which creates the main internal padding */
form[data-type="unified-composer"] > div > div.relative.flex.w-full.items-end {
  padding: 0!important;
}


/* 2. Target the container specifically around the input field */
/* This div has ps-2 pt-0.5 (padding-start, padding-top) */
form[data-type="unified-composer"] div.relative.flex-auto.bg-transparent {
  padding: 0 !important;
}

/*very improtant*/
#prompt-textarea {
  padding: 9.1px !important;
}

/* 4. Target the hidden textarea (might still influence layout slightly) */
/* It has py-2 (padding-top/bottom) */
form[data-type="unified-composer"] textarea[placeholder="Ask anything"] {
  padding: 0 !important;
}

/* 5. Target the grid container holding the input area */
/* It has ms-1.5 (margin-start) */
form[data-type="unified-composer"] div[class*="ms-1.5 grid"] {
  margin: 0 !important;
}

/* 6. Target the container for potential elements after the input grid */
/* It has ms-2 (margin-start) */
form[data-type="unified-composer"] div[class*="ms-2 flex"] {
  margin: 0 !important;
}

/* 7. Optional: Adjust the absolute positioned buttons container if needed */
/* Removing padding might make these overlap; this resets its position slightly */
/*
form[data-type="unified-composer"] .absolute.right-3.bottom-0 {
    right: 0 !important;
    bottom: 0 !important;
}
*/
/* Target the container around the typing area */
.prosemirror-parent, /* If there's a class for that container */
.prose { /* Or a more general prose container */
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
}

    /*Target the actual surrounding bar*/
.bg-token-main-surface-primary{
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
}
.bg-clip-padding{
     padding: 0 !important;
    margin: 0 !important;
    border: none !important;
}
.px-3 {
    padding-left: 0 !important;
    padding-right: 0 !important;
}
.py-3{
    padding-top: 4px !important;
    padding-bottom: 6px !important;
}
/*this owuld impect to something not needed*/
/*Extra precaution and get to the children*/

.absolute > * {
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
}
/* Optional: Kill vertical gaps from container tokens */
div[class*="text-primary"] > div {
  margin: 0 !important;
  padding: 0 !important;
}


div.text-base.my-auto.mx-auto.py-5 {
  padding-left: 1px !important;
  padding-right: 0 !important;
}
/* Main content container */
main.relative.h-full.w-full.flex-1 {
  padding: 0 !important;
  width: 100% !important;
  max-width: none !important;
  box-sizing: border-box !important;
}

/* Conversation turn block */
div[class*="conversation-turn"].relative.flex.w-full.min-w-0.flex-col {
  padding-left: 0px !important;
  padding-right: 0px !important;
}

/* Inside message: user + assistant full zero padding */
[data-message-author-role="user"] *,
[data-message-author-role="assistant"] * {
//  padding: 0 !important;
}

/* Remove padding from markdown wrapper */
article div.text-base.mx-auto.px-6 {
  padding-left: 0px !important;
  padding-right: 0px !important;
}

/* Max width unlock for bubble containers */
[data-message-author-role="user"] div[class*="max-w-"],
[data-message-author-role="user"] .relative.max-w-\[var\(--user-chat-width\,70\%\)\],
[data-message-author-role="user"] .whitespace-pre-wrap {
  width: 100% !important; /* currently not working but in arc but would work with 'boost' */
  max-width: none !important;
  text-align: right !important;
  box-sizing: border-box !important;
}
/* Keep the global resets you already have */

[data-message-author-role="user"] .relative.max-w-\[var\(--user-chat-width\,70\%\)\] {
  border: 0.01px solid rgb(151, 148, 148) !important; /* currently doesn't work but in arc would work with 'boost' */
  border-radius: 15px !important;
}
[data-message-author-role="user"] .relative {
  display: inline-block !important;
  max-width: 90% !important;       /* keep some edge space */
  padding: 5px 5px !important;   /* smooth inner air */
  margin: 6px 0 !important;
  background-color: #1a1a1a !important; /* dark bubble (for dark mode) */

}
* {
  line-height: 1.275 !important;
}
body {
/*font-stretch: condensed !important; 
margin-block-start: 0 !important; /* Remove space before blocks */
}
//start of credit to open source extension wide gpt
@media (min-width: 1280px) {
            .xl\\:max-w-\\[48rem\\],
            .xl\\:px-5 {
                max-width: 100% !important;
                padding-left: 1.25rem;
                padding-right: 1.25rem;
            }
        }

        @media (min-width: 768px) {
            .md\\:max-w-3xl {
                max-width: 100% !important;
            }
        }

        @container (width >= 64rem) {
            .\\@\\[64rem\\]\\:\\[--thread-content-max-width\\:48rem\\] {
                --thread-content-max-width: 100% !important;
            }
        }

        @container (width >= 34rem) {
            .\\@\\[34rem\\]\\:\\[--thread-content-max-width\\:40rem\\] {
                --thread-content-max-width: 100% !important;
            }
        }

        /* Extra: override fallback static styles if exist */
        [style*="max-width"] {
            max-width: 100% !important;
        } 
//end credit to open source extension wide gpt
`);

(function () {
  ("use strict");
  let ts = {};
  const l = 40;
  const L = 650;

  function waitc(callback) {
    if (location.pathname.includes("/c/")) {
      callback();
    } else {
      const observer = new MutationObserver(() => {
        if (location.pathname.includes("/c/")) {
          observer.disconnect();
          callback();
        }
      });
      /// [debug] this should add a failb if load ealer use mutation obs wait for that
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }
  function s(){
  document.addEventListener("keydown", (e) => {
    if (e.key === "Shift") {
      g("t", "display", "flex", "important");
      g("ba", "display", "flex", "important");
      g("bb", "display", "flex", "important");
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "Shift") {
      g("t", "display", "none", "important");
      g("ba", "display", "none", "important");
      g("bb", "display", "none", "important");
    }
  });
  }
  // Cache elements once at startup
  waitc(() => {
    ts = {
      t: document.getElementById("page-header"),
      ba: document.querySelector(
        "body > div:first-of-type > div:first-of-type > div:first-of-type > div:first-of-type > main:first-of-type > div:first-of-type > div:first-of-type > div:nth-of-type(3) > div:first-of-type > div:first-of-type > div:first-of-type > div:nth-of-type(2) > form:first-of-type > div:first-of-type > div:first-of-type > div:first-of-type > div:nth-of-type(3)"
      ),
      bb: document.querySelector(
        "body > div:first-of-type > div:first-of-type > div:first-of-type > div:first-of-type > main:first-of-type > div:first-of-type > div:first-of-type > div:nth-of-type(3) > div:first-of-type > div:first-of-type > div:first-of-type > div:nth-of-type(2) > form:first-of-type > div:first-of-type > div:first-of-type > div:nth-of-type(2) > div:first-of-type > div:first-of-type"
      ),
      // else or empty? Select all remaining elements
    };

    const b = document.querySelector(
      "#thread-bottom-container .text-token-text-secondary"
    );
    if (b) b.style.setProperty("display", "none", "important");

    h();


    document.addEventListener("mousemove", (e) => {
      const y = e.clientY;
      g("t", "display", y < l ? "flex" : "none", "important");
        /*const Ł = y > L;
        g("ba", "display", Ł ? "flex" : "none", "important");
        g("bb", "display", Ł ? "flex" : "none", "important");*/
    });

        s();
    });

  function g(key, prop, val, important) {
    ts[key]?.style.setProperty(prop, val, important);
  }
  function h() {
    if (ts && ts.t && ts.ba && ts.bb) {
      g("t", "display", "none", "important");
      g("ba", "display", "none", "important");
      g("bb", "display", "none", "important");
    } else {
      // fallback: wait again if top bar not yet in DOM, using MutationObserver
      const mo = new MutationObserver(() => {
        if (ts) {
          mo.disconnect();
          h();
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }
  }
})();
