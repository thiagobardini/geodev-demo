import React from "react";
import Image from "next/image";
import Tooltip from "@/components/shared/tooltip";
import useMediaQuery from "@/lib/hooks/use-media-query";

function TrailEntrancesPin({ tooltip }: { tooltip: string }) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      {!isMobile ? (
        <Tooltip content={tooltip} fullWidth={false}>
          <Image alt="TrailMap Demo" src="/icons/trail-pin.png" width="25" height="30" />
        </Tooltip>
      ) : (
        <Image alt="TrailMap Demo" src="/icons/trail-pin.png" width="25" height="30" />
      )}
    </>
  );
}

export default TrailEntrancesPin;
