import React, { useContext } from "react";

import { Link, useParams } from "react-router-dom";

import { ClientsContext } from "../../../context/ClientsContext";
import { DomainsContext } from "../../../context/DomainsContext";

import { ROUTES } from "../../../constants/constants";

import Domain from "../../../components/domains/Domain/Domain";

import List from "../../../components/List/List";

const Client = () => {
  const { id } = useParams();

  const { clients, deleteMutation } = useContext(ClientsContext);

  const { domains } = useContext(DomainsContext);

  if (!clients) {
    return <p>Loading client...</p>;
  }

  const client = clients.find((client) => client.id === id);

  if (!client) {
    return <p>No client found.</p>;
  }

  const { company, contact, email, phone } = client;

  const deleteClient = () => {
    deleteMutation.mutate(id);
  };

  const clientDomains = domains?.filter((domain) => domain.company === id);

  return (
    <section>
      <h1>Client</h1>

      <p>Company: {company}</p>
      <p>Contact: {contact}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>

      <h2>Domains</h2>

      <List items={clientDomains} item={Domain} />

      <Link to={`${ROUTES.CLIENTS}/${id}/edit`}>Edit</Link>
      <button onClick={deleteClient}>Delete</button>
    </section>
  );
};

export default Client;