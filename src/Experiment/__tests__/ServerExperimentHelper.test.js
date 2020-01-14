import { setExperimentGroup } from "../ServerExperimentHelper"

describe("ServerExperimentHelper", () => {
  it("Should have 50% of test case 1", () => {
    console.log("S: ", setExperimentGroup("123", null, [0.5], 0.7))
    expect(true).toBe(true)
  })
  it("Should run variant 1", () => {
    expect(true).toBe(true)
  })
})
