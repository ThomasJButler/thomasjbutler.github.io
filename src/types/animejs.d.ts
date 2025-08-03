// Type definitions for anime.js v4
declare module 'animejs' {
  export interface AnimateOptions {
    // Timing
    duration?: number;
    delay?: number | ((el: HTMLElement, i: number) => number);
    endDelay?: number;
    
    // Easing
    ease?: string | ((t: number) => number);
    
    // Animation values
    opacity?: number | [number, number] | string | number[] | {from: number, to: number};
    translateX?: number | [number, number] | string | number[] | ((el: HTMLElement, i: number) => number | [number, number]) | {from: number, to: number};
    translateY?: number | [number, number] | string | number[] | {from: number, to: number};
    translateZ?: number | [number, number] | string | number[] | {from: number, to: number};
    rotate?: number | [number, number] | string | number[] | {from: number, to: number};
    rotateX?: number | [number, number] | string | number[] | {from: number, to: number};
    rotateY?: number | [number, number] | string | number[] | {from: number, to: number};
    rotateZ?: number | [number, number] | string | number[] | {from: number, to: number};
    scale?: number | [number, number] | string | number[] | {from: number, to: number};
    scaleX?: number | [number, number] | string;
    scaleY?: number | [number, number] | string;
    scaleZ?: number | [number, number] | string;
    skew?: number | [number, number] | string;
    skewX?: number | [number, number] | string;
    skewY?: number | [number, number] | string;
    perspective?: number | [number, number] | string;
    
    // SVG
    strokeDashoffset?: number | [number, number] | string;
    
    // Colors
    color?: string | [string, string];
    backgroundColor?: string | [string, string];
    borderColor?: string | [string, string];
    boxShadow?: string | [string, string];
    
    // DOM properties
    textContent?: number | [number, number] | string | {from: number, to: number};
    
    // Custom properties
    [key: string]: any;
    
    // Keyframes
    keyframes?: Array<{ [key: string]: any }>;
    
    // Playback
    loop?: boolean | number;
    alternate?: boolean;
    direction?: 'normal' | 'reverse' | 'alternate';
    autoplay?: boolean;
    
    // Callbacks
    begin?: (anim: AnimationInstance) => void;
    update?: (anim: AnimationInstance) => void;
    complete?: (anim: AnimationInstance) => void;
    loopBegin?: (anim: AnimationInstance) => void;
    loopComplete?: (anim: AnimationInstance) => void;
    changeBegin?: (anim: AnimationInstance) => void;
    change?: (anim: AnimationInstance) => void;
    changeComplete?: (anim: AnimationInstance) => void;
  }

  export interface AnimationInstance {
    play(): void;
    pause(): void;
    restart(): void;
    reverse(): void;
    seek(time: number): void;
    finished: Promise<void>;
    began: boolean;
    paused: boolean;
    completed: boolean;
    currentTime: number;
    duration: number;
    progress: number;
  }

  export interface StaggerOptions {
    start?: number;
    from?: number | string | 'first' | 'last' | 'center' | 'index';
    direction?: 'normal' | 'reverse';
    easing?: string | ((t: number) => number);
    grid?: [number, number];
    axis?: 'x' | 'y';
  }

  export interface TimelineOptions extends AnimateOptions {
    defaults?: AnimateOptions;
  }

  export interface Timeline extends AnimationInstance {
    add(params: AnimateOptions & { targets?: any }, timelineOffset?: string | number): Timeline;
  }

  export interface SpringOptions {
    mass?: number;
    stiffness?: number;
    damping?: number;
    velocity?: number;
  }

  export interface Presets {
    [key: string]: AnimateOptions;
  }

  export function animate(
    targets: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement> | string,
    options: AnimateOptions
  ): AnimationInstance;

  export function stagger(
    value: number | string | [number, number],
    options?: StaggerOptions
  ): (el: HTMLElement, i: number) => number;

  export function createTimeline(options?: TimelineOptions): Timeline;

  export function spring(options?: SpringOptions): (t: number) => number;

  export const presets: Presets;
}