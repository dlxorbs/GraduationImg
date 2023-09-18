import logo from "./logo.svg";
import { React, useEffect, useState } from "react";
import "./App.css";
import { db, storage } from "./firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import $ from "jquery";
function App(props) {
  const [backimg, setBackimg] = useState("");
  const [backthumb, setbackthumb] = useState("");

  const [studentid, setStudentID] = useState("");

  let backgroundUrl;

  const done = async function () {
    //이미지 파이어 스토리지로 넘기기
    // db 업데이트 부분

    // 백그라운드
    var storageRef = storage.ref();

    try {
      // 이미지 업로드와 URL 저장 부분

      if (backimg) {
        const backgroundRef = storageRef.child("profile/");
        await backgroundRef.put(backimg);
        backgroundUrl = await getDownloadURL(backgroundRef);
      }

      const data = {
        background: {
          img: backgroundUrl !== undefined ? backgroundUrl : "",
        },
      };

      db.collection("Image").doc(studentid).set(data);

      console.log(studentid + "완료");
    } catch (error) {
      console.error("이미지 업로드 및 URL 저장 실패:", error);
    }
  };

  return (
    <div className="App">
      <div
        className="con"
        onClick={(e) => {
          $("#thumbnail").click();
        }}
      >
        <img className="smimg" src={backthumb} alt="" />
        <label for={"thumbnail"} style={{ display: "none" }}></label>
        <input
          id="thumbnail"
          type="file"
          accept=" image/png, image/jpeg, image/jpg"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setBackimg(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                const id = new Date().getTime().toString();
                setbackthumb(e.target.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>

      <input
        type="text"
        value={studentid}
        onChange={(e) => {
          setStudentID(e.target.value);
        }}
      />

      <button
        onClick={(e) => {
          done();
        }}
      >
        ㅈㅓㅈㅏㅇ
      </button>
    </div>
  );
}

export default App;
