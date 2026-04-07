export type HazardType = "Jellyfish" | "Baby Squid" | "Big Squid" | "Shark" | "Boss";
export type CollectibleType = "Rubbish" | "Turtle";

export interface Position {
  x: number;
  y: number;
}

export interface Entity {
  id: string;
  type: HazardType | CollectibleType;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface LevelConfig {
  level: number;
  name: string;
  rubbishGoal: number;
  turtleGoal: number;
  timeLimit: number;
  hazards: HazardType[];
  rubbishCount: number;
  turtleCount: number;
  description: string;
}

export type Phase = "menu" | "playing" | "levelComplete" | "gameOver" | "victory";

export interface HudState {
  phase: Phase;
  level: number;
  lives: number;
  score: number;
  rubbishCollected: number;
  turtlesSaved: number;
  timeRemaining: number;
  message: string | null;
  messageType: "info" | "danger" | "success";
}

export interface GameRef {
  phase: Phase;
  level: number;
  lives: number;
  score: number;
  rubbishCollected: number;
  turtlesSaved: number;
  timeRemaining: number;
  speed: number;
  invincible: boolean;
  invincibleUntil: number;
  messageUntil: number;
  message: string | null;
  messageType: "info" | "danger" | "success";
  player: Position;
  entities: Entity[];
}

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    level: 1,
    name: "Shallow Waters",
    rubbishGoal: 3,
    turtleGoal: 1,
    timeLimit: 60,
    hazards: ["Jellyfish"],
    rubbishCount: 5,
    turtleCount: 2,
    description: "Collect 3 rubbish and save 1 turtle. Watch out for jellyfish!",
  },
  {
    level: 2,
    name: "The Squid Zone",
    rubbishGoal: 5,
    turtleGoal: 2,
    timeLimit: 60,
    hazards: ["Jellyfish", "Baby Squid", "Big Squid"],
    rubbishCount: 7,
    turtleCount: 3,
    description: "Collect 5 rubbish and save 2 turtles. Squids lurk ahead!",
  },
  {
    level: 3,
    name: "Shark Territory",
    rubbishGoal: 6,
    turtleGoal: 2,
    timeLimit: 75,
    hazards: ["Jellyfish", "Baby Squid", "Big Squid", "Shark"],
    rubbishCount: 9,
    turtleCount: 3,
    description: "Mission: 6 rubbish, 2 turtles. Sharks patrol these waters!",
  },
  {
    level: 4,
    name: "Boss: Giant Squid",
    rubbishGoal: 8,
    turtleGoal: 3,
    timeLimit: 90,
    hazards: ["Jellyfish", "Baby Squid", "Big Squid", "Shark", "Boss"],
    rubbishCount: 12,
    turtleCount: 4,
    description: "The final challenge! 8 rubbish, 3 turtles — and the Giant Squid awaits.",
  },
];

export const HAZARD_EFFECTS: Record<HazardType, { timePenalty: number; speedPenalty: number; livesLost: number; message: string }> = {
  Jellyfish:    { timePenalty: 5,  speedPenalty: 0, livesLost: 0, message: "Jellyfish sting! -5 seconds!" },
  "Baby Squid": { timePenalty: 0,  speedPenalty: 3, livesLost: 0, message: "Baby Squid inked you! Slowed down!" },
  "Big Squid":  { timePenalty: 10, speedPenalty: 0, livesLost: 0, message: "Big Squid attack! -10 seconds!" },
  Shark:        { timePenalty: 5,  speedPenalty: 2, livesLost: 0, message: "Shark! -5 seconds and slowed down!" },
  Boss:         { timePenalty: 0,  speedPenalty: 0, livesLost: 1, message: "Giant Squid squirted! -1 LIFE!" },
};

export const HAZARD_EMOJI: Record<HazardType, string>      = { Jellyfish: "🪼", "Baby Squid": "🦑", "Big Squid": "🦑", Shark: "🦈", Boss: "🐙" };
export const COLLECTIBLE_EMOJI: Record<CollectibleType, string> = { Rubbish: "🗑️", Turtle: "🐢" };

export const BASE_SPEED      = 220; // pixels per second
export const CANVAS_WIDTH    = 800;
export const CANVAS_HEIGHT   = 500;
export const PLAYER_RADIUS   = 18;
export const ENTITY_RADIUS   = 20;
export const INVINCIBLE_MS   = 2000;
export const FONT_SIZE       = 28;
