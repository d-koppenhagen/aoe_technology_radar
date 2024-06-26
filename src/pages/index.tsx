import { useRouter } from "next/router";

import { QuadrantList } from "@/components/QuadrantList/QuadrantList";
import { Radar } from "@/components/Radar/Radar";
import { Tags } from "@/components/Tags/Tags";
import {
  getAppName,
  getChartConfig,
  getItems,
  getQuadrants,
  getReleases,
  getRings,
  getTags,
  getToggle,
} from "@/lib/data";
import { CustomPage } from "@/pages/_app";

const Home: CustomPage = () => {
  const router = useRouter();
  const tag = router.query.tag as string | undefined;
  const appName = getAppName();
  const chartConfig = getChartConfig();
  const version = getReleases().length;
  const rings = getRings();
  const quadrants = getQuadrants();
  const tags = getTags();
  const items = getItems(undefined, true).filter(
    (item) => !tag || item.tags?.includes(tag),
  );

  return (
    <>
      <h1>
        {appName}{" "}
        <span style={{ color: "var(--highlight)", whiteSpace: "nowrap" }}>
          Version #{version}
        </span>
      </h1>
      {getToggle("showChart") && (
        <Radar
          size={chartConfig.size}
          quadrants={quadrants}
          rings={rings}
          items={items}
        />
      )}
      {getToggle("showTagFilter") && tags.length > 0 && (
        <Tags tags={tags} activeTag={tag} />
      )}
      {getToggle("showQuadrantList") && <QuadrantList items={items} />}
    </>
  );
};

export default Home;
