import { setExperimentGroup } from "../ServerExperimentHelper"

describe("ServerExperimentHelper", () => {
  it("Should not have a larger diff than 2% when split with 50/50", () => {
    document.body.innerHTML = '<div id="1231"></div>'
    const variants = { 0: 0, 1: 0 }
    const NUMBER_OF_TESTS = 10000
    for (let i = 0; i < NUMBER_OF_TESTS; i += 1) {
      const randomValue = Math.random()
      const variant = setExperimentGroup("123", null, [0.5], randomValue)
      variants[variant] += 1
    }
    const diffAmount = Math.abs(variants[0] - variants[1])
    const procentDiff = (diffAmount / NUMBER_OF_TESTS) * 100
    expect(procentDiff).toBeLessThan(2)
  })
  it("Should run variant 1 if the test have 100% weight", () => {
    const randomValue = Math.random()
    const variant = setExperimentGroup("123", null, [0], randomValue)
    expect(variant).toBe(1)
  })
})
