import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ClientRow({ client, selectClient, isSelected }) {

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }]
    });

    return (
        <tr className={isSelected ? "bg-highlight" : ""}>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-info btn-sm" onClick={() => selectClient(client)}>
                    <FaPencilAlt />
                </button>
            </td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={deleteClient}>
                    <FaTrashAlt />
                </button>
            </td>
        </tr>
    )
}
