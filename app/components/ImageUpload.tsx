import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { useAuth } from '../context/AuthContext'
import Image from 'next/image'

export default function ImageUpload(props){
    const {
        id,
        imageUrl,
        handleImageChange
    } = props
    const { currentUser } = useAuth()
    const [imageFile, setImageFile] = useState('')
    const [imageURL, setImageUrl] = useState(imageUrl)
    const storage = getStorage()
    const storageRef = ref(storage, "userId/images")

    function handleImageFile(e){
        if(e.target.files[0]){
            setImageFile(e.target.files[0])
        }
        console.log(e.target.files[0])
    }

    function handleImageUpload(e){
        e.preventDefault()
        console.log('start of upload')
        const ref = ref(storage, `/${currentUser?.uid}/images/${imageFile}`)
        const uploadTask = ref.put(imageFile)

        //initiates the firebase side uploading 
        uploadTask.on("state_changed", console.log, console.error, () => {
            ref
              .getDownloadURL()
              .then((url: string) => {
                setImageFile(null);
                setImageUrl(url);
              });
          });
      }

      useEffect(() => {
        handleImageChange( {imageUrl: imageURL})
        console.log(imageURL)
      },[imageURL])

    return (
        <form onSubmit={e => handleImageUpload(e)}>
            <label className="p-1">Image Upload</label>
            <div className="p-1">
                 <input
                    type="file"
                    onChange={handleImageFile}
                    className='journal_image_input_text'
                />
                <button
                    disabled={!imageFile}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-1"
                >  
                    Upload Image
                </button>
                <div  className='p-1 border'>
                    <Image 
                        src={imageUrl}
                        alt={"player images"}
                        width={200}
                        height={300}
                    />
                </div>
                
            </div>
        </form>
    )
}