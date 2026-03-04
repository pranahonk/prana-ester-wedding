import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Undangan Pernikahan Prana & Ester - 30 Mei 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [photoBuffer, greatVibesBuf, cormorantBuf] = await Promise.all([
    readFile(join(process.cwd(), "public/photos/DSC00374.jpg")),
    readFile(join(process.cwd(), "public/fonts/GreatVibes-Regular.ttf")),
    readFile(join(process.cwd(), "public/fonts/Cormorant-Medium.ttf")),
  ]);
  const greatVibesFont = greatVibesBuf.buffer.slice(
    greatVibesBuf.byteOffset,
    greatVibesBuf.byteOffset + greatVibesBuf.byteLength
  );
  const cormorantFont = cormorantBuf.buffer.slice(
    cormorantBuf.byteOffset,
    cormorantBuf.byteOffset + cormorantBuf.byteLength
  );
  const photoBase64 = `data:image/jpeg;base64,${photoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: "#0a1628",
        }}
      >
        {/* Background photo */}
        <img
          src={photoBase64}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
          }}
        />

        {/* Navy gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(10,22,40,0.55) 0%, rgba(15,29,51,0.75) 50%, rgba(10,22,40,0.9) 100%)",
          }}
        />

        {/* Gold border frame */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            display: "flex",
            border: "1px solid rgba(212,175,55,0.25)",
          }}
        />

        {/* Corner accents */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            width: 40,
            height: 40,
            display: "flex",
            borderTop: "2px solid rgba(212,175,55,0.5)",
            borderLeft: "2px solid rgba(212,175,55,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 40,
            height: 40,
            display: "flex",
            borderTop: "2px solid rgba(212,175,55,0.5)",
            borderRight: "2px solid rgba(212,175,55,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            width: 40,
            height: 40,
            display: "flex",
            borderBottom: "2px solid rgba(212,175,55,0.5)",
            borderLeft: "2px solid rgba(212,175,55,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            width: 40,
            height: 40,
            display: "flex",
            borderBottom: "2px solid rgba(212,175,55,0.5)",
            borderRight: "2px solid rgba(212,175,55,0.5)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "relative",
            padding: "60px",
          }}
        >
          {/* Top label */}
          <p
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "Cormorant",
              fontWeight: 500,
              marginBottom: 12,
            }}
          >
            The Wedding of
          </p>

          {/* Names */}
          <p
            style={{
              fontSize: 88,
              color: "#D4AF37",
              fontFamily: "Great Vibes",
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Prana & Ester
          </p>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              margin: "20px 0",
            }}
          >
            <div
              style={{
                width: 80,
                height: 1,
                display: "flex",
                background:
                  "linear-gradient(90deg, transparent, rgba(212,175,55,0.4))",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                display: "flex",
                border: "1px solid rgba(212,175,55,0.5)",
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{
                width: 80,
                height: 1,
                display: "flex",
                background:
                  "linear-gradient(270deg, transparent, rgba(212,175,55,0.4))",
              }}
            />
          </div>

          {/* Date */}
          <p
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "0.15em",
              fontFamily: "Cormorant",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Sabtu, 30 Mei 2026
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Great Vibes",
          data: greatVibesFont,
          style: "normal",
          weight: 400,
        },
        {
          name: "Cormorant",
          data: cormorantFont,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
