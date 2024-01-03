import { useState } from "react";
import Modal from "react-modal";

function Patient({ patient, setPatient, deletePatient }) {
    const { petName, petOwnerName, ownerEmail, admissionDate, symptoms, id } =
        patient;

    // Estado para controlar si el modal está abierto o cerrado
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Función para abrir el modal
    const openModal = () => {
        setModalIsOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Función para eliminar el paciente y cerrar el modal
    const handleDelete = () => {
        deletePatient(id);
        closeModal();
    };

    return (
        <div className="bg-white shadow-md rounded-lg mb-3 py-10 px-5">
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Nombre:{" "}
                <span className="font-normal normal-case">{petName}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Propietario:{" "}
                <span className="font-normal normal-case">{petOwnerName}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Email:{" "}
                <span className="font-normal normal-case">{ownerEmail}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Fecha Alta:{" "}
                <span className="font-normal normal-case">{admissionDate}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Síntomas:{" "}
                <span className="font-normal normal-case">{symptoms}</span>
            </p>
            <div className="flex justify-between mt-5">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => setPatient(patient)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    onClick={openModal}
                >
                    Eliminar
                </button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Delete Confirmation"
                className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50"
                overlayClassName="fixed inset-0 z-40 bg-transparent"
                ariaHideApp={false}
            >
                <div className="bg-white w-1/2 p-6 rounded-md shadow-md">
                    <h2 className="text-lg font-bold mb-4">
                        ¿Deseas eliminar este paciente?
                    </h2>
                    <div className="flex justify-center">
                        <button
                            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg mr-2"
                            onClick={handleDelete}
                        >
                            ✔
                        </button>
                        <button
                            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                            onClick={closeModal}
                        >
                            X
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Patient;
