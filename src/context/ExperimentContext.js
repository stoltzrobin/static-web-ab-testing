import React, { createContext, useContext } from "react"

const initialState = {
  addExperiment: () => {},
  getVariation: () => {},
}

const ExperimentContext = createContext(initialState)
export const useExperiment = () => useContext(ExperimentContext)

const ExperimentProvider = ({ children, helper }) => {
  console.log('Helper: ', helper);
  return (
    <ExperimentContext.Provider
      value={{
        addExperiment: helper.addExperiment,
        getVariation: helper.getVariation,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  )
}

export default ExperimentProvider
