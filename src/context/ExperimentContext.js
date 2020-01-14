import React, { createContext, useContext } from "react"

const initialState = {
  addExperiment: () => {},
  getVariation: () => {},
}

const ExperimentContext = createContext(initialState)
export const useExperiment = () => useContext(ExperimentContext)

const ExperimentProvider = ({ children, helper }) => {
  return (
    <ExperimentContext.Provider
      value={{
        addExperiment: helper.addExperiment.bind(helper),
        getVariation: helper.getVariation.bind(helper),
      }}
    >
      {children}
    </ExperimentContext.Provider>
  )
}

export default ExperimentProvider
