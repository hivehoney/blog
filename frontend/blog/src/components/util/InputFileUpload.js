import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {API} from "../../config";
import {axiosAuthAPI} from "../../api/api";

export default function InputFileUpload({ code, handleChange }) {
    const [image, setImage] = useState({
        image_file: "",
        preview_URL: "img/default_image.png",
    });

    let inputRef;

    const saveImage = (e) => {
        e.preventDefault();
        if(e.target.files[0]){
            // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
            URL.revokeObjectURL(image.preview_URL);
            const preview_URL = URL.createObjectURL(e.target.files[0]);
            setImage(() => (
                {
                    image_file: e.target.files[0],
                    preview_URL: preview_URL
                }
            ))
        }
    }

    const deleteImage = () => {
        // createObjectURL()을 통해 생성한 기존 URL을 폐기
        URL.revokeObjectURL(image.preview_URL);
        setImage({
            image_file: "",
            preview_URL: "img/default_image.png",
        });
    }

    async function uploadImage() {
        try {
            if (image.image_file) {
                const formData = new FormData();

                formData.append('upload', image.image_file);
                formData.append('postCode', code);
                formData.append('type', 1);

                const response = await axiosAuthAPI.post(`${API.IMGUPLOAD}`, formData)
                const data = JSON.parse(response.data)

                if (data.status == 200) {
                    alert("서버에 등록이 완료되었습니다!");
                } else {
                    throw new Error('이미지 업로드 실패');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    useEffect(()=> {
        // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
        return () => {
            URL.revokeObjectURL(image.preview_URL)
        }
    }, [])

    return (
        <div className="uploader-wrapper">
            <input type="file" accept="image/*"
                   onChange={saveImage}
                    // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있음
                   // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음
                   onClick={(e) => e.target.value = null}
                   ref={refParam => inputRef = refParam}
                   style={{display: "none"}}
            />
            <div className="img-wrapper">
                <img src={image.preview_URL}/>
            </div>

            <div className="upload-button">
                <Button type="primary" variant="contained" onClick={() => inputRef.click()}>
                    Preview
                </Button>
                <Button color="success" variant="contained" startIcon={<CloudUploadIcon />} onClick={uploadImage}>
                    Upload
                </Button>
            </div>
        </div>
    );
}