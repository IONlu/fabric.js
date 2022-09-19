import { fabric } from '../../HEADER';
import { Canvas, TObject } from '../__types__';
import { AnimationContext, CancelFunction } from './animate';

/**
 * Array holding all running animations
 * @memberof fabric
 * @type {AnimationContext[]}
 */
class RunningAnimations extends Array<AnimationContext> {
  /**
   * cancel all running animations at the next requestAnimFrame
   * @returns {AnimationContext[]}
   */
  cancelAll() {
    const animations = this.splice(0);
    animations.forEach((animation) => animation.cancel());
    return animations;
  }

  /**
   * cancel all running animations attached to canvas at the next requestAnimFrame
   * @param {fabric.Canvas} canvas
   * @returns {AnimationContext[]}
   */
  cancelByCanvas(canvas: Canvas) {
    if (!canvas) {
      return [];
    }
    const cancelled = this.filter(
      (animation) =>
        typeof animation.target === 'object' &&
        (animation.target as TObject)?.canvas === canvas
    );
    cancelled.forEach((animation) => animation.cancel());
    return cancelled;
  }

  /**
   * cancel all running animations for target at the next requestAnimFrame
   * @param {*} target
   * @returns {AnimationContext[]}
   */
  cancelByTarget(target: AnimationContext['target']) {
    const cancelled = this.findAnimationsByTarget(target);
    cancelled.forEach((animation) => animation.cancel());
    return cancelled;
  }

  /**
   *
   * @param {CancelFunction} cancelFunc the function returned by animate
   * @returns {number}
   */
  findAnimationIndex(cancelFunc: CancelFunction) {
    return this.findIndex((animation) => animation.cancel === cancelFunc);
  }

  /**
   *
   * @param {CancelFunction} cancelFunc the function returned by animate
   * @returns {AnimationContext | undefined} animation's options object
   */
  findAnimation(cancelFunc: CancelFunction) {
    return this.find((animation) => animation.cancel === cancelFunc);
  }

  /**
   *
   * @param {*} target the object that is assigned to the target property of the animation context
   * @returns {AnimationContext[]} array of animation options object associated with target
   */
  findAnimationsByTarget(target: AnimationContext['target']) {
    if (!target) {
      return [];
    }
    return this.filter((animation) => animation.target === target);
  }
}

export const runningAnimations = new RunningAnimations();

fabric.runningAnimations = runningAnimations;
