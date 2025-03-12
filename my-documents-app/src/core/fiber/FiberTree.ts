import { FiberNode } from '.'

let rootFiber: FiberNode | null = null

/**
 * Updates the root fiber with a new fiber tree.
 * This function is responsible for storing the latest fiber tree representation.
 *
 * @param newFiber - The new FiberNode tree to set as the root.
 */
export function reconcile(newFiber: FiberNode) {
  rootFiber = newFiber
}

/**
 * Retrieves the current root fiber.
 *
 * @returns The root FiberNode or null if no root is set.
 */
export function getRoot(): FiberNode | null {
  return rootFiber
}
