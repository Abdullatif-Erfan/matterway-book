import React, { Fragment, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./homeStyle.css";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, search_a_book } from "../../redux/actions/book";
import { AppState } from "../../redux/reducers";
import { bookDeclarationTypes } from "../../redux/action-types/declarations";
import Spinner from "../../components/loader/Spinner";

function Home() {
  const dispatch = useDispatch();
  const setting = useSelector((state: AppState) => state.book);
  const books = setting.books;
  const loading = setting.loading;
  useEffect(() => {
    dispatch(getBooks());
  }, []);

  const findThisBook = (title: string) => {
    dispatch(search_a_book(title));
  };
  return (
    <Fragment>
      <div className="container">
        <div className="alert alert-primary mt-30">
          {books && (books as React.ReactNode[]).length >= 1 ? (
            <span>Select your preferred genre</span>
          ) : (
            <span>Please wait a minute to receive the data!</span>
          )}
        </div>
        <div className="col-12 mt-10">
          <div className="row cardWrapper">
            {loading ? (
              <Spinner />
            ) : (
              <Fragment>
                {books && (books as React.ReactNode[]).length >= 1 ? (
                  books.map((item: bookDeclarationTypes, index: number) => (
                    <div
                      key={index}
                      className="col-md-2 col-sm-3 col-xs-4"
                      onClick={() => findThisBook(item.title)}
                    >
                      <div className="col-12 card mt-20 mb-20">
                        <span className="bookTitle">{item.title}</span>
                        <span>
                          <img src={item.image} alt="" className="bookImage" />
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <span>List is empty</span>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
