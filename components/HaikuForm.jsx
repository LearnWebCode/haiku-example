"use client"

import { useState } from "react"
import { createHaiku, updateHaiku } from "@/actions/haikuController"
import { useFormState, useFormStatus } from "react-dom"
import { CldUploadWidget } from "next-cloudinary"

function OurButton(props) {
  const { pending } = useFormStatus()

  return (
    <button disabled={props.disabled} className="btn btn-primary">
      {pending ? "Submitting..." : props.text}
    </button>
  )
}

export default function Form(props) {
  const [signature, setSignature] = useState("")
  const [public_id, setPublic_id] = useState("")
  const [version, setVersion] = useState("")

  let actualAction

  if (props.action === "create") {
    actualAction = createHaiku
  }

  if (props.action === "edit") {
    actualAction = updateHaiku
  }

  const [formState, formAction] = useFormState(actualAction, {
    errors: [],
    success: false
  })

  return (
    <div>
      <h1 className="text-center text-4xl text-gray-600 mb-7">{props.action === "create" ? "Create New Haiku" : "Edit Existing Haiku"}</h1>
      <div className="max-w-xs mx-auto">
        <div>
          <form action={formAction}>
            <div className="mb-4">
              <input
                defaultValue={props.haiku?.line1}
                name="line1"
                autoComplete="off"
                type="text"
                placeholder="line #1"
                className={"input input-bordered w-full max-w-xs " + (formState.errors?.line1 ? "input-error" : "")}
              />
              {formState.errors?.line1 && (
                <div role="alert" className="alert alert-error py-2 max-w-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{formState.errors?.line1}</span>
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                defaultValue={props.haiku?.line2}
                name="line2"
                autoComplete="off"
                type="text"
                placeholder="line #2"
                className={"input input-bordered w-full max-w-xs " + (formState.errors?.line2 ? "input-error" : "")}
              />
              {formState.errors?.line2 && (
                <div role="alert" className="alert alert-error py-2 max-w-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{formState.errors?.line2}</span>
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                defaultValue={props.haiku?.line3}
                name="line3"
                autoComplete="off"
                type="text"
                placeholder="line #3"
                className={"input input-bordered w-full max-w-xs " + (formState.errors?.line3 ? "input-error" : "")}
              />
              {formState.errors?.line3 && (
                <div role="alert" className="alert alert-error py-2 max-w-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{formState.errors?.line3}</span>
                </div>
              )}
            </div>
            <div className="mb-4">
              <CldUploadWidget
                onSuccess={(result, { widget }) => {
                  console.log(result?.info)
                  setPublic_id(result?.info.public_id)
                  setVersion(result?.info.version)
                  setSignature(result?.info.signature)
                }}
                onQueuesEnd={(result, { widget }) => {
                  widget.close()
                }}
                signatureEndpoint="/widget-signature"
              >
                {({ open }) => {
                  function handleClick(e) {
                    e.preventDefault()
                    open()
                  }

                  return (
                    <button className="btn btn-secondary" onClick={handleClick}>
                      Upload an image
                    </button>
                  )
                }}
              </CldUploadWidget>
            </div>
            <input name="haikuId" defaultValue={props.haiku?._id} type="hidden" />
            <input name="public_id" type="hidden" value={public_id} />
            <input name="version" type="hidden" value={version} />
            <input name="signature" type="hidden" value={signature} />

            <OurButton text={props.action == "create" ? "Save New Haiku" : "Save Changes"} />
          </form>
        </div>
      </div>
    </div>
  )
}
