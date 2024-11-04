import { ContentMedia } from "../../components/content-media/content-media";
import { ContentSection } from "../../components/content-section/content-section";
import { CoverSection } from "../../components/cover-section/cover-section";
import { Layout } from "../../components/layout/layout";

import coverImage from '../../utils/coverPhotos/media.jpg'


export const Media =() => 
<Layout>
<CoverSection image={coverImage} gradient={{direction: 'to right', color1: '#666', color2: '#4F603E', color3: '#75A685', color4: '#666'}}/>

  <ContentSection title='Media'>
    <ContentMedia />
  </ContentSection>
  
</Layout>
