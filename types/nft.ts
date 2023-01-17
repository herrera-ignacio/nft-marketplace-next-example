export type Trait = "attack" | "health" | "speed";

export interface NftAttribute {
  traitType: Trait;
  value: string;
}

export interface NftMeta {
  name: string;
  description: string;
  image: string;
  attributes: NftAttribute[];
}
