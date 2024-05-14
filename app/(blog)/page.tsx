import { Suspense } from "react";

import MoreStories from "./more-stories";
import Intro from "../ui/intro";
import HeroPost from "../ui/hero";
import type { HeroQueryResult, SettingsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { heroQuery, settingsQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const [settings, heroPost] = await Promise.all([
    sanityFetch<SettingsQueryResult>({
      query: settingsQuery,
    }),
    sanityFetch<HeroQueryResult>({ query: heroQuery }),
  ]);

  return (
    <div className="container mx-auto px-5">
      <Intro title={settings?.title} description={settings?.description} />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          slug={heroPost.slug}
          coverImage={heroPost.coverImage}
          excerpt={heroPost.excerpt}
          date={heroPost.date}
          author={heroPost.author}
        />
      )}
      {heroPost?._id && (
        <aside>
          <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
            More Stories
          </h2>
          <Suspense>
            <MoreStories skip={heroPost._id} limit={100} />
          </Suspense>
        </aside>
      )}
    </div>
  );
}
