"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import Banner from "../banner";
import MediaRow from "../media-row/page";
import Navbar from "../navbar";



// Define the type for the media object in the mediaData array
interface Media {
  id: string;
  type: string;
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  poster_path?: string;
  overview?: string;
}

interface MediaRowData {
  title: string;
  medias: Media[];
}

interface CommonLayoutProps {
  mediaData: MediaRowData[];
}

export default function CommonLayout({ mediaData }: CommonLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Head>
        <title>Netflix Clone</title>
        {/* to do -> to add all other properties */}
      </Head>
      <>
        <Navbar />
        <div className="relative pl-4 pb-24 lg:space-y-24">
          <Banner
            medias={mediaData && mediaData.length ? mediaData[0].medias : []}
          />
          <section className="md:space-y-16">
            {mediaData && mediaData.length
              ? mediaData.map((item) => (
                  <MediaRow key={item.title} title={item.title} medias={item.medias} />
                ))
              : null}
          </section>
        </div>
      </>
    </motion.div>
  );
}
