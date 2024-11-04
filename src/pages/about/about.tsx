import { BioContent } from "../../components/content-bio/bio-content";
import { ContentSection } from "../../components/content-section/content-section";
import { CoverSection } from "../../components/cover-section/cover-section";
import { Layout } from "../../components/layout/layout";

import coverImage from '../../utils/coverPhotos/bio.jpg'

export const About = () =>
  <Layout>
    <CoverSection image={coverImage} gradient={{direction: 'to right', color1: '#000', color2: '#808e6a', color3: '#485133', color4: '#000'}}/>
    <ContentSection title='Who am I'><BioContent />
    </ContentSection>
  </Layout>
