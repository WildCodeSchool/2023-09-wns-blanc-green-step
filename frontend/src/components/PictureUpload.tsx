import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { useContext, useRef, useState } from "react";

export const PictureUpload = ({ imgUrl, setImgUrl }: any) => {
  const { user } = useContext(AuthContext);

  const [imageSrc, setImageSrc] = useState(user.image);
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();  // Maintenant TypeScript sait que fileInputRef.current est un HTMLInputElement
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
    return alert("Select a file");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImageSrc(e.target.result);
        setImgUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <img src={imageSrc ? imageSrc : "/images/blank-avatar.png"} alt="" className="rounded-full hover:opacity-20 cursor-pointer w-40 h-40" onClick={handleImageClick} />
      <p>Éditer mon avatar</p>
      <form onSubmit={(e) => handleSubmit(e)} className="hidden">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </form>
    </>
  );
};