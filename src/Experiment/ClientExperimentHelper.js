class ClientExperimentHelper {
  variations = {}
  addExperiment({ id, testCase, variations }) {
    if (!variations || !variations.length) return

    const currentVariation = localStorage.getItem(`abtesting-${id}`)
    // eslint-disable-next-line no-restricted-globals
    if (currentVariation === null || isNaN(currentVariation)) return
    this.variations[testCase] = parseInt(currentVariation, 10)
  }

  getVariation(testCase) {
    return this.variations[testCase] || 0
  }
}

export default ClientExperimentHelper
