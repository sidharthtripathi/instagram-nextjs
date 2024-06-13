"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, useState } from "react"
function CreatePost() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const handleImageUpload = (event : ChangeEvent<HTMLInputElement>) => {
        console.log("done")
    }
    const handlePostSubmit = () => {}
  return (
    <div className="w-full mx-auto max-w-md rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
              <div className="mb-4">
                <label htmlFor="image" className="block font-medium mb-2">
                  Image
                </label>
                <div className="relative">
                  {selectedImage ? (
                    <img
                      src="/placeholder.svg"
                      alt="Selected Image"
                      width={400}
                      height={400}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                  <input
                    id="image"
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="caption" className="block font-medium mb-2">
                  Caption
                </label>
                <Textarea
                  id="caption"
                  placeholder="Write a caption..."
                 />
              </div>
              <Button
                type="submit"
                variant={"default"}
                className="w-full font-semibold"
                onClick={handlePostSubmit}
              >
                Post
              </Button>
            </div>
  )
}

export default CreatePost


function ImageIcon(props : any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    )
  }