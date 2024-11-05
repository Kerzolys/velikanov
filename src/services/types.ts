export type TEvent = {
  date: string;
  time: string;
  location: string;
  program: string[];
  soloist?: string;
  link?: string;
};

export type TVideo = {
  title: string;
  url: string;
};

export type TImage = {
  link: string;
  title: string;
  id?: string;
};
