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

interface Props {
  categories: Category[];
}



export default function Categories({ categories }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data, setData, post, errors, reset } = useForm({
    id: 0,
    name: "",
  });

  function toggleShow() {
    const show = !showModal;
    setShowModal(show);

    if (!show) {
      reset();
    }

  }
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("categories.store"), {
      onSuccess: () => {
        reset();
        toggleShow();
      },
    });
  }

  function handleEdit(id: number) {
    const category = categories.find((item) => item.id === id);


    if (!category) {
      console.error("Category item not found");
      return;
    }

    setData(previousData => {
      return {
        ...previousData,
        id: category.id,
        name: category.name,
      }
    })
    toggleShow();
  }

  function handleDelete(id: number) {
    const category = categories.find((item) => item.id === id);

    if (!category) {
      console.error("Category item not found");
      return;
    }

    router.delete(route("categories.destroy", category.id), {
      onSuccess: () => {
        reset();
        toggleShow();
      }
    });
  }

  return (
    <div>
      <button
        onClick={() => toggleShow()}
        className="btn btn-secondary"
      >
        Aanmaken
      </button>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>

          </tr>
        </thead>

        <tbody>
          {categories.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
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
                  value={data.name}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData("name", e.target.value)
                  }
                  placeholder="Titel"
                />
                {errors.name && (
                  <p className="text-danger">
                    {errors.name}
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

  )


}
