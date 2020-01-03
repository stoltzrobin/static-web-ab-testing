import React from "react"
import { Navigator } from "./src/components/Navigator"
import ExperimentContext from "./src/context/ExperimentContext"
import ClientExperimentHelper from "./src/Experiment/ClientExperimentHelper"

const clientExperimentHelper = new ClientExperimentHelper()

export const wrapRootElement = ({ element }) => {
  return (
    <ExperimentContext helper={clientExperimentHelper}>
      <Navigator>{element}</Navigator>
    </ExperimentContext>
  )
}
