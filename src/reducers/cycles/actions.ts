/* eslint-disable no-unused-vars */
import { Cycle } from './cycles'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export const addNewCycleAction = (newCycle: Cycle) => {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export const interruptCurrentCycleAction = () => {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    payload: {},
  }
}

export const markCurrentCycleAsFinished = () => {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    payload: {},
  }
}
