import { ContentSection } from "../../components/content-section/content-section";
import { CoverSection } from "../../components/cover-section/cover-section";
import { Layout } from "../../components/layout/layout";

import coverImage from '../../utils/coverPhotos/contacts.jpg'


export const Contact =() => 
<Layout>
<CoverSection image={coverImage} gradient={{direction: 'to right', color1: '#666', color2: '#4E7150', color3: '#315241', color4: '#666'}}/>

  <ContentSection title='Contacts'>
    <p>You can find me here:</p>
    <ul>
      <li>Email: 123@example.com</li>
      <li>Phone: 123-456-7890</li>
    </ul>
  </ContentSection>
  </Layout>
