class ServerExperimentHelper {
  styles = {}
  scripts = {}

  addExperiment({ id, variations }) {
    if (!variations || !variations.length) return

    variations.forEach((variant, index) => {
      this.styles[id + (index + 1)] = variant.css
    })
  }

  getVariation() {
    return 1
  }
}

export default ServerExperimentHelper
