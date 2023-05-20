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
  const [books, setBooks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");

  const saveBook = async (e) => {
    e.preventDefault();
    if (!bookName.trim()) {
      console.log("Empty book name");
      return;
    }
    if (!author.trim()) {
      console.log("Empty author");
      return;
    }
    console.log(bookName, author);
    try {
      const docRef = await addDoc(collection(db, "books"), {
        bookName: bookName,
        author: author,
      });
      console.log("Document written with ID: ", docRef.id);
      setBookName("");
      setAuthor("");
      setBooks([...books, { bookName, author, id: docRef.id }]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getBooks = async () => {
    try {
      await onSnapshot(collection(db, "books"), (snapshot) => {
        const newArray = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setBooks(newArray);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editBook = (item) => {
    setBookName(item.bookName);
    setAuthor(item.author);
    setEditMode(true);
    setId(item.id);
  };

  const updateBook = async (e) => {
    e.preventDefault();
    if (!bookName.trim()) {
      console.log("Empty book name");
      return;
    }
    if (!author.trim()) {
      console.log("Empty author");
      return;
    }
    try {
      await updateDoc(doc(db, "books", id), {
        bookName: bookName,
        author: author,
        id: id,
      });
      const newArray = books.map((item) =>
        item.id === id
          ? { id: item.id, bookName: bookName, author: author }
          : item
      );
      setBooks(newArray);
      setBookName("");
      setAuthor("");
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, "books", id));
      const newArray = books.filter((item) => item.id !== id);
      setBooks(newArray);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    setBookName("");
    setAuthor("");
    setEditMode(false);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="container-mt-5">
      <h1 className="text-center">Crud of books</h1>
      <hr />
      <div className="row">
        <div className="col-md-8">
          <h3 className="text-center">Books</h3>
          <ul className="list-group">
            {books.map((item) => (
              <li className="list-group-item" key={item.id}>
                <samp>
                  {item.bookName} - {item.author}
                </samp>
                <button
                  className="btn btn-danger btn-sm float-end mx-2"
                  onClick={() => deleteBook(item.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning btn-sm float-end"
                  onClick={() => editBook(item)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h3 className="text-center">{editMode ? "Edit book" : "Add book"}</h3>
          <form action="" onSubmit={editMode ? updateBook : saveBook}>
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
            {editMode ? (
              <>
                <button
                  className="btn btn-warning btn-block"
                  type="submit"
                  onClick={updateBook}
                >
                  Save
                </button>
                <button
                  className="btn btn-dark btn-block"
                  type="submit"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn btn-primary btn-block" type="submit">
                Add
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
