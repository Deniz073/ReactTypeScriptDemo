import { useState, useRef, useEffect } from "react";
import { useForm, router } from "@inertiajs/react";
import classNames from "classnames";
import { throttle } from "lodash";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

interface Category {
  id: number;
  name: string;
}

interface NewsItem {
  id: number;
  title: string;
  content: string;
  category_id: number;
  category: Category;
}

interface Props {
  news: NewsItem[];
  categories: Category[];
}


export default function News({ news, categories }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const searchEl = useRef<HTMLInputElement>(null);
  const categorySearch = useRef<HTMLSelectElement>(null);
  const { data, setData, post, errors, reset } = useForm({
    title: "",
    content: "",
    id: 0,
    category_id: 0,
  });

  useEffect(() => {
    console.log("use effect aangeroepen")
  }, [showModal]);

  function toggleShow() {
    const show = !showModal;
    setShowModal(show);

    if (!show) {
      reset();
    }

  }

  const handleSearch = throttle(() => {
    router.get(route('news.index'), { search: searchEl.current?.value, categoryId: categorySearch.current?.value }, { preserveState: true })
  }, 500);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("news.store"), {
      onSuccess: () => {
        reset();
        toggleShow();
      },
    });
  }

  function handleEdit(id: number) {
    const newsItem = news.find((item) => item.id === id);

    if (!newsItem) {
      console.error("News item not found");
      return;
    }

    setData(previousData => {
      return {
        ...previousData,
        title: newsItem.title,
        content: newsItem.content,
        id: newsItem.id,
        category_id: newsItem.category_id
      }
    })

    toggleShow();
  }

  function handleDelete(id: number) {
    const newsItem = news.find((item) => item.id === id);

    if (!newsItem) {
      console.error("News item not found");
      return;
    }

    router.delete(route("news.destroy", newsItem.id), {
      onSuccess: () => {
        reset();
        toggleShow();
      }
    });
  }

  return (
    <div>
      <h1>News</h1>

      <div className="d-flex justify-content-between mt-4">
        <input type="text" className="form-control w-25 h-50" placeholder="Search" onInput={handleSearch} ref={searchEl} />
        <select onChange={handleSearch} ref={categorySearch}>
          <option value={""}>selecteer category</option>
          {categories.map((category) =>(
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={toggleShow}>
          Add News Item
        </button>
      </div>



      <table className="table mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {news.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.content}</td>
              <td>{item.category?.name}</td>
              <td>
                <button
                  onClick={() => handleEdit(item.id)}
                  className="btn btn-secondary"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={showModal}
        setShow={setShowModal}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Nieuwsbericht</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleFormSubmit}>
              <MDBModalBody>
                <input
                  type="text"
                  className="form-control"
                  value={data.title}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData("title", e.target.value)
                  }
                  placeholder="Titel"
                />
                {errors.title && (
                  <p className="text-danger">
                    {errors.title}
                  </p>
                )}
                <select className="form-select mt-2" value={data.category_id} onChange={e => setData("category_id", parseInt(e.target.value))}>
                  <option value="">Selecteer een categorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-danger">
                    {errors.category_id}
                  </p>
                )}
                <textarea
                  className="form-control mt-2"
                  rows={10}
                  value={data.content}
                  onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setData("content", e.target.value)
                  }
                  placeholder="Content"
                />
                {errors.content && (
                  <p className="text-danger">
                    {errors.content}
                  </p>
                )}
              </MDBModalBody>
              <MDBModalFooter className={classNames({
                'd-flex': true,
                'justify-content-between': data.id > 0,
              })}>
                {
                  data.id > 0 && (
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(data.id)}>
                      Verwijderen
                    </button>
                  )
                }

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {data.id > 0 ? "Wijzigen" : "Aanmaken"}
                </button>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
