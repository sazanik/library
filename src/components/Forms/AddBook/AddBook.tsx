import React from 'react';
import { useForm } from 'react-hook-form';
import './AddBook.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../features/authors/authorsSlice';
import { Book } from "../../../types/book";
import { selectAuthors } from "../../../features/authors/authorsSlice";

export default function AddBook({edit, book, closeModal}: { edit: boolean, book: Book, closeModal: any }) {
  const authors = useSelector(selectAuthors);
  const {createBook, editBook} = actions;
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  let authorName: string = authors[0].firstName + ' ' + authors[0].lastName;

  const onSubmit = (data: Book) => {
    if (edit) {
      const updatedBook = {...book, ...data, authorName};
      console.log(updatedBook);
      dispatch(editBook(updatedBook));
    } else {
      const book = {...data, authorName, id: Math.random().toString()};
      dispatch(createBook(book));
    }
    closeModal();
  };


  register('authorId', {
    onChange: event => {
      const index = event.currentTarget.selectedIndex;
      authorName = event.currentTarget.options[index].text;
    }
  });

  return (
    <form
      className="AddBook"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register('title')} placeholder="Title" defaultValue={edit ? book.title : ''} />
      <input {...register('description')} placeholder="Description" defaultValue={edit ? book.description : ''} />
      <input {...register('code')} placeholder="Code" defaultValue={edit ? book.code : ''} />
      <select {...register('authorId')} defaultValue={edit ? 'Select author...' : ''}>
        <option key={Math.random()} disabled>Select author...</option>
        {authors.map(author => <option key={Math.random()} value={author.id}>
          {author.firstName + ' ' + author.lastName}
        </option>)}
      </select>
      <input {...register('pagesCount')} placeholder="Pages count" defaultValue={edit ? book.pagesCount : ''} />
      <input {...register('year')} placeholder="Published year" defaultValue={edit ? book.year : ''} />
      <input type="submit" value={edit ? 'confirm' : 'add'} />
    </form>
  );
}
