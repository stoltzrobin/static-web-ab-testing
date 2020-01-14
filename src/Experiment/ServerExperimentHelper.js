import React from "react"

export function setExperimentGroup(id, savedVariant, weights, randomValue) {
  for (let i = 1; i <= weights.length; i += 1) {
    if (
      savedVariant === i.toString() ||
      (savedVariant === null && randomValue > weights[i - 1])
    ) {
      console.log("Ab Testing Variant: ", i)
      localStorage.setItem(`abtesting-${id}`, i)
      const elem = document.getElementById(id + i)
      elem.removeAttribute("type")
      elem.innerHTML = elem.innerHTML + "" // Issue with safari so we need to modify the script to run
      return i
    }
  }
  localStorage.setItem(`abtesting-${id}`, 0)
  return 0
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
            __html: `console.log('hejsan');
            ${setExperimentGroup.toString()}
            var sv = localStorage.getItem("abtesting-${scriptKey}");
            setExperimentGroup("${scriptKey}", sv, ${JSON.stringify(
              weights
            )}, Math.random());
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
