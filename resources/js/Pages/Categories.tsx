import classNames from "classnames";
import { router, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { throttle } from "lodash";
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBBtn,
    MDBModalBody,
    MDBModalFooter
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
    const searchEl = useRef<HTMLInputElement>(null);
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

    function handleEdit(id: number) {
        const categoryItem = categories.find((item) => item.id === id);

        if (!categoryItem) {
            console.error("Category item not found");
            return;
        }

        setData(previousData => {
            return {
                ...previousData,
                id: categoryItem.id,
                name: categoryItem.name,
            }
        })

        toggleShow();
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

    const handleSearch = throttle(() => {
        router.get(route('categories.index'), { search: searchEl.current?.value }, { preserveState: true })
    }, 500);

    function handleDelete(id: number) {
        const categoryItem = categories.find((item) => item.id === id);

        if (!categoryItem) {
            console.error("Category item not found");
            return;
        }

        router.delete(route("categories.destroy", categoryItem.id), {
            onSuccess: () => {
                reset();
                toggleShow();
            }
        });
    }

    return (
        <div>
            <h1>Categorieën</h1>

            <div className="d-flex justify-content-between mt-4">
                <input type="text" className="form-control w-25 h-50" placeholder="Search" onInput={handleSearch} ref={searchEl} />
                <button className="btn btn-primary" onClick={toggleShow}>
                    Voeg categorie toe
                </button>
            </div>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Naam</th>
                        <th>Actie</th>
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
                                    Aanpassen
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
                            <MDBModalTitle>Categorieën</MDBModalTitle>
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
                                    placeholder="Naam"
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
    );
}