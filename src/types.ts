export type CampaignId =
  | 'fallOfAvalon'
  | 'lastKnight'
  | 'ageOfLegends'
  | 'redDeath'
  | 'kingsOfRuin';

export type Language = 'en' | 'it';

export interface CampaignSummary {
  id: CampaignId;
  name: string;
}

export interface CampaignDefinition extends CampaignSummary {
  defaultState: CampaignSaveState;
}

export interface CampaignInfo {
  id: string;
  name: string;
  chapter: number;
  day: number;
}

export type CampaignIdentity = Pick<CampaignInfo, 'id' | 'name'> &
  Partial<Pick<CampaignInfo, 'chapter' | 'day'>>;

export interface Menhir {
  location: string;
  dialValue: number;
}

export interface Guardian {
  location: string;
}

export interface CharacterAttributes {
  aggression: number;
  caution: number;
  courage: number;
  empathy: number;
  practicality: number;
  spirituality: number;
}

export type CharacterAttribute = keyof CharacterAttributes;

export interface Character {
  id: string;
  characterName: string;
  playerName: string;
  dial: number;
  health: number;
  energy: number;
  terror: number;
  experience: number;
  reputation: number;
  magic: number;
  food: number;
  wealth: number;
  attributes: CharacterAttributes;
}

export interface CampaignStatusProgress {
  completed: number[];
}

export interface CampaignStatusDefinition {
  steps: number;
  enumerated?: false;
}

export interface RemovedLocation {
  box1: string;
  box2: string;
}

export interface CampaignState {
  campaign: CampaignInfo;
  menhirs: Menhir[];
  questDials: Menhir[];
  guardians: Guardian[];
  characterNotes: string;
  characters: Character[];
  statuses: Record<string, CampaignStatusProgress>;
  removedLocations: RemovedLocation[];
}

export type CampaignSaveState = CampaignState | Record<string, never>;

export interface Snapshot {
  id: string;
  name: string;
  timestamp: string;
  state: CampaignSaveState;
  campaignId: CampaignId;
  restored?: boolean;
}
