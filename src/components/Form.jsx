import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Form = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <div className="container-mt-5">
      <h1 className="text-center">Crud of books</h1>
      <hr />
      <div className="row">
        <div className="col-md-8">
          <h3 className="text-center">Books</h3>
          <ul className="list-group">
            <li className="list-group-item">
              <samp>Text</samp>
              <button className="btn btn-danger btn-sm float-end mx-2">
                Delete
              </button>
              <button className="btn btn-warning btn-sm float-end">Edit</button>
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <h3 className="text-center">Add book</h3>
          <form action="" onSubmit={true}>
            <input
              type="text"
              placeholder="Book name"
              className="form-control mb-2"
              onChange={(e) => setBookName(e.target.value)}
              value={bookName}
            />
            <input
              type="text"
              placeholder="Author"
              className="form-control mb-2"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
            <button className="btn btn-primary btn-block" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
