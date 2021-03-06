import React, { useContext } from "react";

import { Link, useParams } from "react-router-dom";

import { ClientsContext } from "../../../context/ClientsContext";
import { DomainsContext } from "../../../context/DomainsContext";
import { ProjectsContext } from "../../../context/ProjectsContext";

import { HEADERS, ROUTES } from "../../../constants/constants";

import DomainRow from "../../../components/Table/DomainRow/DomainRow";
import ProjectRow from "../../../components/Table/ProjectRow/ProjectRow";
import Table from "../../../components/Table/Table";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb/Breadcrumb";
import Loading from "../../../components/Loading/Loading";

const Client = () => {
  const { id } = useParams();

  const { clients, deleteMutation } = useContext(ClientsContext);

  const { domains } = useContext(DomainsContext);

  const { projects } = useContext(ProjectsContext);

  if (!clients) {
    return <Loading inline />;
  }

  const client = clients.find((client) => client.id === id);

  if (!client) {
    return <p>No client found.</p>;
  }

  const clientDomains = domains?.filter(({ company }) => company === id);

  const clientProjects = projects?.filter(({ client }) => client === id);

  console.log(clientProjects);

  const { company, contact, email, phone } = client;

  const deleteClient = () => {
    if (clientDomains.length) {
      alert(`Please first delete all domains associated with ${company}.`);
      return;
    }

    if (clientProjects.length) {
      alert(`Please first delete all projects associated with ${company}.`);
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${company}?`)) {
      return;
    }

    deleteMutation.mutate(id);
  };

  return (
    <section>
      <div className="page__actions">
        <Breadcrumbs>
          <Breadcrumb title="Dashboard" link={ROUTES.DASHBOARD} />
          <Breadcrumb title="Clients" link={ROUTES.CLIENTS} />
          <Breadcrumb title={company} active />
        </Breadcrumbs>
      </div>

      <form className="form">
        <label className="form__label">
          Company
          <input className="form__input" name="company" type="text" value={company} readOnly />
        </label>

        <label className="form__label">
          Contact
          <input className="form__input" name="contact" type="text" value={contact} readOnly />
        </label>

        <label className="form__label">
          Email
          <input className="form__input" name="email" type="email" value={email} readOnly />
        </label>

        <label className="form__label">
          Phone
          <input className="form__input" name="phone" type="tel" value={phone} readOnly />
        </label>
      </form>

      <div className="page__buttons">
        <Link className="button" to={`${ROUTES.CLIENTS}/${id}/edit`}>
          Edit
        </Link>
        <button className="button button--small button--delete" onClick={deleteClient}>
          Delete
        </button>
      </div>

      <h4 className="page__title">Domains</h4>

      <Table items={clientDomains} headers={HEADERS.DOMAINS} row={DomainRow} />

      <h4 className="page__title">Projects</h4>

      <Table items={clientProjects} headers={HEADERS.PROJECTS} row={ProjectRow} />
    </section>
  );
};

export default Client;
