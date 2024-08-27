"use client"

import { CldImage } from "next-cloudinary"

export default function Haiku(props) {
  let text = `${props.haiku.line1}%0A${props.haiku.line2}%0A${props.haiku.line3}`

  if (!props.haiku.photo) {
    props.haiku.photo = "samples/shoe"
  }

  if (props.preview) {
    text = `Line 1 here%0ALine 2 here%0ALine 3 here`
  }

  return (
    <div className="relative rounded-xl overflow-hidden max-w-[650px]">
      <img src="/aspect-ratio.png" />
      <div className="absolute inset-0 bg-gray-200 grid">
        <span className="loading loading-dots loading-lg m-auto"></span>
      </div>

      <CldImage
        className="absolute inset-0"
        sizes="650px"
        width="650"
        height="300"
        fillBackground
        crop={{ type: "pad", source: true }}
        src={props.haiku.photo}
        alt={props.haiku.line1}
        overlays={[
          {
            position: {
              x: 34,
              y: 154,
              angle: -10,
              gravity: "north_west"
            },
            text: {
              color: "black",
              fontFamily: "Source Sans Pro",
              fontSize: 42,
              fontWeight: "bold",
              text: text
            }
          },
          {
            position: {
              x: 30,
              y: 150,
              angle: -10,
              gravity: "north_west"
            },
            text: {
              color: "white",
              fontFamily: "Source Sans Pro",
              fontSize: 42,
              fontWeight: "bold",
              text: text
            }
          }
        ]}
      />
    </div>
  )
}
