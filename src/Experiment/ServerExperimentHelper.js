import React from "react"

export function setExperimentGroup(id, savedVariant, weights, randomValue) {
  for (let i = 1; i <= weights.length; i += 1) {
    if (
      savedVariant === i.toString() ||
      (savedVariant === null && randomValue > weights[i - 1])
    ) {
      localStorage.setItem(`abtesting-${id}`, i)
      const elem = document.getElementById(id + i)
      if (elem !== null) {
        elem.removeAttribute("type")
        elem.innerHTML = elem.innerHTML + "" // Issue with safari so we need to modify the script to run
      }
      return i
    }
  }
  localStorage.setItem(`abtesting-${id}`, 0)
  return 0
}

function editStyleTag(variant, testCases, scriptKey, styleElement) {
  for (let i = 1; i <= testCases[scriptKey].length; i += 1) {
    if (variant === i) {
      styleElement.innerText = `.abtesting-${scriptKey} {display: initial !important} .defaultVariant-${scriptKey} {display: none !important}`
      return
    }
  }
  styleElement.innerText = `.defaultVariant-${scriptKey} {display: initial !important}`
}

function generateATFScript(variant, testCases, scriptKey) {
  const styleElement = document.createElement("style")
  editStyleTag(variant, testCases, scriptKey, styleElement)
  document.head.append(styleElement)
}

export class ServerExperimentHelper {
  styles = {}
  scripts = {}

  addExperiment({ id, variations }) {
    if (!variations || !variations.length) return
    variations.forEach((variant, index) => {
      this.styles[id + (index + 1)] = variant.css
    })
    this.scripts[id] = variations
  }

  generateScriptElements() {
    return Object.keys(this.scripts).map(scriptKey => {
      const weights = this.scripts[scriptKey].reduce(
        (acc, currentValue, index) =>
          index === 0
            ? [...acc, 1 - currentValue.weight]
            : [...acc, acc[index - 1] - currentValue.weight],
        []
      )

      return (
        <script
          dangerouslySetInnerHTML={{
            __html: `
            ${setExperimentGroup.toString()}
            ${editStyleTag.toString()}
            ${generateATFScript.toString()}
            var sv = localStorage.getItem("abtesting-${scriptKey}");
            var variant = setExperimentGroup("${scriptKey}", sv, ${JSON.stringify(
              weights
            )}, Math.random());
            generateATFScript(variant, ${JSON.stringify(
              this.scripts
            )}, "${scriptKey}");
            `,
          }}
        />
      )
    })
  }

  generateStyleElements() {
    return Object.keys(this.styles)
      .map(styleKey =>
        this.styles[styleKey] ? (
          <style
            type="not css"
            id={styleKey}
            dangerouslySetInnerHTML={{ __html: this.styles[styleKey] }}
          />
        ) : null
      )
      .filter(Boolean)
  }

  getVariation() {
    return 0
  }
}
