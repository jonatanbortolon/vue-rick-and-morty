type ICharacterOrigin = {
  name: string;
  url: string;
};

type ICharacterLocation = {
  name: string;
  url: string;
};

type ICharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ICharacterOrigin;
  location: ICharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: Date;
};

export default ICharacter;