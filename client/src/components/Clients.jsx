import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CLIENTS, GET_CLIENT } from "../queries/clientQueries";
import { UPDATE_CLIENT } from "../mutations/clientMutations";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

export default function Clients() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const { loading, error, data } = useQuery(GET_CLIENTS);

    const [updateClient] = useMutation(UPDATE_CLIENT, {
        variables: { id, name, email, phone },
        refetchQueries: [{ query: GET_CLIENT, variables: { id } }]
    });

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

    const onSubmit = (e) => {
        e.preventDefault();

        if (!id || !name || !email || !phone) {
            return alert("Please enter all the fields")
        }

        updateClient(id, name, email, phone);

        setId("");
        setName("");
        setEmail("");
        setPhone("");
    }

    const onCancel = (e) => {
        e.preventDefault();

        setId("");
        setName("");
        setEmail("");
        setPhone("");
    }

    const selectClient = (client) => {
        setId(client.id);
        setName(client.name);
        setEmail(client.email);
        setPhone(client.phone);
    }

    return (
        <>
            {!loading && !error && (
                <>
                    <form onSubmit={onSubmit} className={!id ? "display-none" : ""}>
                        <h3>Update Client</h3>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-danger mx-2" onClick={(e) => { onCancel(e) }}>Cancel</button>
                            <button type="submit" className="btn btn-primary mx-2">Submit</button>
                        </div>
                    </form>
                    <table className="table table-hover mt-3">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.clients.map(client => (
                                <ClientRow key={client.id} client={client} selectClient={selectClient} isSelected={id === client.id} />
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}
