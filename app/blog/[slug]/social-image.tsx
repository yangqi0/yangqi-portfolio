import { ImageResponse } from "next/og";

import { getPost } from "../posts";

export const socialImageAlt = "PetitGPT technical article by Yang Qi";
export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = "image/png";

export async function createSocialImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Technical Writing by Yang Qi";
  const series = post?.series ?? "ML systems";

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f3f4f0",
          color: "#111d29",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 78px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            color: "#24758a",
            display: "flex",
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ background: "#24758a", display: "flex", height: 2, marginRight: 20, width: 56 }} />
          {series}
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1040 }}>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              fontWeight: 600,
              letterSpacing: "-0.045em",
              lineHeight: 1.02,
            }}
          >
            {title}
          </div>
          <div
            style={{
              borderTop: "2px solid #bcc4c2",
              display: "flex",
              fontFamily: "monospace",
              fontSize: 22,
              justifyContent: "space-between",
              marginTop: 44,
              paddingTop: 24,
            }}
          >
            <span>Yang Qi</span>
            <span style={{ color: "#5e6a73" }}>Research Engineer</span>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
