import { TImage } from "services/types";
import bioImage from "utils/coverPhotos/bio.jpg";
import calendarImage from "utils/coverPhotos/calendar.jpg";
import contactsImage from "utils/coverPhotos/contacts.jpg";
import mediaImage from "utils/coverPhotos/media.jpg";

export const testImages: TImage[] = [
  {
    link: bioImage,
    title: "test1",
  },
  {
    link: calendarImage,
    title: "test2",
  },
  {
    link: contactsImage,
    title: "test3",
  },
  {
    link: mediaImage,
    title: "test4",
  },
];
