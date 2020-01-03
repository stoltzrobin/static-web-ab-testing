import React from "react"
import { renderToString } from "react-dom/server"
import { Navigator } from "./src/components/Navigator"

export const replaceRenderer = ({
  replaceBodyHTMLString,
  setPreBodyComponents,
  bodyComponent,
}) => {
  const body = <Navigator>{bodyComponent}</Navigator>

  replaceBodyHTMLString(renderToString(body))
}
