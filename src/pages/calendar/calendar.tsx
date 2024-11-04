import { ContentCalendar } from "../../components/content-calendar/calendar-content";
import { ContentSection } from "../../components/content-section/content-section";
import { CoverSection } from "../../components/cover-section/cover-section";
import { Layout } from "../../components/layout/layout";

import coverImage from '../../utils/coverPhotos/calendar.jpg'


export const Calendar =() => 
<Layout>
  <CoverSection image={coverImage} gradient={{direction: 'to right', color1: '#666', color2: '#121212', color3: '#161616', color4: '#666'}}/>
  <ContentSection title='Calendar'>
    <ContentCalendar />
  </ContentSection>
  </Layout>
