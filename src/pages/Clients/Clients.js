import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import { ClientsContext } from "../../context/ClientsContext";

import useTitle from "../../hooks/useTitle";

import { ROUTES } from "../../constants/constants";

import { searchArrayOfObjects } from "../../utilities/utilities";

import List from "../../components/List/List";

import Client from "../../components/clients/Client/Client";

const title = "Tracker • Clients";

const Clients = () => {
  const [search, setSearch] = useState("");

  useTitle(title);

  const { loading, error, clients } = useContext(ClientsContext);

  const results = searchArrayOfObjects(clients, search);

  const items = results || clients;

  return (
    <div>
      <h1>Clients</h1>
      <Link to={`${ROUTES.CLIENTS}/add`}>Add</Link>

      <input name="search" type="text" value={search} onChange={(event) => setSearch(event.target.value)} />

      <List loading={loading} error={error} items={items} item={Client} />
    </div>
  );
};

export default Clients;
