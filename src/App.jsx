import { useState, useEffect } from "react";
import Header from "./assets/components/Header";
import Form from "./assets/components/Form";
import PatientList from "./assets/components/PatientList";

function App() {
    // Estado para almacenar la lista de pacientes
    const [patients, setPatients] = useState([]);
    // Estado para almacenar la información de un paciente individual
    const [patient, setPatient] = useState({});

    // Cargar la lista de pacientes almacenada en el localStorage al cargar la aplicación
    useEffect(() => {
        const storedPatients =
            JSON.parse(localStorage.getItem("PatientsList")) ?? [];

        if (storedPatients.length > 0) {
            setPatients(storedPatients);
        }
    }, []);

    // Guardar la lista de pacientes en el localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem("PatientsList", JSON.stringify(patients));
    }, [patients]);

    // Función para eliminar un paciente de la lista
    const deletePatient = (id) => {
        const updatedPatients = patients.filter((patient) => patient.id !== id);
        setPatients(updatedPatients);
    };

    return (
        <div className="container mx-auto">
            <Header />
            <div className="mt-10 md:flex">
                {/* Componente Formulario para agregar/editar pacientes */}
                <Form
                    patients={patients}
                    setPatients={setPatients}
                    patient={patient}
                />
                {/* Componente Lista de Pacientes para mostrar la lista y permitir eliminar pacientes */}
                <PatientList
                    patients={patients}
                    setPatient={setPatient}
                    deletePatient={deletePatient}
                />
            </div>
        </div>
    );
}

export default App;
