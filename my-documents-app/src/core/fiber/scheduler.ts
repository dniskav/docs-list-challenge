import { FiberNode } from './FiberNode'

let nextUnitOfWork: FiberNode | null = null

export function workLoop(deadline: IdleDeadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  requestIdleCallback(workLoop)
}

function performUnitOfWork(fiber: FiberNode): FiberNode | null {
  if (!fiber.dom) {
    fiber.dom = document.createElement(fiber.type as string)
  }
  return null
}

requestIdleCallback(workLoop)
