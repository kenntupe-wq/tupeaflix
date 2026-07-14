import { useMemo } from "react";

import { usePlayerStore } from "@/stores/player/store";

export function useDownloadLink() {
  const source = usePlayerStore((s) => s.source);
  const currentQuality = usePlayerStore((s) => s.currentQuality);
  return useMemo(() => {
    if (source?.type === "file") {
      const quality = currentQuality
        ? source.qualities[currentQuality]
        : undefined;
      if (quality) return quality.url;
      const firstQuality = Object.values(source.qualities)[0];
      return firstQuality?.url;
    }
    if (source?.type === "hls") return source.url;
    return undefined;
  }, [source, currentQuality]);
}
