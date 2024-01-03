import { useState, useEffect } from "react";
import ErrorAlert from "./ErrorAlert";

function Form({ patients, setPatients, patient }) {
    // Estados para los campos del formulario y manejo de errores
    const [petName, setPetName] = useState("");
    const [petOwnerName, setPetOwnerName] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [admissionDate, setAdmissionDate] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [error, setError] = useState(false);

    // Al cargar un paciente existente, se llenan los campos del formulario con sus detalles
    useEffect(() => {
        if (Object.keys(patient).length > 0) {
            setPetName(patient.petName);
            setPetOwnerName(patient.petOwnerName);
            setOwnerEmail(patient.ownerEmail);
            setAdmissionDate(patient.admissionDate);
            setSymptoms(patient.symptoms);
        }
    }, [patient]);

    // Función para generar un ID único
    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const date = Date.now().toString(36);
        return random + date;
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar si algún campo obligatorio está vacío
        if (
            [
                petName,
                petOwnerName,
                ownerEmail,
                admissionDate,
                symptoms,
            ].includes("")
        ) {
            setError(true); // Mostrar mensaje de error
            return;
        }

        const objPatient = {
            petName,
            petOwnerName,
            ownerEmail,
            admissionDate,
            symptoms,
        };

        if (patient.id) {
            // Si se está editando un paciente, se actualiza su información en la lista de pacientes
            objPatient.id = patient.id;
            const updatedPatients = patients.map((patientState) =>
                patientState.id === patient.id ? objPatient : patientState
            );
            setPatients(updatedPatients);
        } else {
            // Si es un nuevo paciente, se genera un ID único y se añade a la lista de pacientes
            objPatient.id = generarId();
            setPatients([...patients, objPatient]);
        }

        // Limpiar los campos del formulario y restablecer el estado de error
        setPetName("");
        setPetOwnerName("");
        setOwnerEmail("");
        setAdmissionDate("");
        setSymptoms("");
        setError(false);
    };

    return (
        <div className="md:w-1/2 md:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">
                Seguimiento Pacientes
            </h2>
            <p className="text-lg mt-5 text-center mb-3">
                Añade Pacientes y{" "}
                <span className="text-indigo-600 font-bold">
                    Administrarlos
                </span>
            </p>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-3"
            >
                {error && (
                    <ErrorAlert>Todos los campos son obligatorios</ErrorAlert>
                )}
                <div className="mb-3">
                    <label
                        htmlFor="petName"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Nombre Mascota
                    </label>
                    <input
                        type="text"
                        id="petName"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="petOwnerName"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Nombre Propietario
                    </label>
                    <input
                        type="text"
                        id="petOwnerName"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        value={petOwnerName}
                        onChange={(e) => setPetOwnerName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="ownerEmail"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="ownerEmail"
                        placeholder="Email de Contacto"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="admissionDate"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Alta
                    </label>
                    <input
                        type="date"
                        id="admissionDate"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        value={admissionDate}
                        onChange={(e) => setAdmissionDate(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="symptoms"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        placeholder="Describe los Síntomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        rows="5"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                    ></textarea>
                </div>
                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white font-bold rounded-lg hover:bg-indigo-700 cursor-pointer transition-all"
                    value={patient.id ? "Editar Paciente" : "Agregar Paciente"}
                />
            </form>
        </div>
    );
}

export default Form;
