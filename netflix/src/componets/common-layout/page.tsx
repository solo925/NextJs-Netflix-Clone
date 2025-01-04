import { CommonLayoutProps } from "@/types";
import { motion } from "framer-motion";
import Head from "next/head";
import Banner from "../banner";
import MediaRow from "../media-row/page";
import Navbar from "../navbar";


export default function CommonLayout({ mediaData }: CommonLayoutProps) {
  const processedMediaData = mediaData.map((item) => ({
    ...item,
    medias: item.medias.map((media) => ({
      ...media,
      backdrop_path: media.backdrop_path ?? null, 
    })),
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Head>
        <title>Netflix Clone</title>
      </Head>
      <>
        <Navbar />
        <div className="relative pl-4 pb-24 lg:space-y-24">
          <Banner
            medias={processedMediaData.length ? processedMediaData[0].medias : []}
          />
          <section className="md:space-y-16">
            {processedMediaData.map((item) => (
              <MediaRow key={item.title} title={item.title} medias={item.medias} />
            ))}
          </section>
        </div>
      </>
    </motion.div>
  );
}
