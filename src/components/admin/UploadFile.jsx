import React, { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../APIs/product";
import useEcomStore from "../../store/ecom-store";
import { Loader } from "lucide-react";

export default function UploadFile({ form, setForm }) {
  const token = useEcomStore((state) => state.token);

  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} need to be image file.`);
          continue;
        }
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            uploadFiles(token, data)
              .then((res) => {
                allFiles.push(res.data);
                setForm({ ...form, images: allFiles });
                setIsLoading(false);
                toast.success(`Upload image success`);
              })

              .catch((error) => {
                console.log(error);
                setIsLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = (publicId) => {
    const images = form.images;
    removeFiles(token, publicId)
      .then((res) => {
        const filteredImage = images.filter((item) => item.public_id !== publicId);
        setForm({ ...form, images: filteredImage });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {isLoading && <Loader className="w-16 h-16 animate-spin" />}

        {form.images.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.url}
              className="w-auto h-24 hover:scale-105 transition-transform"
              alt=""
            />
            <span
              className="absolute top-0 right-0 bg-red-500 p-1 rounded-full cursor-pointer"
              onClick={() => handleDelete(item.public_id)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      <div>
        <input type="file" name="images" multiple onChange={handleOnChange} />
      </div>
    </div>
  );
}
