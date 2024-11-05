import { ContentSection } from "components/content-section/content-section";

import { Layout } from "components/layout/layout";
import { BioContent } from "components/content-bio/bio-content";
import { ContentCalendar } from "components/content-calendar/calendar-content";
import { ContentMedia } from "components/content-media/content-media";
import { ContentGallery } from "components/content-gallery/content-gallery";
import { CoverSection } from "components/cover-section/cover-section";
import { RefObject, useRef } from "react";


export const Home = () => {
  const bioRef = useRef<HTMLDivElement | null>(null)
  const calendarRef = useRef<HTMLDivElement | null>(null)
  const mediaRef = useRef<HTMLDivElement | null>(null)
  const galleryRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = (section: keyof typeof refMap) => {
    const refMap = {
      about: bioRef,
      calendar: calendarRef,
      media: mediaRef,
      gallery: galleryRef,
    }
    refMap[section]?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (<>
    <Layout onScroll={handleScroll}>
      <CoverSection />
      <ContentSection ref={bioRef} title='Who am I'>
        <BioContent />
      </ContentSection>
      <ContentSection ref={calendarRef} title='Calendar'>
        <ContentCalendar />
      </ContentSection>
      <ContentSection ref={mediaRef} title='Media'>
        <ContentMedia />
      </ContentSection>
      <ContentSection ref={galleryRef} title='Gallery'>
        <ContentGallery />
      </ContentSection>
    </Layout>
  </>)
}