import { RouteSegmentConfig } from "@/types";
import { ImageResponse } from "next/og";

const IMAGE_PERCENTAGE = 45;
const IMAGE_OVERLAP = 2;

export const runtime: RouteSegmentConfig["runtime"] = "edge";
export const dynamic: RouteSegmentConfig["dynamic"] = "force-static";
export const revalidate: RouteSegmentConfig["revalidate"] = false;

export const GET = async (
  _request: Request,
  { params }: { params: { path: string[] } }
) => {
  const path = [...params.path];

  const transformationValue = path.splice(-1, 1)[0];
  const transformationType = path.splice(-1, 1)[0];
  const [width, height] = path.splice(-1, 1)[0].split("x");
  const imagePath = path.join("/");

  if (
    !imagePath ||
    !transformationType ||
    !transformationValue ||
    isNaN(Number(transformationValue)) ||
    !width ||
    !height ||
    isNaN(Number(width)) ||
    isNaN(Number(height))
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  if (transformationType !== "slice") {
    return new Response(null, {
      status: 400,
    });
  }

  const imageURL =
    "https://unsplash.com/photos/E8Ufcyxz514/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8fHwxNzEyMzU5NDU1fDA&force=true&w=1920";

  console.log({
    params,
    imagePath,
    transformationType,
    transformationValue,
  });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          fontWeight: 600,
          background: `url(${imageURL})`,
          backgroundSize: "cover 100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          maskImage: `linear-gradient(${Number(transformationValue) === 1 ? "0deg" : "180deg"}, #00000000, #00000000 ${IMAGE_PERCENTAGE}%, #ffffff ${IMAGE_PERCENTAGE}%, #ffffff ${IMAGE_PERCENTAGE}%)`,
          maskSize: "100px 100px",
          maskRepeat: "repeat",
          maskPosition: transformationValue === "1" ? "0px 0px" : "5px 5px",
          WebkitMaskImage: `linear-gradient(${Number(transformationValue) === 1 ? "0deg" : "180deg"}, #00000000, #00000000 ${IMAGE_PERCENTAGE}%, #ffffff ${IMAGE_PERCENTAGE}%, #ffffff ${IMAGE_PERCENTAGE}%)`,
          WebkitMaskSize: "100px 100px",
          WebkitMaskPosition:
            transformationValue === "1"
              ? "0px 0px"
              : `${IMAGE_OVERLAP}px ${IMAGE_OVERLAP}px`,
          WebkitMaskRepeat: "repeat",
        }}
      />
    ),
    {
      width: Number(width),
      height: Number(height),
    }
  );
};
