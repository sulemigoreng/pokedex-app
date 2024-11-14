export interface PokemonData {
  order: number;
  id:number;
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  abilities:{
    ability:{
      name:string;
      url:string;
    }
  }[];
  stats:{
    base_stat:number;
    stat:{
      name:string;
    }
  }[];
}

export interface TypeData {
    name : string
}