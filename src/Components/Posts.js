import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { database, storage } from "../firebase";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";

import { onChildAdded, push, ref as databaseRef, set } from "firebase/database";

const DB_POST = "posts";
const DB_IMAGE_KEY = "images";

export default function Post(props) {
  const [posts, setPost] = useState([]);
  const [fileInfo, setFile] = useState({
    file: "",
    fileValue: "",
  });
  const [message, setText] = useState("");
  const [userEmail, setUserEmail] = useState(props.userLoggedIn);

  useEffect(() => {
    const messagesRef = databaseRef(database, DB_POST);
    // onChildAdded will return data for every child at the reference and every subsequent new child
    onChildAdded(messagesRef, (data) => {
      // Add the subsequent child to local component state, initialising a new array to trigger re-render

      setPost((posts) => [...posts, { key: data.key, val: data.val() }]);
    });
  }, []);
  let postCards = posts.map((post) =>
    post.val.userEmail === userEmail ? (
      <Card key={post.key} style={{ width: "200px", margin: "10px" }}>
        <Card.Img
          style={{ width: "200px" }}
          variant="top"
          src={post.val.imageLink}
        />
        <Card.Body>
          <Card.Text>{post.val.text}</Card.Text>
        </Card.Body>
      </Card>
    ) : null
  );

  const addFile = (event) => {
    event.preventDefault();

    const fileRef = storageRef(
      storage,
      `${DB_IMAGE_KEY}/${fileInfo.file.name}`
    );

    uploadBytes(fileRef, fileInfo.file).then(() => {
      getDownloadURL(fileRef).then((downloadURL) => {
        const postListRef = databaseRef(database, DB_POST);
        const newPost = push(postListRef);

        set(newPost, {
          imageLink: downloadURL,
          text: message,
          userEmail: userEmail,
        });

        setText("");
        setFile({ file: "", fileValue: "" });
      });
    });
  };

  return (
    <div>
      {/* TODO: Add input field and add text input as messages in Firebase */}
      <form onSubmit={addFile}>
        Title
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <br />
        Image
        <input
          name="file"
          type="file"
          value={fileInfo.fileValue}
          onChange={(e) =>
            setFile({ file: e.target.files[0], fileValue: e.target.value })
          }
        />
        <input type="submit" name="submit"></input>
      </form>

      {postCards}
    </div>
  );
}
