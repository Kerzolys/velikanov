export type TEvent = {
  date: string;
  time: string;
  location: string;
  program: string[];
  soloist?: string;
  link?: string;
  id?: string;
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

export type TUser = {
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
};
