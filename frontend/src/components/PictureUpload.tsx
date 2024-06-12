import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Button } from "./Button";

export const PictureUpload = ({ imgUrl, setImgUrl }: any) => {
  const { user } = useContext(AuthContext);

  const [imageSrc, setImageSrc] = useState(user.image);
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    console.log('Bien appelé')
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (file) {
      const url = "http://localhost:8000/upload";
      const formData = new FormData();
      formData.append("file", file, file.name);

      try {
        const response = await axios.post(url, formData);
        return setImgUrl(response.data.filename);
      } catch (err) {
        return console.log("error", err);
      }
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setImgUrl(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
    }
  };

  return (
    <>
      <img
        src={imgUrl ? imgUrl : "/images/blank-avatar.png"}
        alt="Avatar de l'utilisateur"
        className="rounded-full hover:opacity-20 cursor-pointer w-40 h-40"
        onClick={handleImageClick}
      />
      <p className="mb-5">Éditer mon avatar</p>
      <form>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e)}
          className="hidden"
        />
        <Button
          content="Changer la photo"
          color="bg-blue-80"
          textsize="text-md"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </>
  );
};
