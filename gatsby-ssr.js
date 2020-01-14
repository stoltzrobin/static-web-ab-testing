import React from "react"
import { renderToString } from "react-dom/server"
import { Navigator } from "./src/components/Navigator"
import ServerExperimentHelper from "./src/Experiment/ServerExperimentHelper"
import ExperimentProvider from "./src/context/ExperimentContext"

export const replaceRenderer = ({
  replaceBodyHTMLString,
  setPreBodyComponents,
  bodyComponent,
}) => {
  const serverExperimentHelper = new ServerExperimentHelper()

  const body = (
    <ExperimentProvider helper={serverExperimentHelper}>
      <Navigator>{bodyComponent}</Navigator>
    </ExperimentProvider>
  )
  replaceBodyHTMLString(renderToString(body))
  setPreBodyComponents([serverExperimentHelper.generateScriptElement()])
}
